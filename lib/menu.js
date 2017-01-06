const app = require('electron');
const pref = require('electron-preference');
const window = app.BrowserWindow;
 module.exports.template = function(app){
   return [{
     label: "Application",
     submenu: [
         { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
         { type: "separator" },
         {label: "Preference",accelerator: "Command+,", click: pref.show},
         { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
     ]}, {
     label: "Edit",
     submenu: [
         { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
         { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
         { type: "separator" },
         { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
         { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
         { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
         { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
     ]}
 ];
 }
