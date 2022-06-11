// console.log("im here");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let window;

function createWindow(){
    window = new BrowserWindow({title: "Admin Page"});
    window.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
    }));

    //To open directly a specific url
    // window.loadURL("https://google.com");

    // To add devtools
    window.webContents.openDevTools();

    window.on("closed", () => {
        window = null;
    })
}

app.on("ready", createWindow);