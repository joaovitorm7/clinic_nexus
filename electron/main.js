const { app, BrowserWindow,screen, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const waitOn = require('wait-on');

let mainWindow;
let backendProcess;
let viteProcess;

const BACKEND_PORT = 4000;
const BACKEND_TCP = `tcp:localhost:${BACKEND_PORT}`;
const DEV_URL = 'http://localhost:5173';

function startBackend() {
  return new Promise((resolve, reject) => {
    const backendPath = path.join(__dirname, '../backend');
    const backendEntry = path.join(backendPath, 'dist/main.js');

    backendProcess = spawn('node', [backendEntry], {
      cwd: backendPath,
      shell: true,
      stdio: 'ignore',
      windowsHide: true,       // <<< evita abrir console
      env: { ...process.env, PORT: String(BACKEND_PORT) },
    });

    waitOn({ resources: [BACKEND_TCP], timeout: 20000 }, (err) => {
      if (err) return reject(new Error('Backend não iniciou a tempo'));
      resolve();
    });
  });
}

function startFrontendDevServer() {
  return new Promise((resolve, reject) => {
    const frontendPath = path.join(__dirname, '../frontend');

    viteProcess = spawn('npm', ['run', 'dev'], {
      cwd: frontendPath,
      shell: true,
      stdio: 'ignore',
      windowsHide: true,   
      env: { ...process.env },
    });

    waitOn({ resources: [DEV_URL], timeout: 20000 }, (err) => {
      if (err) return reject(new Error('Frontend não iniciou a tempo'));
      resolve();
    });
  });
}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: false,
    },
  });

  mainWindow.loadURL(DEV_URL);
  mainWindow.setMenu(null);

}


function shutdownAll() {
  try { viteProcess?.kill(); } catch {}
  try { backendProcess?.kill(); } catch {}
}

app.whenReady().then(async () => {
  Menu.setApplicationMenu(null);
  try {
    await startBackend();
    await startFrontendDevServer();
    createWindow();
  } catch (err) {
    console.error(err);
    shutdownAll();
    app.quit();
  }
});

app.on('window-all-closed', () => {
  shutdownAll();
  if (process.platform !== 'darwin') app.quit();
});
