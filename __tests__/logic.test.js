// Mock das bibliotecas
const marked = {
  parse: (text) => text
};
const DOMPurify = {
  sanitize: (html) => {
    return html.replace(/<script\b[^>]*>.*?<\/script>/gi, '');
  }
};

const { createNewPost, deletePost, updatePost } = require('../logic.js');

describe('Função createNewPost', () => {
    it('deve criar um post completo com imagem de destaque', () => {
        const title = 'Título de Teste';
        const markdownContent = '**Isso é um teste!**';
        const featuredImage = 'data:image/png;base64,...';
        
        // A chamada da função agora inclui a imagem e os mocks
        const newPost = createNewPost(title, markdownContent, featuredImage, marked.parse, DOMPurify.sanitize);

        expect(newPost.title).toBe(title);
        expect(newPost.contentMarkdown).toBe(markdownContent);
        expect(newPost.featuredImage).toBe(featuredImage); // Verifica a imagem
    });
});

describe('Função deletePost', () => {
    // Seus testes de deletePost estão corretos e não precisam de mudança
    it('deve remover um post de um array com base no ID', () => {
        const samplePosts = [{ id: 1 }, { id: 2 }, { id: 3 }];
        expect(deletePost(samplePosts, 2).length).toBe(2);
    });
    it('deve retornar o array original se o ID não for encontrado', () => {
        const samplePosts = [{ id: 1 }, { id: 2 }];
        expect(deletePost(samplePosts, 99)).toEqual(samplePosts);
    });
});

describe('Função updatePost', () => {
    it('deve atualizar todas as propriedades de um post existente', () => {
        let posts = [{ id: 1, title: 'Antigo', contentMarkdown: 'Antigo', featuredImage: '' }];
        const newTitle = 'Novo';
        const newMarkdown = '*Novo*';
        const newImage = 'data:image/jpeg;base64,...';
        
        // A chamada da função agora inclui a imagem e os mocks
        const updatedPosts = updatePost(posts, 1, newTitle, newMarkdown, newImage, marked.parse, DOMPurify.sanitize);
        const updatedPost = updatedPosts.find(p => p.id === 1);

        expect(updatedPost.title).toBe(newTitle);
        expect(updatedPost.contentMarkdown).toBe(newMarkdown);
        expect(updatedPost.featuredImage).toBe(newImage);
    });
});

describe('Segurança da Função createNewPost', () => {
    it('deve remover tags <script> perigosas do conteúdo', () => {
        const maliciousMarkdown = 'Seguro.<script>HACKED!</script>';
        const expectedHtml = 'Seguro.';
        
        const newPost = createNewPost('Post Malicioso', maliciousMarkdown, '', marked.parse, DOMPurify.sanitize);

        expect(newPost.contentHtml).toBe(expectedHtml);
    });
});