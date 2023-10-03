let headerDesktop = document.querySelector('.header-desktop')
let headerMobile = document.querySelector('.header-mobile')

document.addEventListener("scroll", (event) => {

    let sectionWidth = window.innerWidth    
    let mobileSize = 660
    let header = headerMobile

    if(sectionWidth > mobileSize){
        header = headerDesktop
    }

    let scrollY = window.scrollY

    if(scrollY >= 300){
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky')
    }

}, {passive: true} )
