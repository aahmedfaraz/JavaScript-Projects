const applyButton = document.getElementById('apply');
const toggleButton = document.getElementById('toggle');
const navBar = document.querySelector('nav');
const closeModalButton = document.getElementById('close');
const modal = document.getElementById('modal');

function toggleModal() {
    modal.classList.toggle('show');
}
function toggleNav() {
    navBar.classList.toggle('show');
}

applyButton.addEventListener('click',toggleModal);
closeModalButton.addEventListener('click',toggleModal);
toggleButton.addEventListener('click',toggleNav);
window.addEventListener('click',(e)=>{
    e.target === modal ? toggleModal(): false;
});