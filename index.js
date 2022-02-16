import '/style.css';

//SIDEBAR
const sidebar_buttons = document.getElementsByClassName('toggleSidebar');
for(var i = 0; i < sidebar_buttons.length; i++){
    sidebar_buttons[i].addEventListener('click', function() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
    });
}