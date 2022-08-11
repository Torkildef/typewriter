import Editor, { EditorChangeEvent } from '../Editor';
import { Delta } from 'typewriter-editor';

import {getLineNodeEnd} from '../rendering/rendering'
import { end } from '@popperjs/core';


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
    console.log(editor.doc.getLineFormat(), editor.doc.selection)
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

    if(direction == 1){
      newColumnPlacement++
    }
    getTableLines().forEach(line=>{
      if(line.attributes.colIndex == newColumnPlacement){
        line.attributes.colIndex ++
        let insertPlace = editor.doc.getLineRange(line)
        let delta = new Delta([])
        delta.push({ insert: '\n', attributes: {table:'footer', colIndex:newColumnPlacement, rowIndex:line.attributes.rowIndex} })
        editor.select(insertPlace[0]).insertContent(delta)
      }
      else if(line.attributes.colIndex > newColumnPlacement){
        line.attributes.colIndex ++
      }
    })
  }

  function addRow(direction: -1 | 1) {

    let newRowIndex = editor.doc.getLineFormat().rowIndex +1
    let newColumnPlacement = getFirsIndexInNextRow()

    let numberOfColumns = getTableColumnsLength()

    if(direction==-1){
      newRowIndex --
      newColumnPlacement = getFirstIndexInCurrentRow()
    }
    
    getTableLines().forEach(line=>{
      if(line.attributes.rowIndex >= newRowIndex){
        line.attributes.rowIndex ++
      }
    })

    //Needs to add a new line if table is at first or last position in editor
    if(newColumnPlacement == editor.doc.length || newColumnPlacement == 0){
      editor.select(newColumnPlacement).insert('\n')
      newColumnPlacement++
    }

    let delta = new Delta([])
    for(let i = 0; i < numberOfColumns; i++){
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

  function getTableIndexEnd(){
    if(tableActive()){
      let currentIndex = editor.doc.selection!![0]
      while(editor.doc.getFormats(currentIndex).table){
        currentIndex++
      }
      return currentIndex-1
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
      getTableLines().forEach(elm=>{
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

  function getTableLines(from?){
    let start
    if(!from){
      start = getTableIndexStart()
    }
    else{
      start = from
    }

    let tableIndexEnd = getTableIndexEnd()


    return  editor.doc.lines.filter(line=>(
      editor.doc.getLineRange(line)[0] >= start!!
      &&
      editor.doc.getLineRange(line)[1] <= tableIndexEnd!!
    ))
  }

  function getFirsIndexInNextRow(){
    if(tableActive()){
      let currentIndex = editor.doc.getLineRange(editor.doc.selection!![0])[1]

      while(editor.doc.getFormats(currentIndex).colIndex != null){
        if(editor.doc.getFormats(currentIndex).colIndex === 0){
          return currentIndex
        }
        currentIndex++
      }
      return currentIndex
    }
    return null
  }

  function getFirstIndexInCurrentRow(){
    if(tableActive()){
      let currentIndex = editor.doc.selection!![0]
      let currentrowIndex = editor.doc.getLineAt(currentIndex).attributes.rowIndex

      while(editor.doc.getLineAt(currentIndex)){
        if(editor.doc.getLineAt(currentIndex).attributes.rowIndex != currentrowIndex){
          return currentIndex +1
        }
        currentIndex--
      }
      //Table is in the start of the editor
      return currentIndex
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
