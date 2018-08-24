//For use with sample app for the KDN

(function() {
   "use strict";
   
   //define a function that will display the ace editor on any page: 
   function showEditor(event) {
        kintone.app.record.setFieldShown('code', false);
        var editor_id = kintone.app.record.getSpaceElement("editor").id;
        var editor = ace.edit(editor_id);
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");
        editor.$blockScrolling = Infinity;
        return editor;
    }
    
    //On the details page, display the editor with [uneditable] code and remove the cursor shown in the editor
    var recordDisplayEvents = 'app.record.detail.show';
    
    kintone.events.on(recordDisplayEvents, function(event) {
        var editor = showEditor(event);
        editor.setValue(event.record['code'].value);
        //Set the editor to "read only" mode
        editor.setReadOnly(true);
        
        //Remove the cursor
        var cursor = document.getElementsByClassName("ace_cursor")[0];
        cursor.parentNode.removeChild(cursor);
        return event;
    });
    
    //When saving the record, save the contents of the editor into the text area field
    var recordSaveEvents = ['app.record.create.submit', 'app.record.edit.submit'];
    
    kintone.events.on(recordSaveEvents, function(event) {
        var editor = showEditor(event);
        event.record['code'].value = editor.getValue();
        return event;        
    });
    //When creating/editing the record, display the editor with code:
    var recordEditEvents = ["app.record.create.show", "app.record.edit.show"];

    kintone.events.on(recordEditEvents, function(event) {
        var editor = showEditor(event);
        if (event.type === "app.record.edit.show") {
            editor.setValue(event.record['code'].value);
            editor.setReadOnly(false);
        }
        return event;
    });
})();
