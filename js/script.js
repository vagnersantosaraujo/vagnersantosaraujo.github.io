const movie = {
    title: "Harry Potter",
    url: "https://www.harrypotter.com/",
};

//HTML
const img = document.createElement("img"); //cria o elemento img do HTML 
const listBanners = document.querySelector(".list-banners"); //seleciona o elemento banner do HTML

img.src = "/public/assets/img/angularjs.svg";//src é só a característica que o elemento img vai receber
img.alt = "Logo do youtube";//alt é outra característica que o elemento img vai receber
img.classList.add("logo");//adiciona a classe "logo" do HTML ao elemento img

listBanners.insertAdjacentElement("beforeend", img);//insere o elemento img no HTML na posição "beforeend"