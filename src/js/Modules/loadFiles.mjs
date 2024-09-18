import { CreateTableFiles } from "./CreateTableFiles.mjs";

export function loadFiles() {
  const requestSettings = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const url = "http://localhost:3000/api/data/";

  fetch(url, requestSettings)
    .then((response) => {
      console.log("Response status:", response.status);
      return response.json();
    })
    .then((data) => {
      return Promise.all(
        data.map((file) => {
          return new Promise((resolve, reject) => {
            let progress = 0;
            
            // Удаление таблицы, если она уже есть
            const existingTable = document.querySelector(
              `table[data-filename="${file.name}"]`
            );
            if (existingTable) existingTable.remove();

            const fileInfo = document.createElement("table");
            fileInfo.setAttribute("data-filename", file.name);

            CreateTableFiles(fileInfo, file, true, progress);
            const checkbox = fileInfo.querySelector(".checkbox");
            const progressBar = fileInfo.querySelector(".progress-bar");

            if (!progressBar) {
              console.error(`Прогресс-бар не найден для файла: ${file.name}`);
              return reject();
            }

            const interval = setInterval(() => {
              if (progress < 100) {
                progress += 10; 
                progressBar.style.width = `${progress}%`;
                console.log(`Прогресс для ${file.name}: ${progress}%`);
                if (progress === 100) {
                  checkbox.checked = true;
                }
              } else {
                clearInterval(interval);
              }
            }, 300);

            setTimeout(() => {
              const jsonData = JSON.stringify(file, null, 2);
              const blob = new Blob([jsonData], { type: "application/json" });
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = file.name + ".json";

              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              resolve(file);
              clearInterval(interval);
            }, 3000);
          });
        })
      );
    })
    .catch((error) => {
      console.error("Ошибка загрузки данных:", error);
    });
}
