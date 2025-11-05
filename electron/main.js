const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let mainWindow;
let backendProcess;

const BACKEND_PORT = 4000;



function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const waitOn = require("wait-on");

  // Para desenvolvimento, carregar o Vite dev server
  const devURL = "http://localhost:5173";

  mainWindow.loadURL(devURL).catch((err) => {
    console.error("Erro ao carregar URL do frontend:", err);
  });

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
    if (backendProcess) backendProcess.kill();
  });
}

function startBackend() {
  const backendPath = path.join(__dirname, "../backend");
  const backendEntry = path.join(backendPath, "dist/main.js");

  console.log(`Iniciando backend na porta ${BACKEND_PORT}...`);

  backendProcess = spawn("node", [backendEntry], {
    cwd: backendPath,
    shell: true,
    stdio: "inherit",
    env: { ...process.env, PORT: BACKEND_PORT }
  });

  backendProcess.on("close", (code) => {
    console.log(`Backend finalizado com código ${code}`);
  });
}

// Inicia o Vite dev server antes do Electron
function startFrontendDevServer() {
  const frontendPath = path.join(__dirname, "../frontend");
  const viteProcess = spawn("npm", ["run", "dev"], {
    cwd: frontendPath,
    shell: true,
    stdio: "inherit"
  });

  viteProcess.on("close", (code) => {
    console.log(`Frontend finalizado com código ${code}`);
  });
}

app.whenReady().then(() => {
  startBackend();
  startFrontendDevServer(); // start Vite dev server
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
