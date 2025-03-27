document.addEventListener("DOMContentLoaded", () => {
  // --- ELEMENTI DOM ---
  const sidebar = document.getElementById("sidebar");
  // Rimuovi la vecchia referenza al toggle se esiste
  // const sidebarToggle = document.getElementById('sidebar-toggle');
  const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");
  const contentArea = document.getElementById("content-area");
  const pageTitle = document.getElementById("page-title");
  const loadingIndicator = document.getElementById("loading-indicator");
  const userGreeting = document.getElementById("user-greeting");
  const adminOnlyElements = document.querySelectorAll(".admin-only");
  const roleButtons = document.querySelectorAll(".role-btn");
  const logoutButton = document.getElementById("logout-btn");
  const mainWrapper = document.querySelector(".main-wrapper"); // Aggiunto
  const navbar = document.querySelector(".navbar"); // Aggiunto
  const body = document.body; // Aggiunto

  // Modal elements
  const addProductModal = document.getElementById("add-product-modal");
  const closeModalButton = addProductModal.querySelector(".modal-close-btn");
  const addProductForm = document.getElementById("add-product-form");

  // Bottone Toggle Mobile (da creare in HTML se non esiste)
  // Aggiungi questo bottone all'inizio di .navbar-left in index.html
  /*
    <div class="navbar-left">
        <button id="sidebar-toggle-mobile" class="sidebar-toggle-btn-mobile">
            <i class="fas fa-bars"></i>
        </button>
        <span id="page-title" class="navbar-page-title">Dashboard</span>
    </div>
    */
  const sidebarToggleMobile = document.getElementById("sidebar-toggle-mobile");
  // Aggiungi anche il toggle originale per desktop
  const sidebarToggleDesktop = document.getElementById("sidebar-toggle");

  // --- STATO APPLICAZIONE ---
  let currentUserRole = "user";
  let isSidebarCollapsed = window.innerWidth < 769; // Collassata di default su mobile
  let isSidebarOpenMobile = false; // Stato specifico per overlay mobile
  let currentPage = "dashboard";

  // --- FUNZIONI ---

  // Funzione per aggiornare lo stato della sidebar (Desktop)
  const updateSidebarDesktopState = () => {
    sidebar.classList.toggle("collapsed", isSidebarCollapsed);
    mainWrapper.style.marginLeft = isSidebarCollapsed
      ? "var(--sidebar-width-collapsed)"
      : "var(--sidebar-width)";
    navbar.style.left = isSidebarCollapsed
      ? "var(--sidebar-width-collapsed)"
      : "var(--sidebar-width)";
    // Potresti salvare in localStorage
    // localStorage.setItem('sidebarCollapsed', isSidebarCollapsed);
  };

  // Funzione per aprire/chiudere la sidebar (Mobile Overlay)
  const toggleSidebarMobile = (forceOpen = null) => {
    isSidebarOpenMobile = forceOpen !== null ? forceOpen : !isSidebarOpenMobile;
    sidebar.classList.toggle("open", isSidebarOpenMobile);
    // Aggiungere un overlay scuro dietro la sidebar quando aperta su mobile? (Opzionale)
    // if (isSidebarOpenMobile) addOverlay(); else removeOverlay();
    if (sidebarToggleMobile) {
      sidebarToggleMobile.querySelector("i").className = isSidebarOpenMobile
        ? "fas fa-times"
        : "fas fa-bars";
    }
  };

  // Mostra/Nasconde Indicatore di Caricamento (Nessuna modifica qui)
  const showLoading = (show = true) => {
    loadingIndicator.classList.toggle("hidden", !show);
    // Rimuove vecchio contenuto solo se stiamo mostrando il loader
    if (show) {
      const existingContent = contentArea.querySelector(".page-content");
      if (existingContent) existingContent.remove();
    }
  };

  // Simula il caricamento e visualizzazione del contenuto di una pagina
  const loadPageContent = (pageId) => {
    currentPage = pageId;
    showLoading(true);

    // Aggiorna titolo navbar (solo il testo, non ricrearlo)
    const titleElement = document.getElementById("page-title");
    if (titleElement) {
      titleElement.textContent =
        pageId.charAt(0).toUpperCase() + pageId.slice(1);
    }

    // Simula un ritardo API (es. 400ms per dare tempo alle animazioni)
    setTimeout(() => {
      let contentHTML = "";
      // --- CONTENUTO DINAMICO (Come prima, ma inserito in .page-content) ---
      // (Il codice switch rimane lo stesso di prima, assicurati che ogni
      //  blocco di HTML inizi con <div class="page-content"> e finisca con </div>)
      switch (pageId) {
        case "dashboard":
          contentHTML = `
                        <div class="page-content">
                            <h1>Dashboard</h1>
                            <div class="dashboard-cards">
                                <div class="card"><h3>Prodotti Totali</h3><p>1,380</p></div>
                                <div class="card accent-border"><h3>Ordini Pendenti</h3><p>45</p></div>
                                <div class="card"><h3>Valore Inventario</h3><p>€ 182,500</p></div>
                                <div class="card"><h3>Visite Oggi</h3><p>890</p></div>
                            </div>
                            <p>Benvenuto nel tuo coloratissimo pannello di controllo!</p>
                             <button class="action-button btn-primary"><i class="fas fa-rocket"></i> Azione Figa</button>
                        </div>`;
          break;
        case "products":
          contentHTML = `
                         <div class="page-content">
                             <h1><i class="fas fa-box-open" style="color: var(--secondary-color); margin-right: 10px;"></i> Elenco Prodotti</h1>
                             <button id="open-add-product-modal" class="action-button accent"><i class="fas fa-plus-circle"></i> Aggiungi Prodotto</button>
                             <table class="data-table">
                                 <thead>
                                     <tr><th>SKU</th><th>Nome</th><th>Quantità</th><th>Prezzo</th><th>Stato</th><th>Azioni</th></tr>
                                 </thead>
                                 <tbody>
                                     <tr><td>SKU001</td><td>Unicorn Plushie</td><td>150</td><td>€19.99</td><td><span style="color: var(--success-color); font-weight: 600;">Disponibile</span></td><td class="table-actions"><button class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button> <button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td></tr>
                                     <tr><td>SKU002</td><td>Rainbow Keyboard</td><td>75</td><td>€79.00</td><td><span style="color: var(--success-color); font-weight: 600;">Disponibile</span></td><td class="table-actions"><button class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button> <button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td></tr>
                                     <tr><td>SKU003</td><td>Gamer Juice (Mango)</td><td>30</td><td>€3.50</td><td><span style="color: var(--warning-color); font-weight: 600;">Poche scorte</span></td><td class="table-actions"><button class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button> <button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td></tr>
                                     <!-- Altri dati fittizi... -->
                                 </tbody>
                             </table>
                         </div>`;
          break;
        // ... (Aggiungi gli altri casi come prima, racchiudendo in <div class="page-content">)
        case "orders":
          contentHTML = `<div class="page-content"><h1>Gestione Ordini</h1><p>Qui vedrai gli ordini volare!</p></div>`;
          break;
        case "inventory":
          contentHTML = `<div class="page-content"><h1>Inventario Magico</h1><p>Controlla le tue scorte scintillanti.</p></div>`;
          break;
        case "users":
          contentHTML = `<div class="page-content"><h1>${
            currentUserRole === "admin"
              ? "Gestione Utenti 🦄"
              : "Accesso Negato"
          }</h1><p>${
            currentUserRole === "admin"
              ? "Amministra i tuoi aiutanti."
              : "Solo gli unicorni admin possono entrare!"
          }</p></div>`;
          break;
        case "settings":
          contentHTML = `<div class="page-content"><h1>${
            currentUserRole === "admin"
              ? "Impostazioni Cosmiche ✨"
              : "Accesso Negato"
          }</h1><p>${
            currentUserRole === "admin"
              ? "Regola le leve dell'universo (del magazzino)."
              : "Area riservata ai maghi admin."
          }</p></div>`;
          break;
        case "profile":
          contentHTML = `<div class="page-content"><h1>Il Mio Profilo Scintillante</h1><p>Modifica le tue info super segrete.</p></div>`;
          break;
        default:
          contentHTML = `<div class="page-content"><h1>Oops! 🌌</h1><p>Pagina persa nello spazio-tempo.</p></div>`;
      }

      showLoading(false);
      // Inserisci il nuovo contenuto (non usare innerHTML per l'intera contentArea se vuoi animazioni)
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = contentHTML.trim();
      const newPageContent = tempDiv.firstChild; // Prendi il div.page-content creato

      // Rimuovi il vecchio .page-content se esiste
      const oldPageContent = contentArea.querySelector(".page-content");
      if (oldPageContent) {
        oldPageContent.remove();
      }

      if (newPageContent) {
        contentArea.appendChild(newPageContent);
        // Ri-aggancia listener per elementi dinamici
        attachDynamicEventListeners();
      } else {
        console.error("Errore: Impossibile creare il contenuto della pagina.");
        contentArea.innerHTML = `<div class="page-content"><h1>Errore</h1><p>Impossibile caricare il contenuto.</p></div>`; // Fallback
      }
    }, 400); // Fine setTimeout
  };

  // Aggiorna UI per Ruolo (Nessuna modifica sostanziale qui, ma controlla display)
  const updateUIForRole = () => {
    userGreeting.textContent = `Ciao, ${
      currentUserRole === "admin" ? "Admin Supremo" : "Esploratore"
    }!`; // Testo più simpatico

    adminOnlyElements.forEach((el) => {
      // Usa lo stile CSS per nascondere/mostrare invece di display: none/block diretto
      // se vuoi animazioni CSS sulla visibilità (ma è più complesso)
      // Per semplicità, continuiamo con display:
      const displayStyle = el.tagName === "LI" ? "list-item" : "block"; // Adatta display
      el.style.display = currentUserRole === "admin" ? displayStyle : "none";
    });

    roleButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.role === currentUserRole
      );
    });

    const currentLinkData = document.querySelector(
      `.nav-link[data-page="${currentPage}"]`
    );
    if (
      currentUserRole !== "admin" &&
      currentLinkData &&
      currentLinkData.closest("li").classList.contains("admin-only")
    ) {
      navigateTo("dashboard");
    } else if (contentArea.querySelector(".page-content")) {
      // Ricarica solo se c'è già contenuto
      // Ricarica contenuto se i permessi potrebbero essere cambiati
      loadPageContent(currentPage);
    }
  };

  // Navigazione (Chiude sidebar mobile dopo click)
  const navigateTo = (pageId) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.page === pageId);
    });
    loadPageContent(pageId);

    // Chiudi la sidebar mobile dopo aver cliccato un link
    if (window.innerWidth < 769 && isSidebarOpenMobile) {
      toggleSidebarMobile(false);
    }
  };

  // Gestione Modal (Nessuna modifica sostanziale qui)
  const openModal = (modalElement) => {
    /* ... come prima ... */
  };
  const closeModal = (modalElement) => {
    /* ... come prima ... */
  };
  // Aggiungi la gestione del click fuori come prima
  const setupModalClosing = (modalElement) => {
    if (modalElement) {
      // Chiudi con bottone X
      const closeBtn = modalElement.querySelector(".modal-close-btn");
      if (closeBtn) closeBtn.onclick = () => closeModal(modalElement);

      // Chiudi cliccando fuori
      window.addEventListener("click", (event) => {
        if (event.target == modalElement) {
          closeModal(modalElement);
        }
      });
      // Chiudi con tasto Esc (Opzionale)
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modalElement.style.display === "block") {
          closeModal(modalElement);
        }
      });
    }
  };

  // Aggancia eventi dinamici (Nessuna modifica qui)
  const attachDynamicEventListeners = () => {
    const openModalButton = document.getElementById("open-add-product-modal");
    if (openModalButton) {
      // Rimuovi vecchio listener per sicurezza
      openModalButton.onclick = null;
      openModalButton.onclick = () => openModal(addProductModal);
    }
    // Aggiungi listener per animazione click a tutti i bottoni nella pagina caricata
    const actionButtons = contentArea.querySelectorAll(".action-button, .btn");
    actionButtons.forEach((btn) => {
      // Rimuovi vecchi listener per evitare duplicati
      btn.onmousedown = null;
      btn.onanimationend = null;
      // Aggiungi nuovi listener
      btn.onmousedown = () => {
        btn.classList.add("is-clicking");
      };
      btn.onanimationend = () => {
        btn.classList.remove("is-clicking");
      };
    });
  };

  // --- EVENT LISTENERS ---

  // Toggle Sidebar (Gestione separata Desktop/Mobile)
  if (sidebarToggleDesktop) {
    // Toggle per Desktop
    sidebarToggleDesktop.addEventListener("click", () => {
      if (window.innerWidth >= 769) {
        // Agisce solo su desktop
        isSidebarCollapsed = !isSidebarCollapsed;
        updateSidebarDesktopState();
      }
    });
  }
  if (sidebarToggleMobile) {
    // Toggle per Mobile
    sidebarToggleMobile.addEventListener("click", () => {
      if (window.innerWidth < 769) {
        // Agisce solo su mobile
        toggleSidebarMobile();
      }
    });
  }

  // Chiudi sidebar mobile se si clicca fuori da essa (sul main-wrapper)
  mainWrapper.addEventListener("click", () => {
    if (window.innerWidth < 769 && isSidebarOpenMobile) {
      toggleSidebarMobile(false);
    }
  });

  // Gestione resize finestra per switchare modalità sidebar
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 769) {
      // Siamo su Desktop
      if (isSidebarOpenMobile) {
        // Se la sidebar mobile era aperta, chiudila
        toggleSidebarMobile(false);
      }
      // Ripristina lo stato desktop (collassato o no)
      updateSidebarDesktopState();
      sidebar.style.transform = "translateX(0)"; // Assicurati sia visibile
    } else {
      // Siamo su Mobile
      sidebar.classList.add("collapsed"); // Assicura che sia stretta se non aperta
      mainWrapper.style.marginLeft = "0"; // No margin su mobile
      navbar.style.left = "0"; // Navbar full width
      if (!isSidebarOpenMobile) {
        sidebar.style.transform = "translateX(-100%)"; // Nascondila se non è 'open'
      }
    }
  });

  // Navigazione Sidebar (Invariato, ma chiama la nuova navigateTo)
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.dataset.page;
      if (pageId === currentPage && contentArea.querySelector(".page-content"))
        return; // Evita ricarica inutile
      const isAdminPage = link.closest("li").classList.contains("admin-only");
      if (isAdminPage && currentUserRole !== "admin") {
        console.warn("Accesso negato!");
        // Magari mostra un toast/notifica carina
        return;
      }
      navigateTo(pageId);
    });
  });

  // Switch Ruolo Utente (Invariato)
  roleButtons.forEach((button) => {
    /* ... come prima ... */
  });

  // Logout (Invariato)
  if (logoutButton) {
    /* ... come prima ... */
  }

  // Gestione Modal Add Product (Setup iniziale)
  setupModalClosing(addProductModal); // Setup chiusura (X, fuori, Esc)
  if (addProductForm) {
    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Form Inviato (Simulazione)");
      const formData = new FormData(addProductForm);
      const productData = Object.fromEntries(formData.entries());
      console.log("Dati Prodotto:", productData);
      // --- QUI Chiamata API POST ---
      alert(`Prodotto "${productData["product-name"]}" salvato (simulazione)!`);
      closeModal(addProductModal);
      addProductForm.reset();
      if (currentPage === "products") loadPageContent("products"); // Ricarica tabella
    });
  }

  // --- INIZIALIZZAZIONE ---

  // Stato iniziale Sidebar in base alla larghezza
  if (window.innerWidth >= 769) {
    // Leggi da localStorage se vuoi persistenza
    // isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    updateSidebarDesktopState();
  } else {
    isSidebarCollapsed = true; // Forzatamente collassata logica
    sidebar.classList.add("collapsed");
    sidebar.style.transform = "translateX(-100%)"; // Nascosta
    mainWrapper.style.marginLeft = "0";
    navbar.style.left = "0";
  }

  updateUIForRole(); // Imposta UI per ruolo
  loadPageContent(currentPage); // Carica Dashboard
}); // Fine DOMContentLoaded
