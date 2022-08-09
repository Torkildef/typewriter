import Editor, { EditorChangeEvent } from '../Editor';
import { Delta } from 'typewriter-editor';

import {getLineNodeEnd} from '../rendering/rendering'


//Added table implementation in typsetting/lines

// import { h } from '../rendering/vdom';
// import { LineData, LineType } from '../typesetting';

// const TableType: LineType = {
//   name: 'table',
//   selector: 'table td',
//   renderMultiple(lines: LineData[]) {
//     const first = lines[0][0].table;
//     let row = h(first.startsWith('th-') ? 'th' : 'tr', { key: first });
//     const table = h('table', null, [ row ]);

//     for (let i = 0; i < lines.length; i++) {
//       const [ attributes, children, id ] = lines[i];
//       if (row.key !== attributes.table) {
//         row = h(attributes.table.startsWith('th-') ? 'th' : 'tr', { key: attributes.table });
//         table.children.push(row);
//       }
//       row.children.push(h('td', { key: id }));
//     }

//     return table;
//   },
// };


export function table(editor: Editor) {

  // editor.typeset.lines.add(TableType);

  editor.on('change', onChanging);

  function onChanging(event: EditorChangeEvent) {
    console.log(editor.doc.getLineFormat())
    // If text was deleted from a table, prevent the row from being deleted unless the _whole_ row was deleted
    // If text in a column was deleted, delete the whole column or none of it
    // i.e. always ensure a table has all the cells needed to keep it correct
  }

  function insertTable(rows: number, columns: number) {
    let delta = new Delta([])
    delta.push({ insert: '\n'})
    for(let i = 0; i < rows; i++){
      for(let j = 0; j < columns; j++){
        delta.push({ insert: '\n', attributes: {table:'footer', colIndex:j, rowIndex:i} })
      }
    }
    editor.insertContent(delta)
  }

  function addColumn(direction: -1 | 1) {
    let newColumnPlacement = editor.doc.getLineAt(editor.doc.selection[0]).attributes.colIndex

    let index = getTableIndexStart()
    if (index == null) return null

    let line = editor.doc.getLineAt(index)
    while(line){
      if(line.attributes.colIndex === newColumnPlacement+1){
        line.attributes.colIndex++
        index--
        editor.insert('\n', {table:'footer', colIndex:newColumnPlacement+1, rowIndex:line.attributes.rowIndex}, [index, index])
        index+=2
      }

      else if(line.attributes.colIndex > newColumnPlacement){
        line.attributes.colIndex++
      }

      index += 1
      line = editor.doc.getLineAt(index)
    }

  }

  function addRow(direction: -1 | 1) {

    let newRowIndex = editor.doc.getLineFormat().rowIndex +1
    let newColumnPlacement = getLastIndexInCurrentRow()

    if(direction==-1){
      newRowIndex --
      newColumnPlacement = getFirstIndexInCurrentRow()
    }
    if(newColumnPlacement == null) return null;
    
    //Does not work with more then one table
    editor.doc.lines.forEach(line=>{
      if(line.attributes.rowIndex >= newRowIndex){
        line.attributes.rowIndex ++
      }
    })

    let delta = new Delta([])
    for(let i = 0; i < getTableColumnsLength(); i++){
      delta.push({ insert: '\n', attributes: {table:'footer', colIndex: i, rowIndex:newRowIndex} })
    }
    editor.select(newColumnPlacement).insertContent(delta)
  }

  function deleteTable() {

  }

  function deleteColumn() {

  }

  function deleteRow() {

  }


  //Extrafunctions for table
  function tableActive(at? : number){
    if(!at){
      return editor.getActive().table && editor.doc.selection?[0] : false
    }

    return editor.doc.getLineFormat(at).table && editor.doc.selection?[0] : false
  }

  function getTableIndexStart(){
    if(tableActive()){
      let currentIndex = editor.doc.selection!![0]
      while(editor.doc.getFormats(currentIndex).table){
        currentIndex--
      }
      return currentIndex +1
    }
    return null
  }

  function getTableLineStart(){
    if(tableActive()){
      let currentIndex = editor.doc.selection!![0]

      while(editor.doc.getLineAt(currentIndex)){
        if(!editor.doc.getLineAt(currentIndex).attributes.table){
          return editor.doc.getLineAt(currentIndex+1)
        }
        currentIndex--
      }
      return editor.doc.getLineAt(currentIndex+1)
    }
    return null
  }

  function getTableRowsLength(){
    let index = getTableIndexStart()
    let maxNum = 0
    if(index == null) return 0;
      editor.doc.lines.filter(elm=>elm.attributes.table).forEach(elm=>{
        if(elm.attributes.rowIndex > maxNum)
          maxNum = elm.attributes.rowIndex
      })

      return maxNum + 1
  }

  function getTableColumnsLength(){
    let index = getTableIndexStart()
    let maxNum = 0
    if(index == null) return 0;
      editor.doc.lines.filter(elm=>elm.attributes.table).forEach(elm=>{
        if(elm.attributes.colIndex > maxNum)
          maxNum = elm.attributes.colIndex
      })

      return maxNum + 1
  }

  function getLastIndexInCurrentRow(){
    if(tableActive()){
      let currentIndex = editor.doc.selection!![0]

      let maxC = getTableColumnsLength()

      while(editor.doc.getFormats(currentIndex).colIndex){
        currentIndex++
        if(editor.doc.getFormats(currentIndex).colIndex === maxC){
          return currentIndex
        }
      }
      return currentIndex
    }
    return null
  }

  function getFirstIndexInCurrentRow(){
    if(tableActive()){
      let currentIndex = editor.doc.selection!![0]
      let currentrowIndexber = editor.doc.getLineAt(currentIndex).attributes.rowIndex

      while(editor.doc.getLineAt(currentIndex)){
        if(editor.doc.getLineAt(currentIndex).attributes.rowIndex != currentrowIndexber){
          return currentIndex +1
        }
        currentIndex--
      }
    }
    return null
  }

  function getCurrentColumNumber(){
    return 
  }

  const addColumnLeft = () => addColumn(-1);
  const addColumnRight = () => addColumn(1);
  const addRowAbove = () => addRow(-1);
  const addRowBelow = () => addRow(1);

  return {
    commands: {
      insertTable,
      addColumn,
      addRow,
      deleteTable,
      deleteColumn,
      deleteRow,
      addColumnLeft,
      addColumnRight,
      addRowAbove,
      addRowBelow,
    },
  }
}
