// ============================================
// MAIN.JS — PageTurner Digital Bookstore
// ============================================

// Load books from localStorage if available
function loadBooksFromStorage() {
  try {
    const saved = localStorage.getItem('pageturner_books');
    if (saved) {
      const books = JSON.parse(saved);
      BOOKS.splice(0, BOOKS.length, ...books);
    }
  } catch (e) {
    console.error('Error loading books from storage:', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadBooksFromStorage();
  initTheme();
  initPreloader();
  initNav();
  initBackToTop();
  updateCartCount();
  initScrollAnimations();
  const page = document.body.dataset.page;
  if (page === 'home') initHome();
  else if (page === 'books') initBooksPage();
  else if (page === 'book-details') initBookDetails();
  else if (page === 'about') initAbout();
  else if (page === 'contact') initContact();
});

// ─── PRELOADER ───────────────────────────────
function initPreloader() {
  const loader = document.getElementById('preloader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
    }, 600);
  });
}

// ─── THEME ───────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// ─── NAVIGATION ──────────────────────────────
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const nav = document.getElementById('mainNav');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === 'index.html' && href === '/') || href.includes(path)) {
      link.classList.add('active');
    }
  });
}

// ─── BACK TO TOP ─────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ─── SCROLL ANIMATIONS ────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animate-in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── SEARCH MODAL ────────────────────────────
function openSearch() {
  const modal = document.getElementById('searchModal');
  if (modal) {
    modal.classList.add('open');
    setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
  }
}
function closeSearch() {
  document.getElementById('searchModal')?.classList.remove('open');
}

function initSearchModal() {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;

  document.getElementById('searchModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeSearch();
  });
  document.addEventListener('keydown', e => { 
    if (e.key === 'Escape') {
      closeSearch();
      closeReaderModal();
    }
  });

  input.addEventListener('input', debounce(() => {
    const q = input.value.trim();
    if (q.length < 2) { results.innerHTML = ''; return; }
    const found = searchBooks(q).slice(0, 6);
    if (!found.length) {
      results.innerHTML = '<p class="no-results">No books found</p>';
      return;
    }
    results.innerHTML = found.map(b => `
      <a href="book-details.html?id=${b.id}" class="search-result-item" onclick="closeSearch()">
        <img src="${b.cover}" alt="${b.title}" loading="lazy">
        <div>
          <span class="sr-title">${b.title}</span>
          <span class="sr-author">${b.author}</span>
          <span class="sr-price">${formatPrice(b.price)}</span>
        </div>
        <span class="sr-cat">${b.category}</span>
      </a>
    `).join('');
  }, 250));
}

function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

// ─── BOOK CARD ───────────────────────────────
function createBookCard(book, animDelay = 0) {
  const wishlisted = isWishlisted(book.id);
  return `
    <div class="book-card reveal" style="animation-delay:${animDelay}ms">
      ${book.badge ? `<span class="book-badge">${book.badge}</span>` : ''}
      <button class="wishlist-btn ${wishlisted ? 'active' : ''}" onclick="handleWishlist(${book.id}, this)" aria-label="Add to wishlist">
        <svg viewBox="0 0 24 24" fill="${wishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <div class="book-cover-wrap">
        <a href="book-details.html?id=${book.id}">
          <img src="${book.cover}" alt="${book.title}" loading="lazy" class="book-cover">
        </a>
        <div class="book-overlay">
          <a href="book-details.html?id=${book.id}" class="btn-preview">View Details</a>
        </div>
      </div>
      <div class="book-info">
        <span class="book-cat-tag">${book.category}</span>
        <h3 class="book-title"><a href="book-details.html?id=${book.id}">${book.title}</a></h3>
        <p class="book-author">by ${book.author}</p>
        <div class="book-rating">
          ${renderStars(book.rating)}
          <span class="rating-num">${book.rating}</span>
          <span class="rating-count">(${book.reviews.toLocaleString()})</span>
        </div>
        <div class="book-footer">
          <span class="book-free-badge">📚 Free</span>
          <div class="book-actions">
            <button class="btn-action btn-read" title="Read Online" onclick="handleReadOnline(${book.id})">📖 Read</button>
            <button class="btn-action btn-download" title="Download" onclick="handleDownload(${book.id})">⬇ Download</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function handleWishlist(id, btn) {
  const added = toggleWishlist(id);
  btn.classList.toggle('active', added);
  const svg = btn.querySelector('svg path');
  if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none');
  showToast(added ? '♥ Added to wishlist' : '♡ Removed from wishlist');
}

function handleBuy(id) {
  addToCart(id);
  updateCartCount();
  showToast('🛒 Added to cart!');
}

function handleReadOnline(id) {
  const book = BOOKS.find(b => b.id === id);
  if (!book) return;
  
  if (!book.files || book.files.length === 0) {
    showToast('❌ Reading not available for this book yet');
    return;
  }
  
  // Find PDF file or first available file
  const pdfFile = book.files.find(f => f.name.endsWith('.pdf'));
  const fileToRead = pdfFile || book.files[0];
  
  // Create full screen modal for reading
  let modal = document.getElementById('readerModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'readerModal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;background:#000;display:flex;flex-direction:column;width:100%;height:100vh;overflow:hidden;';
    document.body.appendChild(modal);
  }
  
  const fileData = fileToRead.data;
  const fileName = fileToRead.name;
  
  modal.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:1rem;background:var(--surface);border-bottom:1px solid var(--border);z-index:10000;">
      <h2 style="font-size:1.1rem;margin:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${book.title}</h2>
      <button onclick="closeReaderModal()" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--text3);padding:0.5rem 1rem;">✕</button>
    </div>
    <div style="flex:1;overflow:auto;background:#000;display:flex;align-items:center;justify-content:center;">
      ${fileToRead.name.endsWith('.pdf') 
        ? `<embed src="${fileData}" type="application/pdf" style="width:100%;height:100%;border:none;"/>` 
        : `<div style="text-align:center;color:var(--text2);padding:2rem;background:var(--bg);border-radius:10px;margin:2rem;">
            <p style="font-size:1.1rem;margin-bottom:1rem;">📖 ${book.title}</p>
            <p style="margin-bottom:1.5rem;">by ${book.author}</p>
            <p style="color:var(--text3);margin-bottom:1.5rem;">This file format (${fileName.split('.').pop().toUpperCase()}) is not directly viewable in full screen.</p>
            <button onclick="downloadFile('${book.title}', '${fileData}', '${fileName}')" class="btn btn-primary" style="display:inline-block;">⬇ Download to Read</button>
          </div>`
      }
    </div>
  `;
  
  modal.style.display = 'flex';
  showToast(`📖 Reading: ${book.title}`);
}

