'use strict';

var electron = require('electron');
const {Menu, app, BrowserWindow} = require('electron');
var template = require('./lib/menu').template(app);
const pref = require('electron-preference');

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  pref.load(__dirname + '/preference.json');
  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({width: 1200, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/src/index.html');
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
