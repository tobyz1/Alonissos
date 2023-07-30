const hamburgerButton = document.querySelector(".nav-toggler");
const navigation = document.querySelector("nav");

hamburgerButton.addEventListener("click", toggleNav);


function toggleNav() {
  hamburgerButton.classList.toggle("active");
  navigation.classList.toggle("active");
}



const slidingAlonissosPhotos = document.querySelector('.alonissos-photos');

window.addEventListener('scroll', () => {

    const {scrollTop, clientHeight} = document.documentElement;

    const topElementToTopViewport = slidingAlonissosPhotos.getBoundingClientRect().top;

    console.log(topElementToTopViewport);

    if(scrollTop > (scrollTop + topElementToTopViewport).toFixed() - clientHeight * 0.7){
      slidingAlonissosPhotos.classList.add('active')
    }
})

const slidingalonissosText = document.querySelector('.alonissos');

window.addEventListener('scroll', () => {

    const {scrollTop, clientHeight} = document.documentElement;

    const topElementToTopViewport = slidingalonissosText.getBoundingClientRect().top;

    console.log(topElementToTopViewport);

    if(scrollTop > (scrollTop + topElementToTopViewport).toFixed() - clientHeight * 0.7){
      slidingalonissosText.classList.add('active')
    }
})

const slidingOuvertureText = document.querySelector('.ouverture');

window.addEventListener('load', () => {

   slidingOuvertureText.classList.add('active');

})

const openPanorama = document.querySelector('.panorama');

window.addEventListener('load', () => {

   openPanorama.classList.add('active');

})