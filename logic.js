function createNewPost(title, markdownContent, featuredImage, markdownParser, sanitizer) {
    const id = Date.now();
    const date = new Date().toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    const dirtyHtml = markdownParser(markdownContent);
    const cleanHtml = sanitizer(dirtyHtml);

    return {
        id,
        title,
        date,
        author: 'Vagner',
        contentMarkdown: markdownContent,
        contentHtml: cleanHtml,
        featuredImage: featuredImage || ''
    };
}

function deletePost(postsArray, postIdToDelete) {
    const postIndex = postsArray.findIndex(post => post.id === postIdToDelete);

    if (postIndex === -1) {
        return postsArray;
    }
    
    const newPostsArray = [...postsArray];
    newPostsArray.splice(postIndex, 1);

    return newPostsArray;
}

function updatePost(postsArray, postId, newTitle, newMarkdown, newFeaturedImage, markdownParser, sanitizer) {
    const newPostsArray = [...postsArray];
    const postToUpdate = newPostsArray.find(post => post.id === postId);

    if (postToUpdate) {
        postToUpdate.title = newTitle;
        postToUpdate.contentMarkdown = newMarkdown;
        postToUpdate.featuredImage = typeof newFeaturedImage !== 'undefined' ? newFeaturedImage : postToUpdate.featuredImage;
        
        const dirtyHtml = markdownParser(newMarkdown);
        postToUpdate.contentHtml = sanitizer(dirtyHtml);
    }

    return newPostsArray;
}

// Exportação Condicional para os testes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createNewPost, deletePost, updatePost };
}