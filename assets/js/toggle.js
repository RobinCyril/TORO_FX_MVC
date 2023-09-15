const darkModeToggle= document.getElementById('dark-mode-toggle');
const mainElement = document.querySelector('main');

darkModeToggle.addEventListener('change', ()=>{
    if(darkModeToggle.checked){
        mainElement.classList.add('dark-mode');
    }
    else{
        mainElement.classList.remove('dark-mode');
    }
});