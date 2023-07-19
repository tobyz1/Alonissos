const hamburgerButton = document.querySelector(".nav-toggler");
const navigation = document.querySelector("nav");

hamburgerButton.addEventListener("click", toggleNav);


function toggleNav() {
  hamburgerButton.classList.toggle("active");
  navigation.classList.toggle("active");

  // Récupérer tous les éléments avec la classe "link"
  var elements = document.getElementsByClassName('link');

  // Parcourir tous les éléments et leur ajouter la classe "active"
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.toggle("active");
  }
}