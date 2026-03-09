// auth-check.js - Protezione con overlay di caricamento

(function() {
  'use strict';
  
  // Se siamo sulla pagina di login, NON eseguire controlli
  if (window.location.pathname.includes('login.html')) {
    return;
  }
  
  // Crea un overlay che copre tutta la pagina
  const overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = '#FAF9F6'; // colore di sfondo come il tuo sito
  overlay.style.zIndex = '999999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.fontFamily = "'EB Garamond', serif";
  overlay.style.fontSize = '24px';
  overlay.style.color = '#D4AF37';
  overlay.innerHTML = 'Caricamento...'; // messaggio opzionale
  
  // Aggiungi l'overlay alla pagina
  document.body.appendChild(overlay);
  
  // Funzione per rimuovere l'overlay
  function removeOverlay() {
    const existingOverlay = document.getElementById('auth-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }
  }
  
  // Controlla se l'utente è autenticato
  function checkAuth() {
    let authenticated = false;
    
    // Controlla la sessione corrente
    if (sessionStorage.getItem('weddingSession') === 'authenticated') {
      authenticated = true;
    }
    
    // Controlla il localStorage (ricorda per 7 giorni)
    const authData = localStorage.getItem('weddingAuth');
    if (authData) {
      try {
        const data = JSON.parse(authData);
        if (data.expires > Date.now()) {
          // Token valido! Crea la sessione per questa visita
          sessionStorage.setItem('weddingSession', 'authenticated');
          authenticated = true;
        } else {
          // Token scaduto, rimuovilo
          localStorage.removeItem('weddingAuth');
        }
      } catch (e) {
        localStorage.removeItem('weddingAuth');
      }
    }
    
    if (authenticated) {
      // Utente autenticato: rimuovi l'overlay
      removeOverlay();
    } else {
      // Non autenticato: reindirizza alla login
      window.location.href = 'login.html';
    }
  }
  
  // Esegui il controllo dopo un brevissimo ritardo (per dare il tempo all'overlay di apparire)
  setTimeout(checkAuth, 50);
  
})();