function closeReaderModal() {
  const modal = document.getElementById('readerModal');
  if (modal) modal.style.display = 'none';
}

function handleDownload(id) {
  const book = BOOKS.find(b => b.id === id);
  if (!book || !book.files || book.files.length === 0) {
    showToast('❌ No files available for download');
    return;
  }
  
  // If only one file, download it directly
  if (book.files.length === 1) {
    downloadFile(book.title, book.files[0].data, book.files[0].name);
    return;
  }
  
  // Multiple files - show selection modal
  let modal = document.getElementById('downloadModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'downloadModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:3000;background:rgba(10,10,20,0.95);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:1rem;';
    document.body.appendChild(modal);
  }
  
  const options = book.files.map((f, i) => `
    <button onclick="downloadFile('${book.title}', '${f.data}', '${f.name}')" style="width:100%;padding:0.75rem;margin-bottom:0.5rem;border-radius:8px;background:var(--surface2);border:1px solid var(--border);color:var(--text);cursor:pointer;font-weight:600;transition:all 0.2s;">
      📥 Download ${f.name.split('.').pop().toUpperCase()} (${f.name})
    </button>
  `).join('');
  
  modal.innerHTML = `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;max-width:500px;width:100%;padding:2rem;">
      <h2 style="font-size:1.3rem;margin-bottom:0.5rem;">${book.title}</h2>
      <p style="color:var(--text2);margin-bottom:1.5rem;">Select format to download:</p>
      ${options}
      <button onclick="closeDownloadModal()" style="width:100%;padding:0.75rem;margin-top:1rem;border-radius:8px;background:var(--surface2);border:1px solid var(--border);color:var(--text);cursor:pointer;font-weight:600;">Cancel</button>
    </div>
  `;
  
  modal.style.display = 'flex';
}

