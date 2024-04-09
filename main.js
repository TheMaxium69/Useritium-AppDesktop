const {app, BrowserWindow, shell} = require('electron')
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
    mainWindow.loadURL('https://useritium.fr/connect.php').then(r => console.log(r))

    mainWindow.webContents.on('page-title-updated', (event, title) => {
        mainWindow.setTitle('Useritium App - 0.1.0');
    });

    let lastPage = 0;
    mainWindow.webContents.on('did-navigate', (event, url) => {
        console.log('URL actuelle:', url);
        // Vous pouvez ajouter ici le code pour réagir aux changements d'URL
        
        if (url.startsWith("https://useritium.fr/panel.php")){

            console.log("panel");

            lastPage = 1;

        } else if (url === "https://useritium.fr/connect.php"){

            console.log("connection");

            lastPage = 0;

        } else {

            if (lastPage === 0){
                mainWindow.loadURL('https://useritium.fr/connect.php');
            } else if (lastPage === 1){
                mainWindow.loadURL('https://useritium.fr/panel.php');
            }

            shell.openExternal(url);
        }


    });

















    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.insertCSS(`
            
body {
    overflow-y: auto;
}

body::-webkit-scrollbar {
    width: 5px;
    
}

body::-webkit-scrollbar-track {
    background: #3d3d3d; // BackCouleur  
}

body::-webkit-scrollbar-thumb {
    background: #1e1e1e;
    border-radius: 4px;
}

body::-webkit-scrollbar-thumb:hover {
    background: #000926;
}

        `);
        mainWindow.webContents.executeJavaScript(`
        
        `);
    });

    mainWindow.setMenuBarVisibility(false);

})

