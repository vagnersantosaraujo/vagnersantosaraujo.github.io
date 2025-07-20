// Este é o nosso "banco de dados fake".
// É um Array de Objetos, onde cada Objeto representa um post do blog.

const posts = [
  {
    id: 1,
    title: "Minha Jornada no Desenvolvimento Web",
    author: "Vagner",
    date: "20 de Julho de 2025",
    content: `
      <p>Este é o primeiro post do meu blog! Estou animado para compartilhar minha jornada aprendendo a programar do zero.</p>
      <p>Até agora, já configurei todo o meu ambiente de desenvolvimento no meu novo Mac Mini e aprendi os fundamentos de HTML e CSS. É incrível ver como algumas linhas de código podem criar uma página web de verdade!</p>
    `
  },
  {
    id: 2,
    title: "O que é um CMS e por que estou construindo um?",
    author: "Vagner",
    date: "21 de Julho de 2025",
    content: `
      <p>CMS significa <strong>Content Management System</strong> (Sistema de Gerenciamento de Conteúdo).</p>
      <p>Em vez de usar uma plataforma pronta como WordPress, decidi construir a minha para realmente entender como a web funciona por baixo dos panos. É um desafio e tanto, mas a cada passo sinto que estou aprendendo muito mais!</p>
    `
  }
];