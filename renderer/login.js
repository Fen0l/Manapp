

const {remote} = require('electron');
const ipcRenderer = require('electron').ipcRenderer;


// Init buttons
window.onload = function() {
	document.querySelector('#btnLogin').addEventListener('click', triggerLoginBtn);
	document.querySelector('#btnRegister').addEventListener('click', triggerRegisterBtn);
	document.querySelector('#btnFPassword').addEventListener('click', triggerFPasswordBtn);
}

function triggerLoginBtn(){
	// Disable all btn
	// Get Datas
	// Send IPC
	// Check result

	console.log("function login");
}
function triggerRegisterBtn(){
	// CHange form
	console.log("function register");
}
function triggerFPasswordBtn(){
	// CHange form
	console.log("function fpass");
}