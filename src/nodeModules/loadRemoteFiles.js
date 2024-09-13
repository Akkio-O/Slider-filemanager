const fs = require("fs");
const path = require("path");
const axios = require("axios");

async function downloadFiles(url) {
  try {
    const response = await axios.get(url);
    console.log("Тип данных:", typeof response.data);

    for (const file of response.data) {
      const fileName = typeof file === "string" ? file : file.name;

      if (fileName && file.size > 0) {
        if (!fileName.includes("0 KB")) {
          const fileUrl = `${url}${fileName}`
          const filePath = path.join(__dirname, 'forTestFiles' , fileName)

          const fileResponse = await axios.get(fileUrl, {
            responseType: "stream",
          });
          const writer = fs.createWriteStream(filePath);

          fileResponse.data.pipe(writer);

          writer.on("finish", () => {
            console.log(`Файл загружен: ${filePath}`);
          });

          writer.on("error", (err) => {
            console.error(`Ошибка при загрузке файла ${fileName}:`, err);
          });
        }
      }
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

module.exports = downloadFiles;
