import '../css/style.css';
import { loadAllComponents } from './components.js';
import { initializeRouter } from './router.js';
import './auth-manager.js';

// Inicia nossas funcionalidades
loadAllComponents();
initializeRouter();