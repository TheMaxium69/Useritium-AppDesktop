const {app, BrowserWindow} = require('electron')
const path = require('path')


let mainWindow;
function createWindow () {
    mainWindow = new BrowserWindow({
        frame: false,
        title: "Useritium App - 0.1.0",
        width: 1318,
        height: 710,
        resizable: false,
        icon: path.join(__dirname, "/assets/logo.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    mainWindow.loadFile('content/index.html')
    mainWindow.setMenuBarVisibility(false);

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0){
            createWindow()
        }
    })
})