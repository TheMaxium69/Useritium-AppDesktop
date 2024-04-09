const {app, BrowserWindow} = require('electron')
const path = require('path')


let mainWindow;
app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        frame: true,
        title: "Useritium App - 0.1.0",
        width: 1318,
        height: 710,
        resizable: true,
        icon: path.join(__dirname, "/assets/logo.png"),
        webPreferences: {
            webSecurity: true,
            nodeIntegration: false,
            contextIsolation: false,
        }
    })

    // mainWindow.loadFile('content/test.html')
    // mainWindow.loadFile('content/index.html').then(err => console.log(err))
    mainWindow.loadURL('https://useritium.fr').then(r => console.log(r))


    mainWindow.setMenuBarVisibility(false);

})