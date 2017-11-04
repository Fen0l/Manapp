const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const ipcMain = require('electron').ipcMain;

// Auto reload for html
require('electron-reload')(__dirname);

// Local storage
const Store = require('./store.js');

let win
let winLogin = false

// First instantiate the storage class
const store = new Store({
  configName: 'manapp-preferences',
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 800, height: 600 }
  }
});

function createWindow () {
	// Create the browser window with custom user preferences
	let { width, height } = store.get('windowBounds');
	win = new BrowserWindow({
		width: width, 
		height: height,
		//frame: false,
		show: false
	})

	win.on('resize', () => {
		let { width, height } = win.getBounds();
		// Now that we have them, save them using the `set` method.
		store.set('windowBounds', { width, height });
	});

	// remove menu
	win.setMenu(null);

	// and load the index.html of the app.
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))


	// Open the DevTools.
	win.webContents.openDevTools()

	win.on('ready-to-show', function() { 
		win.show(); 
		win.focus(); 
	});

	// Emitted when the window is closed.
	win.on('closed', () => {
		win = null
	})
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// Force quit on Macos
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
	if (process.mas) return false

	return app.makeSingleInstance(function () {
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore()
				mainWindow.focus()
		}
	})
}


ipcMain.on("initapp:start", function(event, arg) {

	// read local infos
	let data = {
		'user:token': null,
		'user:email': null
	}

	if(store.get('user:token') && store.get('user:email')){
		data['user:token'] = store.get('user:token');
		data['user:email'] =  store.get('user:email');
	}
	
	// setTimeout(function(){ event.sender.send('initapp:response', data); }, 3000);
	
	if(!winLogin)
		event.sender.send('initapp:response', data);
	winLogin = true

});



ipcMain.on("mainWindow:hide", function(event, arg) {
	// read local infos
	win.hide();
});