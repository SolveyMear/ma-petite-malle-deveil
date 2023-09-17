let burgerButton = document.querySelector('.burger-menu-btn')

burgerButton.addEventListener('click', function () {


    let burgerMenu = document.querySelector('.header-mobile');

    let isOpen = burgerMenu.classList.contains('open');

    if (isOpen) {
        burgerMenu.classList.remove('open');
    } else {
        burgerMenu.classList.add('open');
    }

    let body = document.querySelector('body');
    let isHeaderOpen = body.classList.contains('header-open');

console.log('open', isHeaderOpen)

    if(isHeaderOpen){
        body.classList.remove('header-open')
    } else{
        body.classList.add('header-open')
    };

})

