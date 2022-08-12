import Editor, { EditorChangeEvent } from '../Editor';
import { Delta, Line, LineData, options } from 'typewriter-editor';


//---The implementation that was already started on

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
//---

//Note
//Some bugs where text could get in wrong cell
//Using enter and backspase is not handled in right way and will causes bugs
//-suggestion
//  If possible, remove enter possebility when table is active
//  The cells are noted with index attributes, might be simpler to remove and just mark first cell in row

export function table(editor: Editor) {

  // editor.typeset.lines.add(TableType);

  editor.on('change', onChanging);

  function onChanging(event: EditorChangeEvent) {

    //Possibility for detecting enter and backspacechanges
    if(event.change?.contentChanged){
      if(event.change.delta.ops.find(op=>op.attributes?.newColumn))return;
    }
    // If text was deleted from a table, prevent the row from being deleted unless the _whole_ row was deleted
    // If text in a column was deleted, delete the whole column or none of it
    // i.e. always ensure a table has all the cells needed to keep it correct
  }

  function insertTable(rows: number, columns: number) {
    //Prevent new column inside current column
    if(tableActive())return;

    let delta = new Delta([])
    
    //The first operation is a new line to prevent text on current line to get inn to the table
    delta.push({ insert: '\n'})
    for(let i = 0; i < rows; i++){
      for(let j = 0; j < columns; j++){
        delta.push({ insert: '\n', attributes: {table:'footer', colIndex:j, rowIndex:i} })
      }
    }
    editor.insertContent(delta)
  }

  function addColumn(direction: -1 | 1) {
    if(!tableActive())return;

    let newColumnPlacement = editor.doc.getLineAt(editor.doc.selection!![0]).attributes.colIndex
    let columnLenght = getTableColumnsLength()
    //For columns right
    if(direction == 1){
      newColumnPlacement++

      //For new columns right for table end 
      if(newColumnPlacement == columnLenght){
        getTableLines().filter(line=>(line.attributes.colIndex == columnLenght -1)).forEach(line=>{
          let insertPlace = editor.doc.getLineRange(line)[1]
          let delta = new Delta([])
          delta.push({ insert: '\n', attributes: {table:'footer', colIndex:newColumnPlacement, rowIndex:line.attributes.rowIndex} })

          if(insertPlace == editor.doc.length){
            editor.select(insertPlace).insert('\n')
          }
          editor.select(insertPlace).insertContent(delta)
        })
        return
      }
    }

    
    getTableLines().forEach(line=>{
      if(line.attributes.colIndex == newColumnPlacement){
        line.attributes.colIndex ++
        let insertPlace = editor.doc.getLineRange(line)[0]
        let delta = new Delta([])
        delta.push({ insert: '\n', attributes: {table:'footer', colIndex:newColumnPlacement, rowIndex:line.attributes.rowIndex} })
        editor.select(insertPlace).insertContent(delta)
      }

      else if(line.attributes.colIndex > newColumnPlacement){
        line.attributes.colIndex ++
      }
    })
  }

  function addRow(direction: -1 | 1) {
    if(!tableActive())return;

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
    if(!tableActive())return;
    editor.delete([getTableIndexStart()!!, getTableIndexEnd()!!])
    editor.formatLine({})

  }

  function deleteColumn() {
    if(!tableActive())return;

    let columnLines = getCurrentColumnLines()

    let columnIndex = editor.doc.getFormats().colIndex
    columnLines.forEach(line=>{

      //Have not figured out yet, but colums yet: Last column has to be deleted with a different value (-1)
      if(columnIndex == getTableColumnsLength()-1){
        editor.delete([editor.doc.getLineRange(line)[0]-1, editor.doc.getLineRange(line)[1]-1])
      }
      else{
        editor.delete([editor.doc.getLineRange(line)[0], editor.doc.getLineRange(line)[1]])
      }
    })

    //Updates new colIndex attribute
    getTableLines().forEach(line=>{
      if(line.attributes.colIndex > columnIndex){
        line.attributes.colIndex --
      }
    })

  }

  function deleteRow() {
    if(!tableActive())return;

    let rowLines = getCurrentRowLines()
    let rowIndex = editor.doc.getFormats().rowIndex

    //Updates new rowIndex attribute
    getTableLines().forEach(line=>{
      if(line.attributes.rowIndex > rowIndex){
        line.attributes.rowIndex --
      }
    })

    rowLines.forEach(line=>{
      editor.delete([editor.doc.getLineRange(line)[0]-1, editor.doc.getLineRange(line)[1]-1])
      if((line.attributes.rowIndex == 0) && (line.attributes.colIndex == 0)){
        editor.formatLine({})
      }
    })
  }


  //Exstrafunctions for table

  /**Ensure the cursur is in a table*/
  function tableActive(at? : number){
    if(editor.doc.selection?[0]: false){
      if(!at){
        if(editor.getActive().table){
          return true
        }
      }

      if(editor.doc.getLineFormat(at).table){
        return true
      }
    }
    return false
  }

  /**Returns the index of the tables start*/
  function getTableIndexStart(){
    let currentIndex = editor.doc.selection!![0]
    while(editor.doc.getFormats(currentIndex).table){
      currentIndex--
    }
    return currentIndex +1
  }

  /**Returns the index of the tables end*/
  function getTableIndexEnd(){
    let currentIndex = editor.doc.selection!![0]
    while(editor.doc.getFormats(currentIndex).table){
      currentIndex++
    }
    return currentIndex-1
  }
  
  /**Returns the lines in the current table form index to index, defualt all*/
  function getTableLines(from?, to?){
    
    let start
    if(!from){
      start = getTableIndexStart()
    }
    else{
      start = from
    }

    let tableIndexEnd
    if(!to){
      tableIndexEnd = getTableIndexEnd() 
    }
    else{
      tableIndexEnd = to
    }

    return editor.doc.lines.filter(line=>(
      editor.doc.getLineRange(line)[0] >= start
      &&
      editor.doc.getLineRange(line)[1] <= tableIndexEnd +1
    ))
  }
  
  /**Returns first line in current table*/
  function getTableLineStart(){
    editor.doc.getLineAt(getTableIndexStart()!!)
  }

  /**Returns the maximum found number of rows*/
  function getTableRowsLength(){
    let maxNumberOfRows = 0
      getTableLines().forEach(line=>{
        if(line.attributes.rowIndex > maxNumberOfRows)
        maxNumberOfRows = line.attributes.rowIndex
      })
      return maxNumberOfRows + 1
  }

  /**Returns the maximum found number of colums*/
  function getTableColumnsLength(){
    let maxNumberOfColumns = 0
    getTableLines().forEach(line=>{
        if(line.attributes.colIndex > maxNumberOfColumns)
        maxNumberOfColumns = line.attributes.colIndex
      })

      return maxNumberOfColumns + 1
  }

  /**Returns the first index in next row*/
  function getFirsIndexInNextRow(){
    let currentIndex = editor.doc.getLineRange(editor.doc.selection!![0])[1]
    while(editor.doc.getFormats(currentIndex).colIndex != null){
      if(editor.doc.getFormats(currentIndex).colIndex === 0){
        return currentIndex
      }
      currentIndex++
    }
    return currentIndex
  }

  /**Returns the first index in current selected row, null if none*/
  function getFirstIndexInCurrentRow(){
    
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

  /**Returns the current column lines*/
  function getCurrentColumnLines(){
    let currentColumnNumber = editor.doc.getLineAt(editor.doc.selection!![0]).attributes.colIndex
    let currentColumnLines : Line[] = []
    getTableLines().forEach(line=>{
      if(line.attributes.colIndex == currentColumnNumber)
      currentColumnLines.push(line)
    })

    return currentColumnLines
  }

  /**Returns the current row lines*/
  function getCurrentRowLines(){
    let currentRowNumber = editor.doc.getLineAt(editor.doc.selection!![0]).attributes.rowIndex
    let currentColumnLines : Line[] = []
    getTableLines().forEach(line=>{
      if(line.attributes.rowIndex == currentRowNumber)
      currentColumnLines.push(line)
    })

    return currentColumnLines
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
