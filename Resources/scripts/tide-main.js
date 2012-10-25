
$(function(){

    $("#exit-btn").click(function(){
        Ti.App.exit();
    });

    $("#clip-btn").click(function(){
        Ti.UI.Clipboard.setData('text/plain', $("#wmd-input").attr('value'));
        console.log("clipboard");
        console.log($("#wmd-input").attr('value'));
    });

    $("#preview-btn").click(function(){
        var printWindow = Ti.UI.createWindow({
            url: 'app://print.html',
            title: 'Export Previewer',
            modal: true
        });
        printWindow.addEventListener(Ti.PAGE_LOADED, function(){
            childDomWindow = printWindow.getDOMWindow();
            childDomWindow.setPreviewContent($("#wmd-input").attr('value'));
            console.log(childDomWindow);
        });

        printWindow.open();
    });

    $("#load-btn").click(function(){
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
    });

    $("#save-btn").click(function(){
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
    });
});

