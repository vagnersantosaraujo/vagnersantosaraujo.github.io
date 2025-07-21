// 1. Seleciona o elemento no HTML que tem o id "posts-container".
//    É aqui que vamos colocar todos os nossos posts.
const postsContainer = document.getElementById('posts-container');

// 2. Cria um "loop" que passa por cada item (cada 'post') dentro do array 'posts'.
posts.forEach(post => {
  
// 3. Para cada post, cria um elemento <article> no HTML.
  const articleElement = document.createElement('article');
  
// 4. Preenche o conteúdo do <article> com os dados do post.
//    Estamos usando "template literals" (o texto entre crases ``)
//    para montar o HTML de forma mais fácil.
  articleElement.innerHTML = `
    <h2>${post.title}</h2>
    <p><em>Por ${post.author} em ${post.date}</em></p>
    <div>${post.content}</div>
  `;
  
// 5. Adiciona o novo <article> que acabamos de criar dentro do 'postsContainer'.
  postsContainer.appendChild(articleElement);
});