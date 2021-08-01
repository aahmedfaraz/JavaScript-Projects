const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', e => {
    burger.className = `burger fas fa-${burger.classList.contains('fa-bars')? 'times' : 'bars'}`;
    menu.classList.toggle('show');
})