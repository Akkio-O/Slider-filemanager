export function CreateTableFiles(fileInfo, file, isUploaded, progress) {
  // Создание заголовков таблицы
  const headers = [
    "Имя файла",
    "Тип файла",
    "Время изменения",
    "Загружен",
    "Прогресс",
  ];
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  fileInfo.appendChild(thead);

  // Создание тела таблицы
  const tbody = document.createElement("tbody");
  const row = document.createElement("tr");

  // Данные о файле
  const fileData = [file.name, file.type, file.mtime];
  fileData.forEach((data) => {
    const td = document.createElement("td");
    td.textContent = data;
    row.appendChild(td);
  });

  // Чекбокс "Загружен"
  const tdCheckbox = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.disabled = isUploaded;
  tdCheckbox.appendChild(checkbox);
  row.appendChild(tdCheckbox);

  // Прогресс-бар
  const tdProgress = document.createElement("td");
  const progressContainer = document.createElement("div");
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");

  progressBar.style.width = `${progress}%`;
  progressBar.style.backgroundColor = "green";

  progressContainer.style.width = "100%";
  progressContainer.appendChild(progressBar);

  tdProgress.appendChild(progressContainer);
  row.appendChild(tdProgress);

  tbody.appendChild(row);
  fileInfo.appendChild(tbody);
  document.body.appendChild(fileInfo);
}
