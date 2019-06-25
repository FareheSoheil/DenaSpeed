var editor;

function createPersianEditor(config) {
    editor = CKEDITOR.appendTo('editor', config);
    editor.setData($("#content").val());
}
function createEnglishEditor(config) {
    editor = CKEDITOR.appendTo('editor-ltr', config);
    editor.setData($("#content-ltr").val());
}
function createInlineEditor(config) {
    CKEDITOR.disableAutoInline = true;
    CKEDITOR.inline('editor-inline', config);
}

var config = {};

config.language = 'en';
createEnglishEditor(config);

config.language = 'fa';
config.font_names =
    "Tahoma;" +
    "Nazanin/Nazanin, B Nazanin, BNazanin;" +
    "Yekan/Yekan, BYekan, B Yekan, Web Yekan;" +
    "IranSans/IranSans, IranSansWeb;" +
    "Parastoo/Parastoo;" +
    "Arial/Arial, Helvetica, sans-serif;" +
    "Times New Roman/Times New Roman, Times, serif;";
createPersianEditor(config);

createInlineEditor(config);

