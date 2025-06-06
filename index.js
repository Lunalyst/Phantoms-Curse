const { app, BrowserWindow } = require('electron')
 
function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 900,
		icon: __dirname + '/phantoms curse.ico',
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('index.html');
}
 
app.whenReady().then(createWindow)