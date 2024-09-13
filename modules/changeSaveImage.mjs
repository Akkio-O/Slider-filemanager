export function changeSaveImage(imageObj, currentRotate, modal) {
    const canvas = document.getElementById("imageCanvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageObj.src;
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    };
    
    const rotateButton = modal.querySelector("#rotateButton");
    const saveButton = modal.querySelector("#saveButton");
    
    rotateButton.addEventListener("click", () => {
      currentRotate += 90;
      const radians = (currentRotate * Math.PI) / 180;
      canvas.width = canvas.height;
      canvas.height = canvas.width;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians);
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
      ctx.restore();
    });
    
    saveButton.addEventListener("click", () => {
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = canvas.toDataURL();
      link.click();
    });
}