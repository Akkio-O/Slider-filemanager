export function TableFiles(fileInfo, file, isUploaded, progress) {
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
  checkbox.type = "checkbox";
  checkbox.disabled = !isUploaded;
  checkbox.checked = isUploaded;
  tdCheckbox.appendChild(checkbox);
  row.appendChild(tdCheckbox);

  // Прогресс-бар
  const tdProgress = document.createElement("td");
  const progressContainer = document.createElement("div");
  const progressBar = document.createElement("div");

  progressBar.style.width = `${progress}%`;
  progressBar.style.height = "20px";
  progressBar.style.backgroundColor = "green";
  progressBar.style.transition = "width 0.5s ease";

  progressContainer.style.width = "100%";
  progressContainer.style.backgroundColor = "#e0e0e0";
  progressContainer.appendChild(progressBar);

  tdProgress.appendChild(progressContainer);
  row.appendChild(tdProgress);

  tbody.appendChild(row);
  fileInfo.appendChild(tbody);
  document.body.appendChild(fileInfo);
}
