import { loadFiles } from "./modules/loadFiles.mjs";
import { changeSlide } from "./modules/changeSlide.mjs";

// slider
const slider = document.querySelector(".slider");
const requestSettings = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
fetch("https://reqres.in/api/users", requestSettings)
  .then((response) => response.json())
  .then((data) => {
    changeSlide(slider, data);
  })
  .catch((error) => console.error("Ошибка загрузки пользователей:", error));

//download files from server
loadFiles();