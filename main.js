const {app, BrowserWindow, shell, session } = require('electron')
const path = require('path')


let mainWindow;
let VersionApp = "0.2.0"
let UrlBases = "http://127.0.0.1/";
let UrlConnection = "http://127.0.0.1/Useritium-WebSite/connect.php"
let UrlPanel = "http://127.0.0.1/Useritium-WebSite/panel.php"
app.whenReady().then(() => {
    // GESTION DE LA FENETRE
    mainWindow = new BrowserWindow({
        frame: true,
        title: "Useritium App - " + VersionApp,
        width: 1318,
        height: 710,
        resizable: false,
        icon: path.join(__dirname, "/assets/logo.png"),
        webPreferences: {
            webSecurity: true,
            nodeIntegration: false,
            contextIsolation: false,
        }
    })

    // LANCEMENT DE L'APP
    mainWindow.loadURL(UrlConnection).then(r => console.log("loadUrl", r))
    mainWindow.setMenuBarVisibility(false);

    // TITRE DE L'APP
    mainWindow.webContents.on('page-title-updated', (event, title) => {
        mainWindow.setTitle('Useritium App - ' + VersionApp);
    });

    // GESTION DES URLS
    let lastPage = 0;
    mainWindow.webContents.on('did-navigate', (event, url) => {
        console.log('URL actuelle:', url);

        if (url.startsWith(UrlPanel)){
            console.log("panel");
            lastPage = 1;
        } else if (url === UrlConnection){
            console.log("connection");
            lastPage = 0;
        } else {

            if (lastPage === 0){
                mainWindow.loadURL(UrlConnection);
            } else if (lastPage === 1){
                mainWindow.loadURL(UrlConnection);
            }

            shell.openExternal(url);
        }
    });

    const cookie = { url: UrlBases, name: 'DesktopApp', value: 'on' };
    session.defaultSession.cookies.set(cookie, (error) => {
        if (error) console.error(error);
    });



})

