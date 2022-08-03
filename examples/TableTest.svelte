<script>
    import { Delta, Editor, selection } from 'typewriter-editor';
    import Root from 'typewriter-editor/lib/Root.svelte';
    import Toolbar from 'typewriter-editor/lib/Toolbar.svelte';
    import { h, VNode } from 'typewriter-editor';
    
    const editor = window.editor = new Editor();

  //   editor.select(0).insert('There‘s too many kids in this tub.\n' +
  //   'There‘s too many elbows to scrub.\n' +
  //   'I just washed a behind that I‘m sure wasn‘t mine.\n' +
  //   'There‘s too many kids in this tub.'
  // );

  
  //   // Create a new block type for author attributions
  // editor.typeset.lines.add({
    //   name: 'attribution',
    //   selector: 'h3.author',
  //   render: (attributes, children) => {
  //     return h('h3', { class: 'author' }, children);
  //     // If we have JSX enabled in our app we can do this instead:
  //     // return <h3 class="author">{children}</h3>
  //   }
  // });
  
  // // I'm going to insert the text first, then format the lines after
  // const header = 'There‘s too many kids in this tub.';
  // const author = 'Shel Silverstein';
  // editor.select(0).insert(header + '\n' + author + '\n');
  // editor.select(0).formatLine({ header: 1 });
  // editor.select(header.length + 1).formatLine({ attribution: true });


  //     // Create a new block type for author attributions
  // editor.typeset.lines.add({
  //   name: 'table',
  //   selector: 'table, tr',
  //   render: (attributes, children) => {
  //     console.log("CHILD = ", children[0].substring(0, 4))
  //     console.log(h('table', { class: 'klasseForTable' }, children))
  //     return h('table', { class: 'klasseForTable' }, children);
  //     // If we have JSX enabled in our app we can do this instead:
  //     // return <h3 class="author">{children}</h3>
  //   }
  // });

  //       // Create a new block type for author attributions
  // editor.typeset.lines.add({
  //   name: 'table',
  //   selector: 'table, tr',
  //   render: (attributes, children) => {
    //     return h('table', { class: 'klasseForTable' }, children);
  //     // If we have JSX enabled in our app we can do this instead:
  //     // return <h3 class="author">{children}</h3>
  //   }
  // });
  
  // I'm going to insert the text first, then format the lines after
  // const tabletest = '<tr>her skal det være table rundt<tr>';
  // editor.select(0).insert(tabletest + '\n');
  // editor.select(0).formatLine({ table: true });
  // editor.select(header.length + 1).formatLine({ attribution: true });
  
      function test(){
        let row = prompt("Antall rader");
        let colum = prompt("Antall kolonner");
        editor.commands.insertTable(row,colum)
    //     editor.setHTML(
    // 'Table:' +
    // '<table>'+
    // '<tr>'+
    // '<th>Person 1</th>'+
    // '<th>Person 2</th>'+
    // '<th>Person 3</th>'+
    // '<th>Person 4</th>'+
    // '<th>Person 5</th>'+
    // '</tr>'+
    // '<tr>'+
    // '<td>Emil</td>'+
    // '<td>Tobias</td>'+
    // '<td>Linus</td>'+
    // '<td>Bob</td>'+
    // '<td>Alice</td>'+
    // '</tr>'+
    // '<tr>'+
    // '<td>16</td>'+
    // '<td>14</td>'+
    // '<td>10</td>'+
    // '<td>40</td>'+
    // '<td>45</td>'+
    // '</tr>'+
    // '<tr>'+
    // '<td>16</td>'+
    // '<td>14</td>'+
    // '<td>10</td>'+
    // '<td>40</td>'+
    // '<td>45</td>'+
    // '</tr>'+
    // '<tr>'+
    // '<td>16</td>'+
    // '<td>14</td>'+
    // '<td>10</td>'+
    // '<td>40</td>'+
    // '<td>45</td>'+
    // '</tr>'+
    // '</table>'
    // )
    //     editor.setHTML(
    //     '<ul>'+
    //   '<li>Coffee</li>'+
    //   '<li>Tea</li>'+
    //   '<li>Milk</li>'+
    // '</ul>')
        // const delta = new Delta([
        // { insert: 'hey'},
        //   // { insert: '\n', attributes: {table: 'footer'} },
        //   // { insert: 'Hey'},
        //   // { insert: '\n', attributes: {table: 'footer'} },
        //   // { insert: 'Hey'},
        //   // { insert: '\n', attributes: {table: 'footer'} },
        //   // { insert: 'Hey'}
        // ])

        // const delta2 = new Delta([
        //   { insert: 'hey'},
        // ])
        // console.log(delta)
        // console.log(editor.commands)
        // editor.modules.rendering.render()
        // editor.setDelta(delta)
        // // console.log(editor.getActive().table)
        // // if(editor.getActive().table){
        // //   let lastTD = editor.doc.selection[0]
        // //   while(editor.select(lastTD).getActive().table && lastTD<500){
        // //     console.log(lastTD)
        // //     console.log(editor.select(lastTD).getActive().table)
        // //     lastTD += 1;
        // //   }
        //   console.log(editor.getActive().table)
        //   console.log(lastTD)
        //   let word = 'ord'
        //   editor.insert('\n', {table:'row'}, lastTD)
        //   lastTD+=1
        //   editor.select(lastTD).insert('\n', {table:'footer'})
        //   lastTD+=1
        //   editor.select(lastTD).insert(word, null)
        //   lastTD += word.length
        //   editor.select(lastTD).insert('\n', {table:'footer'})
        //   lastTD+=1
        //   editor.select(lastTD).insert(word, null)
        //   lastTD += word.length
        //   editor.select(lastTD).insert('\n', {table:'footer'})
        //   lastTD+=1
        //   editor.select(lastTD).insert(word, null)
        // }
      }

      function addRow(){
        editor.commands.addRow(1)
      }
      
      function addColum(){
        editor.commands.addColumn(1)
      }
  
  editor.setHTML('Table:'+
            '<ul>'+
      '<li>Coffee</li>'+
      '<li>Tea</li>'+
      '<li>Milk</li>'+
    '</ul>'+
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
  //   console.log(editor.getText()); // '\n'
  // console.log(editor.getHTML()); // '<p><br></p>'
  // console.log(editor.getDelta()); // 'Delta( [{ insert: '\n' }] )'
  // console.log(editor.doc); // 'TextDocument( [{ attributes: {}, content: [] }] )'  

    //   '<tr>'+
    //     '<td>Emil</td>'+
    //     '<td>Tobias</td>'+
    //     '<td>Linus</td>'+
    //   '</tr>'+
    // '</table>'
    //     '<ul>'+
    //   '<li>Coffee</li>'+
    //   '<li>Tea</li>'+
    //   '<li>Milk</li>'+
    // '</ul>'
    // )

  // editor.setHTML(
  //   '<ul>'+
  //     '<li>Coffee</li>'+
  //     '<li>Tea</li>'+
  //     '<li>Milk</li>'+
  //   '</ul>'
  //   )

    // editor.setHTML(
    // '<table>'+
    //     '<tr>Emil</tr>'+
    //     '<tr>Tobias</tr>'+
    //     '<tr>Linus</tr>'+
    // '</table>')
  
  // console.log(editor.getText()); // '\n'
  // console.log(editor.getHTML()); // '<p><br></p>'

  console.log(editor.getDelta()); // 'Delta( [{ insert: '\n' }] )'
  console.log(editor.doc); // 'TextDocument( [{ attributes: {}, content: [] }] )'  

  // console.log(editor.typeset.lines)

  function inTest(){
    editor.insert("\n", {table:'root'})

//     console.log(editor.getActive())
//     console.log('her')

//     var delta = [{
//   insert: {
//     image: "https://imgur.com/"
//   },
//   attributes: {
//     duration: 600
//   }
// }, {
//   insert: "Hello",
//   attributes: {
//     alt: "Funny cat photo"
//   }
// }, {
//   insert: {
//     video: "https://youtube.com/"
//   },
//   attributes: {
//     bold: true
//   }
// }];
  
//     editor.insert(delta)
    // console.log(editor.getDelta())
    // let delta = new Delta()
    // // editor.select(editor.doc.selection[0]).insert('hey', {list: 'bullet'})
    // console.log(editor)
  }
    </script>

<table>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
</table>
    
    <div class="description">
      <h1>Tabletesting</h1>
      <p>
        Create your own toolbar with the renderless Toolbar component.
      </p>
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
            class:active={active.italic}
            on:click={test}>table_chart</button>
          <button
          class="toolbar-button material-icons"
          class:active={active.italic}
          on:click={addColum}>C</button>
          <button
          class="toolbar-button material-icons"
          class:active={active.italic}
          on:click={addRow}>R</button>

        <button
            class="toolbar-button material-icons"
            on:click={inTest}>!</button>
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

    :global(table, tr, td, th) {

      border-collapse: collapse;
      border:1px solid black;
}
    </style>
    