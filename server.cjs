const downloadFiles = require("./modules/nodeModules/loadRemoteFiles");

const fs = require("fs");
const os = require("os");

const { exec } = require("child_process");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

// 3. ** Запустить одновременную загрузку всех файлов из данного ресурса: https://store.neuro-city.ru/downloads/for-test-tasks/
app.get('/api/data', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://store.neuro-city.ru/downloads/for-test-tasks/');
        const data = await response.json();
        res.send(data);
    } catch (error) {
        res.status(500).send('Ошибка при получении данных: ' + error.message);
    }
});

// 4. ** Список всех файлов в домашней директории
const homeDirectory = os.homedir();
fs.readdir(homeDirectory, (err, files) => {
  if (err) {
    console.error("Ошибка при чтении директории:", err);
    return;
  }
  console.log("Список файлов в домашней директории:");
  files.forEach((file) => {
    console.log(file);
  });
});

// 4. ** Загрузка файлов из удалённого хранилища
const url = "https://store.neuro-city.ru/downloads/for-test-tasks/files-list/";
downloadFiles(url);

// 4. ** Открытие терминала и вывод "Hello, World!"
const command = "echo Hello, World!";
exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error("Ошибка при выполнении команды:", err);
    return;
  }
  console.log(`Вывод из консоли: ${stdout}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
