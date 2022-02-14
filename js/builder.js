let burger = ['bread_top', 'bread_bottom'];

const container = document.getElementById('burger-container');



function updateBurger(){
    container.innerHTML = "";
    var p;
    for (var i = 0; i < burger.length; i++){
        p = document.createElement('p');
        p.textContent = burger[i];
        container.appendChild(p);
    }
    
}

function remove(id){
    burger.pop(id, 1);
    updateBurger();
}

function restart(){
    burger = ['bread_top', 'bread_bottom'];
    updateBurger();
}

function build(ingredient){
    burger.pop();
    switch(ingredient) {
        case 'burger':
            burger.push('burger');
            break
        case 'cheese':
            burger.push('cheese');
            break
        case 'lettuce':
            burger.push('lettuce');
            break
        case 'tomatos':
            burger.push('tomatos');
            break
        default:
            alert('Unknown ingredient');
            break
    }
    burger.push('bread_bottom');
    updateBurger();
}

const thanksModal = document.getElementById('thanks-modal');
const errorModal = document.getElementById('error-modal');
function toggleEModal(){
    errorModal.classList.toggle('active');
}
function toggleTModal(){
    thanksModal.classList.toggle('active');
}

function order(){
    if(burger.length > 2){
        toggleTModal();
    } else {
        toggleEModal();
    }
}

window.onload = function() {
    updateBurger()
};

