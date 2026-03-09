// auth-check.js - Sistema di protezione semplice e efficace

(function() {
  'use strict';
  
  // Se siamo sulla pagina di login, NON eseguire controlli
  if (window.location.pathname.includes('login.html')) {
    return; // Esci, lascia che l'utente si logghi
  }
  
  // Controlla se l'utente è autenticato
  function checkAuth() {
    // 1. Prima controlla la sessione corrente (dura fino a chiusura browser)
    if (sessionStorage.getItem('weddingSession') === 'authenticated') {
      return true;
    }
    
    // 2. Controlla il localStorage (ricorda per 7 giorni)
    const authData = localStorage.getItem('weddingAuth');
    if (authData) {
      try {
        const data = JSON.parse(authData);
        if (data.expires > Date.now()) {
          // Token valido! Crea la sessione per questa visita
          sessionStorage.setItem('weddingSession', 'authenticated');
          return true;
        } else {
          // Token scaduto, rimuovilo
          localStorage.removeItem('weddingAuth');
        }
      } catch (e) {
        // Dati corrotti, rimuovili
        localStorage.removeItem('weddingAuth');
      }
    }
    
    // 3. NON autenticato: reindirizza alla login
    console.log('🔒 Accesso non autorizzato, reindirizzo a login.html');
    window.location.href = 'login.html';
    return false;
  }
  
  // Esegui il controllo quando la pagina carica
  document.addEventListener('DOMContentLoaded', function() {
    // Piccolo delay per evitare flash
    setTimeout(checkAuth, 100);
  });
  
})();