function downloadFile(bookTitle, fileData, fileName) {
  try {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName || `${bookTitle}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`✅ Downloaded: ${fileName || bookTitle}`);
    closeDownloadModal();
  } catch (e) {
    showToast('❌ Download failed');
  }
}

function closeDownloadModal() {
  const modal = document.getElementById('downloadModal');
  if (modal) modal.style.display = 'none';
}

// ─── TOAST ───────────────────────────────────
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── NEWSLETTER ──────────────────────────────
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value) return;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        showToast('⚠️ Please enter a valid email');
        return;
      }
      showToast('✅ You\'re subscribed! Check your inbox.');
      input.value = '';
    });
  });
}

// ============================================
// HOME PAGE
// ============================================
function initHome() {
  initSearchModal();
  initNewsletter();
  renderFeaturedBooks();
  renderTestimonials();
  initCounters();
  initCategoryCards();
  initHeroParticles();
}

function renderFeaturedBooks() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const books = getFeaturedBooks();
  grid.innerHTML = books.map((b, i) => createBookCard(b, i * 80)).join('');
  initScrollAnimations();
}

function renderTestimonials() {
  const wrap = document.getElementById('testimonialsWrap');
  if (!wrap) return;
  wrap.innerHTML = TESTIMONIALS.map((t, i) => `
    <div class="testimonial-card reveal" style="animation-delay:${i * 100}ms">
      <div class="t-stars">${'★'.repeat(t.rating)}</div>
      <p class="t-text">"${t.text}"</p>
      <div class="t-author">
        <img src="${t.avatar}" alt="${t.name}" loading="lazy">
        <div>
          <span class="t-name">${t.name}</span>
          <span class="t-role">${t.role}</span>
        </div>
      </div>
    </div>
  `).join('');
  initScrollAnimations();
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const decimals = el.dataset.decimals || 0;
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = parseFloat(current.toFixed(decimals)).toLocaleString() + suffix;
      }, 16);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function initCategoryCards() {
  const cards = document.querySelectorAll('.cat-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      window.location.href = `books.html?category=${encodeURIComponent(cat)}`;
    });
  });
}

function initHeroParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = canvas.offsetWidth;
  let H = canvas.height = canvas.offsetHeight;
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.1
  }));
  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,99,255,${p.alpha})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  });
}

// ============================================
// BOOKS PAGE
// ============================================
let currentCategory = 'All';
let currentSort = 'popular';
let currentPage = 1;
const BOOKS_PER_PAGE = 9;
let filteredBooks = [...BOOKS];

function initBooksPage() {
  initSearchModal();
  initNewsletter();
  // Read URL params
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  if (cat && CATEGORIES.includes(cat)) currentCategory = cat;
  const query = params.get('q');

  buildCategoryFilters();
  if (query) {
    const si = document.getElementById('bookSearchInput');
    if (si) si.value = query;
    filteredBooks = searchBooks(query);
  }
  applyFilters();
  renderBooks();

  document.getElementById('bookSearchInput')?.addEventListener('input', debounce(() => {
    const q = document.getElementById('bookSearchInput').value.trim();
    filteredBooks = q ? searchBooks(q) : [...BOOKS];
    currentPage = 1;
    applyFilters();
    renderBooks();
  }, 300));

  document.getElementById('sortSelect')?.addEventListener('change', e => {
    currentSort = e.target.value;
    currentPage = 1;
    applyFilters();
    renderBooks();
  });

  document.getElementById('priceFilter')?.addEventListener('change', () => {
    currentPage = 1;
    applyFilters();
    renderBooks();
  });

  document.getElementById('ratingFilter')?.addEventListener('change', () => {
    currentPage = 1;
    applyFilters();
    renderBooks();
  });
}

function buildCategoryFilters() {
  const wrap = document.getElementById('categoryFilters');
  if (!wrap) return;
  wrap.innerHTML = CATEGORIES.map(cat => `
    <button class="cat-filter-btn ${cat === currentCategory ? 'active' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');
  wrap.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.cat;
      wrap.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPage = 1;
      applyFilters();
      renderBooks();
    });
  });
}

function applyFilters() {
  let books = currentCategory === 'All' ? [...BOOKS] : BOOKS.filter(b => b.category === currentCategory);
  const q = document.getElementById('bookSearchInput')?.value.trim();
  if (q) books = books.filter(b =>
    b.title.toLowerCase().includes(q.toLowerCase()) ||
    b.author.toLowerCase().includes(q.toLowerCase())
  );
  const ratingFilter = document.getElementById('ratingFilter')?.value;
  if (ratingFilter) books = books.filter(b => b.rating >= parseFloat(ratingFilter));

  switch (currentSort) {
    case 'latest': books.sort((a, b) => b.id - a.id); break;
    case 'popular': books.sort((a, b) => b.reviews - a.reviews); break;
    case 'rating': books.sort((a, b) => b.rating - a.rating); break;
  }
  filteredBooks = books;
}

function renderBooks() {
  const grid = document.getElementById('booksGrid');
  const countEl = document.getElementById('booksCount');
  if (!grid) return;
  const start = (currentPage - 1) * BOOKS_PER_PAGE;
  const pageBooks = filteredBooks.slice(start, start + BOOKS_PER_PAGE);
  if (!pageBooks.length) {
    grid.innerHTML = '<div class="no-books">No books found matching your criteria.</div>';
  } else {
    grid.innerHTML = pageBooks.map((b, i) => createBookCard(b, i * 60)).join('');
    initScrollAnimations();
  }
  if (countEl) countEl.textContent = `${filteredBooks.length} books found`;
  renderPagination();
}

