

const {remote} = require('electron');
const {BrowserWindow, app, win} = remote;
const ipcRenderer = require('electron').ipcRenderer;


ipcRenderer.send("initapp:start", []);

let loginWindow;

ipcRenderer.on('initapp:response', (event, arg) => {
	console.log("test " + loginWindow); // prints "Hello World!"
	if(!arg['user:token']){
	// redirect login renderer

	loginWindow = new BrowserWindow({toolbar: false, show: true, height: 800, width: 600, name:'appman_login_window'});
	loginWindow.webContents.openDevTools()
	loginWindow.loadURL('file://' + app.getAppPath() + '/sections/login.html');
	

	// Hide the main window
	ipcRenderer.send("mainWindow:hide", []);
	// [0].show();
 
    }


});
