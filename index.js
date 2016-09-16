'use strict';
const electron = require('electron');

const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const appIcon = new electron.Tray(__dirname + '/images/whatsapp.png');
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400,
		icon: __dirname + '/images/whatsapp.png'
	});

	win.setMenu(null);

	//win.loadURL(`file://${__dirname}/index.html`);
	win.loadURL(`https://web.whatsapp.com/`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