function renderPagination() {
  const wrap = document.getElementById('pagination');
  if (!wrap) return;
  const total = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  if (total <= 1) { wrap.innerHTML = ''; return; }
  let html = '';
  html += `<button class="page-btn" onclick="goPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>‹</button>`;
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - currentPage) <= 1) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 2) {
      html += `<span class="page-ellipsis">…</span>`;
    }
  }
  html += `<button class="page-btn" onclick="goPage(${currentPage + 1})" ${currentPage === total ? 'disabled' : ''}>›</button>`;
  wrap.innerHTML = html;
}

function goPage(page) {
  const total = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  if (page < 1 || page > total) return;
  currentPage = page;
  renderBooks();
  document.getElementById('booksGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// BOOK DETAILS PAGE
// ============================================
function initBookDetails() {
  initSearchModal();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const book = getBookById(id);
  if (!book) { document.querySelector('.details-main').innerHTML = '<p>Book not found.</p>'; return; }

  document.title = `${book.title} — PageTurner`;
  document.getElementById('metaDesc')?.setAttribute('content', book.description);

  // Cover & main info
  document.getElementById('detailCover').src = book.cover;
  document.getElementById('detailCover').alt = book.title;
  document.getElementById('detailBadge').textContent = book.badge || '';
  document.getElementById('detailBadge').style.display = book.badge ? 'inline-block' : 'none';
  document.getElementById('detailTitle').textContent = book.title;
  document.getElementById('detailAuthor').textContent = `by ${book.author}`;
  document.getElementById('detailCategory').textContent = book.category;
  document.getElementById('detailRatingStars').innerHTML = renderStars(book.rating);
  document.getElementById('detailRatingNum').textContent = book.rating;
  document.getElementById('detailReviewCount').textContent = `${book.reviews.toLocaleString()} reviews`;
  document.getElementById('detailPrice').textContent = formatPrice(book.price);
  document.getElementById('detailOriginal').textContent = formatPrice(book.originalPrice);
  document.getElementById('detailDesc').textContent = book.description;
  const disc = Math.round((1 - book.price / book.originalPrice) * 100);
  document.getElementById('detailDiscount').textContent = `${disc}% OFF`;
  document.getElementById('detailPages').textContent = book.pages + ' pages';
  document.getElementById('detailFormats').textContent = book.format.join(', ');

  document.getElementById('detailTOC').innerHTML = book.toc.map((t, i) => `
    <div class="toc-item"><span class="toc-num">${String(i + 1).padStart(2, '0')}</span><span>${t}</span></div>
  `).join('');
  document.getElementById('detailLearn').innerHTML = book.learn.map(l => `
    <li><span class="check-icon">✓</span>${l}</li>
  `).join('');

  // Wishlist state
  const wlBtn = document.getElementById('detailWishlistBtn');
  if (wlBtn) {
    wlBtn.classList.toggle('active', isWishlisted(book.id));
    wlBtn.addEventListener('click', () => {
      const added = toggleWishlist(book.id);
      wlBtn.classList.toggle('active', added);
      showToast(added ? '♥ Added to wishlist' : '♡ Removed from wishlist');
    });
  }

  document.getElementById('detailBuyBtn')?.addEventListener('click', () => { handleBuy(book.id); });
  document.getElementById('detailBuyBtnSticky')?.addEventListener('click', () => { handleBuy(book.id); });
  document.getElementById('detailPreviewBtn')?.addEventListener('click', () => openPreviewModal(book));

  // Related
  const relGrid = document.getElementById('relatedGrid');
  if (relGrid) {
    const related = getRelatedBooks(book, 4);
    relGrid.innerHTML = related.map((b, i) => createBookCard(b, i * 80)).join('');
  }

  initScrollAnimations();
}

function openPreviewModal(book) {
  const modal = document.getElementById('previewModal');
  if (!modal) return;
  modal.querySelector('.preview-title').textContent = book.title;
  modal.querySelector('.preview-img').src = book.cover;
  modal.querySelector('.preview-desc').textContent = book.description;
  modal.classList.add('open');
}

function closePreviewModal() {
  document.getElementById('previewModal')?.classList.remove('open');
}

// ============================================
// ABOUT PAGE
// ============================================
function initAbout() {
  initCounters();
  initScrollAnimations();
}

// ============================================
// CONTACT PAGE
// ============================================
function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#cName').value.trim();
    const email = form.querySelector('#cEmail').value.trim();
    const msg = form.querySelector('#cMessage').value.trim();
    if (!name || !email || !msg) { showToast('⚠️ Please fill all required fields'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('⚠️ Invalid email address'); return; }
    showToast('✅ Message sent! We\'ll reply within 24 hours.');
    form.reset();
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
}
