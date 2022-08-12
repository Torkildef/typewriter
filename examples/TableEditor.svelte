<script>
import { Editor } from 'typewriter-editor';
import Root from 'typewriter-editor/lib/Root.svelte';
import Toolbar from 'typewriter-editor/lib/Toolbar.svelte';
    
const editor = window.editor = new Editor();

//Testdata
editor.setHTML(
'<table>'+
'<tr>'+
'<th>Person 1</th>'+
'<th>Person 2</th>'+
'<th>Person 3</th>'+
'<th>Person 4</th>'+
'<th>Person 5</th>'+
'</tr>'+
'<tr>'+
'<td>Emil</td>'+
'<td>Tobias</td>'+
'<td>Linus</td>'+
'<td>Bob</td>'+
'<td>Alice</td>'+
'</tr>'+
'<tr>'+
'<td>16</td>'+
'<td>14</td>'+
'<td>10</td>'+
'<td>40</td>'+
'<td>45</td>'+
'</tr>'+
'<tr>'+
'<td>16</td>'+
'<td>14</td>'+
'<td>10</td>'+
'<td>40</td>'+
'<td>45</td>'+
'</tr>'+
'<tr>'+
'<td>16</td>'+
'<td>14</td>'+
'<td>10</td>'+
'<td>40</td>'+
'<td>45</td>'+
'</tr>'+
'</table>'
)

function insertTable(){
    let rows = prompt("Number of rows");
    let colums = prompt("Number of columns");
    editor.commands.insertTable(rows,colums)
}
</script>

    
<div class="description">
    <h1>Table Editor</h1>
  </div>
  
    <Toolbar {editor} let:active let:commands>
        <div class="toolbar">
        <button
            class="toolbar-button material-icons"
            class:active={active.header === 2}
            on:click={commands.bulletList}>title</button>

        <button
            class="toolbar-button material-icons header3"
            class:active={active.header === 3}
            on:click={commands.header3}>title</button>

        <button
            class="toolbar-button material-icons"
            class:active={active.bold}
            on:click={commands.bold}>format_bold</button>

        <button
            class="toolbar-button material-icons"
            class:active={active.italic}
            on:click={commands.italic}>format_italic</button>

        <button
            class="toolbar-button material-icons"
            disabled={!active.undo}
            on:click={commands.undo}>undo</button>

        <button
            class="toolbar-button material-icons"
            disabled={!active.redo}
            on:click={commands.redo}>redo</button>
        
        <button
            class="toolbar-button material-icons"
            class:active={null}
            title="Add new table"
            on:click={insertTable}>table_chart</button>
        <button
            class="toolbar-button material-icons"
            class:active={null}
            title="Add column right"
            on:click={commands.addColumnRight}>CR</button>
        <button
            class="toolbar-button material-icons"
            class:active={null}
            title="Add column left"
            on:click={commands.addColumnLeft}>CL</button>
            
        <button
            class="toolbar-button material-icons"
            class:active={null}
            title="Add row above"
            on:click={commands.addRowAbove}>RA</button>

        <button
            class="toolbar-button material-icons"
            title="Add row below"
            class:active={null}
            on:click={commands.addRowBelow}>RB</button>

        <button
            class="toolbar-button material-icons"
            class:active={null}
            title="Delete current table"
            on:click={commands.deleteTable}>delete</button>

            <button
            class="toolbar-button material-icons"
            class:active={null}
            title="Delete current column"
            on:click={commands.deleteColumn}>DC</button>

            <button
            class="toolbar-button material-icons"
            class:active={null}
            title="Delete current row"
            on:click={commands.deleteRow}>DR</button>

        </div>

    </Toolbar>
  
    <Root {editor} class="text-content">
    
    </Root>

<style>
    .toolbar {
        display: flex;
        background: #eee;
        padding: 8px;
        margin-bottom: 8px;
        border-radius: 3px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .3), 0 2px 6px rgba(0, 0, 0, .1);
    }
    .toolbar-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        margin: 0;
        width: 40px;
        height: 40px;
        margin-right: 4px;
        border-radius: 4px;
        border: 1px solid #ced4da;
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        cursor: pointer;
    }
    .toolbar-button:hover {
        outline: none;
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    }
    .toolbar-button.active {
        border-color: #80bdff;
        background: #eaf4ff;
    }
    .header3 {
        font-size: 18px;
    }

</style>