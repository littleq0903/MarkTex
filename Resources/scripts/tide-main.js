



$(function(){
    var menu = Ti.UI.createMenu(),
    file_menuitem = Ti.UI.createMenuItem('File'),
    clip_menuitem = Ti.UI.createMenuItem('Clipboard');

    $("#exit-btn").click(function(){
        Ti.App.exit();
    });

    var function_clip = function(){
        Ti.UI.Clipboard.setData('text/plain', $("#wmd-input").attr('value'));
        console.log("clipboard");
        console.log($("#wmd-input").attr('value'));
    };
    $("#clip-btn").click(function_clip);
    clip_menuitem.addItem('Copy to clipboard', function_clip);


    var function_preview = function(){
        var printWindow = Ti.UI.createWindow({
            url: 'app://preview.html',
            title: 'Export Previewer',
            modal: true
        });
        printWindow.addEventListener(Ti.PAGE_LOADED, function(){
            childDomWindow = printWindow.getDOMWindow();
            childDomWindow.setPreviewContent($("#wmd-input").attr('value'));
            console.log(childDomWindow);
        });

        printWindow.open();
    }
    $("#preview-btn").click(function_preview);
    file_menuitem.addItem('Preview', function_preview);

    var function_print = function(){
        window.frames["printer_iframe"].document.getElementById("print_content").innerHTML = $("#wmd-preview").html();
        window.frames['printer_iframe'].print_document();
    };
    $("#print-btn").click(function_print);
    file_menuitem.addItem('Print...', function_print);
    

    var function_load = function(){
        var mainWin = Ti.UI.getCurrentWindow();
        mainWin.openFileChooserDialog(
            function(arg){
                // arg = ['filename1', 'filename2', 'filename3']
                console.log("Load file dialog callback: " + arg);
                var file_to_load = Ti.Filesystem.getFile(arg[0]);
                if (file_to_load.exists()) {
                    file_to_load.open(Ti.Filesystem.MODE_READ);
                    var file_content = file_to_load.read();
                    $("#wmd-input").attr('value', file_content);
                    RealtimeEditor.refreshPreview();
                }
            },
            {
                multiple: false,
                title: 'Load a md file',
                types: 'md'
            }
        )
    };
    $("#load-btn").click(function_load);
    file_menuitem.addItem('Load', function_load);


    var function_savetofile = function(){
        var mainWin = Ti.UI.getCurrentWindow();
        mainWin.openSaveAsDialog(
            function(arg){
                Ti.API.debug(arg.toString());
                var file_to_save = Ti.Filesystem.getFile(arg[0]);
                var file_content = $("#wmd-input").attr('value');
                file_to_save.open(Ti.Filesystem.MODE_WRITE);
                file_to_save.write(file_content);
            },
            {
                multiple: false,
                title: 'Save',
                defaultFIle: 'mdtex_default.md' ,
                types: 'md'
            }
        );
    };
    $("#save-btn").click(function_savetofile);
    file_menuitem.addItem('Save to...', function_savetofile);

    menu.appendItem(file_menuitem);
    menu.appendItem(clip_menuitem);
    Ti.UI.setMenu(menu);


});

