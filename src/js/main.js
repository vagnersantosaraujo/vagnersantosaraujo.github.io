// js/main.js

// 1. Importa primeiro os estilos das bibliotecas de terceiros
// ==========================================================
// Estilos do CodeMirror (o motor do editor de Markdown)
import 'codemirror/lib/codemirror.css';   // Estilo base ESSENCIAL do CodeMirror
import 'codemirror/theme/darcula.css';     // O TEMA ESCURO 'darcula' que faltava!

// Estilos do Toast UI Editor
import '@toast-ui/editor/dist/toastui-editor.css';         // Estilo base do Toast UI
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';  // Tema escuro do Toast UI (para a barra de ferramentas)


// 2. Importa o nosso CSS principal, que contém nossas customizações
// ==========================================================
import '../css/style.css';


// 3. Importa nossos módulos JavaScript
// ==========================================================
import { loadAllComponents } from './components.js';
import { initializeRouter } from './router.js';
import './auth-manager.js';

// Inicia a aplicação
loadAllComponents();
initializeRouter();