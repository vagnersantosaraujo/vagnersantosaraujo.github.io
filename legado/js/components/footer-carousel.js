// 1 Acessar o browser = window
// 2 Pegar o HTML = document
// 3 Pegar o botão
// 4 Saber que está sendo clicado

//  Acessar a janela
//  Pegar o HTML
//  Pegar o elemento developer
//  mover o elemento developer

const btnLeft = window.document.querySelector("#arrow-left");
const btnRight = window.document.querySelector("#arrow-right");
const developerCarousel = window.document.querySelector("#developer-carousel");
let pixels = 10; //aqui não dá pra usar cont, pois o valor precisa variar, então vamos usar LET

btnLeft.addEventListener("click", function() {
    pixels = pixels - 10;
    developerCarousel.style = `transform: translateX(${pixels}px)`;
});


btnRight.addEventListener("click", function() {
    pixels = pixels + 10;
    developerCarousel.style = `transform: translateX(${pixels}px)`;
});