import Editor, { EditorChangeEvent } from '../Editor';
import { Delta } from 'typewriter-editor';
import { h } from '../rendering/vdom';
import { LineData, LineType } from '../typesetting';



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

  //Added for preventing
  editor.on('change', onChanging);

  function onChanging(event: EditorChangeEvent) {

    // If text was deleted from a table, prevent the row from being deleted unless the _whole_ row was deleted
    // If text in a column was deleted, delete the whole column or none of it
    // i.e. always ensure a table has all the cells needed to keep it correct
  }

  function insertTable(rows: number, columns: number) {
    let delta = new Delta([])

    for(let i = 0; i < rows; i++){
      delta.push({ insert: '\n', attributes: {table:'row'} })
      for(let i = 0; i < columns; i++){
        delta.push({ insert: '\n', attributes: {table:'footer'} })
      }
    }
    
    editor.insertContent(delta)


    


    // let scolumns = ''
    // for(let i = 0; i < columns; i++){
    //   scolumns += '<td></td>'
    // }

    // let srow = ''
    // for(let i = 0; i < columns; i++){
    //   srow += '<tr>' + scolumns + '</tr>'
    // }

    // let table = '<table>'+srow+'</table>'
    // editor.setHTML(table)

  }

  function addColumn(direction: -1 | 1) {

    if(editor.getActive().table && editor.doc.selection){
      let index = editor.doc.selection[0]
      //Getting start of table
      while(editor.doc.getLineAt(index)){
        if(editor.doc.getLineAt(index).attributes.table){
          index--
        }
        else{
          break
        }
      }
      index++

      console.log(editor.doc.getLineAt(index))
      if(direction == -1){
        while(editor.doc.getLineAt(index)){
          console.log(-1)
          if(editor.doc.getLineAt(index).attributes.table){
            if(editor.doc.getLineAt(index).attributes.table === 'row'){
              editor.select(index).insert( '\n', {table:'footer'})
            }
          }
          else{
            break
          }
          index ++ 
        }
      }

      //Evig while
      // if(direction == 1){
      //   console.log(editor.doc.getLineAt(index))
      //   index++
      //   console.log(editor.doc.getLineAt(index))
      //   while(editor.doc.getLineAt(index)){
      //     console.log(1)
      //     console.log(editor.doc.getLineAt(index).attributes.table)
      //     if(editor.doc.getLineAt(index).attributes.table){
      //       if(editor.doc.getLineAt(index).attributes.table === 'row'){
      //         editor.select(index-1).insert( '\n', {table:'footer'})
      //         index++
      //       }
      //     }
      //     else{
      //       console.log('her')
      //       break
      //     }
      //   }
      //   index ++ 
      // }

      // let index = editor.doc.selection[0]
      // let columNumber = 0

      // //getting current columnnumber
      // while(editor.doc.getLineAt(index)){
      //   if(editor.doc.getLineAt(index).attributes.table === 'row'){
      //     break
      //   }
      //   if(editor.doc.getLineAt(index).attributes.table === 'footer' || editor.doc.getLineAt(index).attributes.table === 'header'){
      //     columNumber++
      //   }
      //   index--
      // }

      // //Getting start of table
      // while(editor.doc.getLineAt(index)){
      //   if(editor.doc.getLineAt(index).attributes.table){
      //     index--
      //   }
      //   else{
      //     break
      //   }
      // }
      // index++

      // //Puttnig inn new colums
      // let culumCumcunter = 0
      // while(editor.doc.getLineAt(index)){
      //   if(editor.doc.getLineAt(index).attributes.table){
      //     if(editor.doc.getLineAt(index).attributes.table === 'row'){
      //       culumCumcunter = 0
      //     }
      //     if(columNumber == culumCumcunter){
      //       editor.select(index).insert( '\n', {table:'footer'})
      //     }
      //     if(editor.doc.getLineAt(index).attributes.table === 'footer' || editor.doc.getLineAt(index).attributes.table === 'header'){
      //       culumCumcunter ++
      //     }
      //     index ++
          
      //   }
      //   else{
      //     break
      //   }
      // }



      
    }

    // if(editor.getActive().table && editor.doc.selection){
    //   let newColumnPlacement = editor.doc.selection[0]


    //   while(editor.doc.getLineAt(newRowPlacement)){
    //     if(editor.doc.getLineAt(newRowPlacement).attributes.table){

    //       if(editor.doc.getLineAt(newRowPlacement).attributes.table === 'row'){
    //         break
    //       }
    //       newRowPlacement += direction
    //     }
    //   }

    //   newRowPlacement--
    //   editor.select(newRowPlacement).insert('\n', {table:'row'} )
    //   newRowPlacement++
    //   const firstCell = newRowPlacement
    //     for(let i = 0; i < 5; i++){
    //       editor.select(newRowPlacement+i).insert( '\n', {table:'footer'})
    //     }

    //     editor.select(firstCell)
    // }


    // console.log(editor.getActive())
    // console.log(editor.doc.selection)

    // //Tror denne gir plassering av cursor/selector
    // // console.log(editor.getAllBounds(editor.doc.selection))
    // // console.log(editor.getBounds(editor.doc.selection))

    // console.log(editor.getActive())
    // let tableElm = editor.getActive().tableRoot
    // console.log(tableElm)

    // // editor.doc.getLineBy(id)
    
    // console.log(editor.doc.selection)
    // if(editor.doc.selection){
    //   console.log(editor.doc.getLineAt(editor.doc.selection[0]))
    //   editor.doc.getLineAt(editor.doc.selection[0])
    //   editor.insert('hey')
    // }

    // let allHtml = editor.getHTML()
    
    // let tableindexstart = allHtml.search('<table>')
    // let tableindexend = allHtml.search('</table>') + '</table>'.length

    // let htmlOver = allHtml.slice(0, tableindexstart)
    // let tableHtml = allHtml.slice(tableindexstart, tableindexend)
    // let htmlUnder = allHtml.slice(tableindexend)

    // let newCloumnHtml = '<td></td>'

    // let newTableHtml = tableHtml
    // for (let i = tableHtml.length; i > 5; i--) {
    //   if (tableHtml.slice(i-5, i) === '</tr>') {
    //     newTableHtml = newTableHtml.slice(0, i-5) + newCloumnHtml + newTableHtml.slice(i-5)
    //   }
    // }

    // editor.setHTML(htmlOver + newTableHtml + htmlUnder)

  }
  
  function addRow(direction: -1 | 1) {
    if(editor.getActive().table && editor.doc.selection){
      let newRowPlacement = editor.doc.selection[0]

      let columns = 0
      while(editor.doc.getLineAt(newRowPlacement)){
        if(editor.doc.getLineAt(newRowPlacement).attributes.table){

          if(editor.doc.getLineAt(newRowPlacement).attributes.table === 'row'){
            columns = editor.doc.getLineAt(newRowPlacement).attributes.columns
            break
          }
          newRowPlacement += direction
        }
      }

      let delta = new Delta([])
      let row = { insert: '\n', attributes: {table:'row', columns:columns}}
      delta.push(row)
      for(let i = 0; i < row.attributes.columns; i++){
        delta.push({ insert: '\n', attributes: {table:'footer'} })
      }
      
      editor.select(newRowPlacement).insertContent(delta)

      
      // editor.select(newRowPlacement).insert('\n', {table:'row'} )
      // newRowPlacement++
      // const firstCell = newRowPlacement
      //   for(let i = 0; i < 5; i++){
      //     editor.select(newRowPlacement+i).insert( '\n', {table:'footer'})
      //   }

      //   editor.select(firstCell)
    }
    



    // let allHtml = editor.getHTML()
    
    // let tableindexstart = allHtml.search('<table>')
    // let tableindexend = allHtml.search('</table>') + '</table>'.length

    // let htmlOver = allHtml.slice(0, tableindexstart)
    // let tableHtml = allHtml.slice(tableindexstart, tableindexend)
    // let htmlUnder = allHtml.slice(tableindexend)
    
    // let numberOfColumn = (tableHtml.match(/\/td/g) || [] ).length + (tableHtml.match(/\/th/g) || [] ).length
    // let numberOfRows = (tableHtml.match(/\/tr/g) || [] ).length
    
    // let numberOfNewCells = numberOfColumn/numberOfRows
    
    // let columhtml = ''
    // for(let i = 0; i < numberOfNewCells; i++){
    //   columhtml += '<td></td>'
    // }

    // let srow = '<tr>' + columhtml + '</tr>'
    
    // let lastRowIndex = tableHtml.lastIndexOf('</tr>') + '</tr>'.length

    // let newTableHtml = tableHtml.slice(0,lastRowIndex) + srow + tableHtml.slice(lastRowIndex)

    // editor.setHTML(htmlOver + newTableHtml + htmlUnder)

  }

  function deleteTable() {

  }

  function deleteColumn() {

  }

  function deleteRow() {

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
