import { TableFiles } from "./tableFiles.mjs";

export function loadFiles() {
  window.addEventListener("click", (event) => {
    const button = event.target;
    if (button.hasAttribute("data-downloadfiles")) {
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
          console.log(data);
          return Promise.all(
            data.map((file) => {
              return new Promise((resolve, reject) => {
                let progress = 0;
                const interval = setInterval(() => {
                  if (progress < 100) {
                    progress += 100 / data.lenght;
                    const fileInfoTable = document.querySelector(
                      `table[data-filename="${file.name}"]`
                    );
                    if (fileInfoTable) {
                      const progressBar = fileInfoTable.querySelector(".progress-bar");
                      progressBar.style.width = `${progress}%`;
                    }
                  } else {
                    clearInterval(interval);
                  }
                }, 1000);

                setTimeout(() => {
                  const jsonData = JSON.stringify(file, null, data.lenght);
                  const blob = new Blob([jsonData], {
                    type: "application/json",
                  });
                  const link = document.createElement("a");
                  link.href = URL.createObjectURL(blob);
                  link.download = file.name + ".json";

                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  const existingTable = document.querySelector(
                    `table[data-filename="${file.name}"]`
                  );
                  // Есть ли таблица
                  existingTable && existingTable.remove();

                  const fileInfo = document.createElement("table");
                  fileInfo.setAttribute("data-filename", file.name);
                  TableFiles(fileInfo, file, true, progress);

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
  });
}
