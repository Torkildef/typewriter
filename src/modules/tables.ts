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

  function onChanging(event: EditorChangeEvent) {
    // If text was deleted from a table, prevent the row from being deleted unless the _whole_ row was deleted
    // If text in a column was deleted, delete the whole column or none of it
    // i.e. always ensure a table has all the cells needed to keep it correct
  }

  function insertTable(rows: number, columns: number) {
    let scolumns = ''
    for(let i = 0; i < columns; i++){
      scolumns += '<td></td>'
    }

    let srow = ''
    for(let i = 0; i < columns; i++){
      srow += '<tr>' + scolumns + '</tr>'
    }

    let table = '<table>'+srow+'</table>'
    editor.setHTML(table)

    console.log(editor.doc)
  }

  function addColumn(direction: -1 | 1) {

    let allHtml = editor.getHTML()
    
    let tableindexstart = allHtml.search('<table>')
    let tableindexend = allHtml.search('</table>') + '</table>'.length

    let htmlOver = allHtml.slice(0, tableindexstart)
    let tableHtml = allHtml.slice(tableindexstart, tableindexend)
    let htmlUnder = allHtml.slice(tableindexend)

    let newCloumnHtml = '<td></td>'

    let newTableHtml = tableHtml
    for (let i = tableHtml.length; i > 5; i--) {
      if (tableHtml.slice(i-5, i) === '</tr>') {
        newTableHtml = newTableHtml.slice(0, i-5) + newCloumnHtml + newTableHtml.slice(i-5)
      }
    }

    editor.setHTML(htmlOver + newTableHtml + htmlUnder)

  }
  
  function addRow(direction: -1 | 1) {

    let allHtml = editor.getHTML()
    
    let tableindexstart = allHtml.search('<table>')
    let tableindexend = allHtml.search('</table>') + '</table>'.length

    let htmlOver = allHtml.slice(0, tableindexstart)
    let tableHtml = allHtml.slice(tableindexstart, tableindexend)
    let htmlUnder = allHtml.slice(tableindexend)
    
    let numberOfColumn = (tableHtml.match(/\/td/g) || [] ).length + (tableHtml.match(/\/th/g) || [] ).length
    let numberOfRows = (tableHtml.match(/\/tr/g) || [] ).length
    
    let numberOfNewCells = numberOfColumn/numberOfRows
    
    let columhtml = ''
    for(let i = 0; i < numberOfNewCells; i++){
      columhtml += '<td></td>'
    }

    let srow = '<tr>' + columhtml + '</tr>'
    
    let lastRowIndex = tableHtml.lastIndexOf('</tr>') + '</tr>'.length

    let newTableHtml = tableHtml.slice(0,lastRowIndex) + srow + tableHtml.slice(lastRowIndex)

    editor.setHTML(htmlOver + newTableHtml + htmlUnder)

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
