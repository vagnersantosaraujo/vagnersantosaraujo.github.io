// js/components.js

// Esta função é "privada", só é usada aqui dentro, então não precisa de 'export'.
const loadComponent = (url, elementId) => {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na rede: ${response.statusText}`);
      }
      return response.text();
    })
    .then(data => {
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = data;

        const event = new CustomEvent('componentLoaded', {
          detail: {
            componentURL: url,
            elementId: elementId
          }
        });
        document.dispatchEvent(event);
      }
    })
    .catch(error => console.error(`Erro ao carregar o componente de ${url}:`, error));
};

// AQUI ESTÁ A CORREÇÃO! Adicionamos 'export' para que o main.js possa importar esta função.
export const loadAllComponents = () => {
  loadComponent('/src/components/header.html', 'header-placeholder');
  loadComponent('/src/components/footer.html', 'footer-placeholder');
};