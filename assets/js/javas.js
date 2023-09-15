let uploadButton = document.getElementById('upload-button');
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");
let container = document.querySelector(".coli");
let error = document.getElementById('error');
let imageDisplay = document.getElementById("image-display");


const fileHandler = (file, name, type) => {
  // if (type.split("/")[0] !== "image") {
  //   error.innerText = 'Please uplaod the image file';
  //   return false;
  // }
  // error.innerText = "";
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    let imageContainer = document.createElement("figure");
    let img = document.createElement("img");
    img.src = reader.result;
    imageContainer.appendChild(img);
    imageContainer.innerHTML += `<figcaption>${name}</figcaption>`;
    imageDisplay.appendChild(imageContainer);

    // Populate the 'photo' field with the selected file
    let hiddenInput = document.querySelector('input[name="photo"]');
    hiddenInput.value = file.name

    // Submit the form to the server
    let form = document.querySelector('form');
    form.submit();
  };
};



// uplaod button
uploadButton.addEventListener("change", () => {
  imageDisplay.innerHTML = "";
  Array.from(uploadButton.files).forEach((file) => {
    fileHandler(file, file.name, file.type);
  });
})


container.addEventListener("dragenter", (e) => {
  e.preventDefault();
  e.stopPropagation();
  container.classList.add("active");
}, false);

container.addEventListener("dragleave", (e) => {
  e.preventDefault();
  e.stopPropagation();
  // console.log(e)
  container.classList.remove("active");
}, false);

container.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
  container.classList.add("active");
}, false);


container.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  // console.log(e)


  container.classList.remove("active");
  let draggedData = e.dataTransfer;
  let files = draggedData.files;
  imageDisplay.innerHTML = "";
  Array.from(files).forEach(file => {
    fileHandler(file, file.name, file.type);

    // populating input photo with file.name

    let hiddenInput = document.querySelector('input[name="photo"]');
    hiddenInput.value = file.name
console.log(file.name);

  });
}, false);


window.onload = () => {

  error.innerText = "";
};