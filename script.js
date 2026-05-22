// script.js - Aureon Collective
// Handles product rendering, cart, search/filter, theme toggle, and form validation

const products = [
  { id: 1, name: 'iPhone 11', brand: 'Apple', category: 'apple', price: 5000, description: 'Classic iPhone 11 - great value', image: 'Images/Iphone11.png' },
  { id: 2, name: 'iPhone 11 Pro', brand: 'Apple', category: 'apple', price: 5300, description: 'iPhone 11 Pro with improved camera', image: 'Images/Iphone11pro.png' },
  { id: 3, name: 'iPhone 11 Close-up', brand: 'Apple', category: 'apple', price: 5000, description: 'Close-up photography example', image: 'Images/Iphone11closeup.png' },
  { id: 4, name: 'iPhone 12', brand: 'Apple', category: 'apple', price: 6000, description: 'iPhone 12 with OLED display', image: 'Images/Iphone12.png' },
  { id: 5, name: 'iPhone 12 Close-up', brand: 'Apple', category: 'apple', price: 6000, description: 'iPhone 12 detail shot', image: 'Images/Iphone12closeup.png' },
  { id: 6, name: 'iPhone 13', brand: 'Apple', category: 'apple', price: 7800, description: 'iPhone 13 - improved performance and camera', image: 'Images/Iphone13.png' },
  { id: 7, name: 'iPhone 13 Pro', brand: 'Apple', category: 'apple', price: 8600, description: 'iPhone 13 Pro with ProMotion display', image: 'Images/13%20pro.webp' },
  { id: 8, name: 'iPhone 14 Base', brand: 'Apple', category: 'apple', price: 8500, description: 'iPhone 14 - latest generation', image: 'Images/14%20base.webp' },
  { id: 9, name: 'iPhone 14 Pro Max', brand: 'Apple', category: 'apple', price: 11100, description: 'iPhone 14 Pro Max - premium flagship', image: 'Images/14%20pro%20max.webp' },
  { id: 10, name: 'iPhone 15', brand: 'Apple', category: 'apple', price: 11200, description: 'iPhone 15 with USB-C', image: 'Images/iphone%2015.webp' },
  { id: 11, name: 'iPhone 15 Pro Max', brand: 'Apple', category: 'apple', price: 14000, description: 'iPhone 15 Pro Max - ultimate flagship', image: 'Images/iphone%2015%20pro%20max.png' },
  { id: 12, name: 'iPhone 16 Base', brand: 'Apple', category: 'apple', price: 13500, description: 'iPhone 16 - cutting edge technology', image: 'Images/iphone%2016%20base.webp' },
  { id: 13, name: 'iPhone 16 Pro Max', brand: 'Apple', category: 'apple', price: 16500, description: 'iPhone 16 Pro Max - next generation', image: 'Images/iphone%2016%20pro%20max.png' },
  { id: 14, name: 'Galaxy S21 Ultra', brand: 'Samsung', category: 'samsung', price: 7400, description: 'Samsung Galaxy S21 Ultra - flagship power', image: 'Images/galaxy%20s21%20ultra.webp' },
  { id: 15, name: 'Galaxy S21 Close-up', brand: 'Samsung', category: 'samsung', price: 5700, description: 'Galaxy S21 detailed view', image: 'Images/galaxy%20S21%20closeup.webp' },
  { id: 16, name: 'Galaxy S22', brand: 'Samsung', category: 'samsung', price: 6800, description: 'Samsung Galaxy S22', image: 'Images/galaxy%20s22.webp' },
  { id: 17, name: 'Galaxy S22 Ultra', brand: 'Samsung', category: 'samsung', price: 8500, description: 'Samsung Galaxy S22 Ultra - premium device', image: 'Images/S22%20ultra.webp' },
  { id: 18, name: 'Galaxy S23', brand: 'Samsung', category: 'samsung', price: 9000, description: 'Samsung Galaxy S23 - latest power', image: 'Images/S23.webp' },
  { id: 19, name: 'Galaxy S23 Ultra', brand: 'Samsung', category: 'samsung', price: 10200, description: 'Samsung Galaxy S23 Ultra - flagship performance', image: 'Images/S23%20ultra.webp' },
  { id: 20, name: 'Galaxy S24', brand: 'Samsung', category: 'samsung', price: 11000, description: 'Samsung Galaxy S24 with AI features', image: 'Images/galaxy%20s24.webp' },
  { id: 21, name: 'Galaxy S24 Ultra', brand: 'Samsung', category: 'samsung', price: 11000, description: 'Galaxy S24 standard edition', image: 'Images/galaxy%20S24%20base.jpg' },
  { id: 22, name: 'Galaxy Z Flip 5', brand: 'Samsung', category: 'samsung', price: 9800, description: 'Samsung Galaxy Z Flip 5 - foldable innovation', image: 'Images/flip%205.webp' },
  { id: 23, name: 'Galaxy Z Flip 6', brand: 'Samsung', category: 'samsung', price: 10300, description: 'Samsung Galaxy Z Flip 6 - latest foldable', image: 'Images/flip%206.webp' }
];

let cart = JSON.parse(localStorage.getItem('aureon_cart') || '[]');
let currentFilter = 'all';

function qs(selector) { return document.querySelector(selector); }
function qsa(selector) { return Array.from(document.querySelectorAll(selector)); }

function displayProducts(list = products) {
  const grid = qs('#productsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = '<div class="col-12 text-center text-muted py-5">No phones found. Try another search or filter.</div>';
    return;
  }

  list.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3';

    const card = document.createElement('article');
    card.className = 'product-card card h-100 shadow-sm';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="card-img-top" loading="lazy" style="height:220px;object-fit:cover;">
      <div class="card-body d-flex flex-column">
        <span class="badge bg-secondary mb-2 text-uppercase">${p.brand}</span>
        <h3 class="card-title h5">${p.name}</h3>
        <p class="card-text text-muted mb-3 small">${p.description}</p>
        <div class="mb-3 product-price fw-bold">P${p.price.toLocaleString()}</div>
        <div class="d-grid mt-auto">
          <button class="btn btn-primary add-to-cart-btn" data-id="${p.id}">Add to Cart</button>
        </div>
      </div>
    `;

    col.appendChild(card);
    grid.appendChild(col);
  });

  qsa('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(Number(btn.dataset.id)));
  });
}

function filterProducts(category) {
  currentFilter = category;
  qsa('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === category));
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);
  displayProducts(filtered);
}

function searchPhones() {
  const q = (qs('#searchInput')?.value || '').toLowerCase().trim();
  const filtered = products.filter(p => (
    p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
  ));
  displayProducts(filtered);
}

function addToCart(productId) {
  const item = cart.find(c => c.id === productId);
  if (item) item.qty += 1;
  else cart.push({ id: productId, qty: 1 });
  localStorage.setItem('aureon_cart', JSON.stringify(cart));
  updateCartCount();
  alert('Added to cart');
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  const el = qs('#cartCount') || qs('.cart-count');
  if (el) el.textContent = count;
}

function loadTheme() {
  const theme = localStorage.getItem('aureon_theme');
  if (theme === 'dark') document.body.classList.add('dark-mode');
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('aureon_theme', isDark ? 'dark' : 'light');
}

function setupContactForm() {
  const form = qs('#contactForm');
  if (!form) return;
  const successMessage = qs('#successMessage');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;
    const fullName = qs('#fullName').value.trim();
    const email = qs('#email').value.trim();
    const phone = qs('#phone').value.trim();
    const subject = qs('#subject').value;
    const message = qs('#message').value.trim();

    if (fullName.length < 2) { qs('#nameError').textContent = 'Enter a valid name'; valid = false; } else qs('#nameError').textContent = '';
    if (!email.includes('@') || email.length < 5) { qs('#emailError').textContent = 'Enter a valid email'; valid = false; } else qs('#emailError').textContent = '';
    if (phone.replace(/\D/g, '').length < 7) { qs('#phoneError').textContent = 'Enter a valid phone'; valid = false; } else qs('#phoneError').textContent = '';
    if (!subject) { qs('#subjectError').textContent = 'Select a subject'; valid = false; } else qs('#subjectError').textContent = '';
    if (message.length < 10) { qs('#messageError').textContent = 'Message too short'; valid = false; } else qs('#messageError').textContent = '';

    if (!valid) return;
    successMessage.textContent = 'Thank you - your message was sent.';
    successMessage.classList.remove('d-none');
    form.reset();
  });
}

function setupRequestForm() {
  const form = qs('#requestForm');
  if (!form) return;

  const fileInput = qs('#reqImage');
  const previewWrap = qs('#imagePreview');
  const previewImg = qs('#previewImg');
  const typeEl = qs('#reqType');
  const shoeWrap = qs('#shoeSizeWrap');
  const shoeInput = qs('#reqShoeSize');
  const successMessage = qs('#requestSuccessMessage');

  function hidePreview() {
    if (!previewWrap || !previewImg || !fileInput) return;
    previewWrap.classList.add('d-none');
    previewImg.src = '';
    fileInput.value = '';
  }

  window.removeImage = function () {
    hidePreview();
  };

  fileInput?.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return hidePreview();
    if (!file.type.startsWith('image/')) {
      qs('#imageReqError').textContent = 'Only image files are allowed.';
      hidePreview();
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      qs('#imageReqError').textContent = 'File too large (max 5MB).';
      hidePreview();
      return;
    }
    qs('#imageReqError').textContent = '';
    const reader = new FileReader();
    reader.onload = function (e) {
      if (previewImg) previewImg.src = e.target.result;
      if (previewWrap) previewWrap.classList.remove('d-none');
    };
    reader.readAsDataURL(file);
  });

  // Show shoe size input only when 'shoes' is selected
  typeEl?.addEventListener('change', () => {
    if (!shoeWrap || !shoeInput) return;
    if (typeEl.value === 'shoes') {
      shoeWrap.classList.remove('d-none');
    } else {
      shoeWrap.classList.add('d-none');
      shoeInput.value = '';
      qs('#shoeSizeError').textContent = '';
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;
    const name = qs('#reqName').value.trim();
    const email = qs('#reqEmail').value.trim();
    const phone = qs('#reqPhone').value.trim();
    const brand = qs('#reqBrand').value.trim();
    const model = qs('#reqModel').value.trim();
    const type = qs('#reqType')?.value || 'device';
    const shoeSize = qs('#reqShoeSize')?.value.trim() || '';

    if (name.length < 2) { qs('#nameReqError').textContent = 'Enter a valid name'; valid = false; } else qs('#nameReqError').textContent = '';
    if (!email.includes('@')) { qs('#emailReqError').textContent = 'Enter a valid email'; valid = false; } else qs('#emailReqError').textContent = '';
    if (phone.replace(/\D/g, '').length < 7) { qs('#phoneReqError').textContent = 'Enter a valid phone'; valid = false; } else qs('#phoneReqError').textContent = '';
    if (!brand) { qs('#brandReqError').textContent = 'Enter a brand'; valid = false; } else qs('#brandReqError').textContent = '';
    if (!model) { qs('#modelReqError').textContent = 'Enter a model'; valid = false; } else qs('#modelReqError').textContent = '';
    if (type === 'shoes') {
      if (!shoeSize || isNaN(Number(shoeSize)) || Number(shoeSize) <= 0) {
        qs('#shoeSizeError').textContent = 'Enter a valid shoe size'; valid = false;
      } else qs('#shoeSizeError').textContent = '';
    }

    if (!valid) return;
    successMessage.textContent = `Request submitted - we will contact you soon. (${type}${type==='shoes' && shoeSize ? ', size '+shoeSize : ''})`;
    successMessage.classList.remove('d-none');
    form.reset();
    hidePreview();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  updateCartCount();

  if (qs('#productsGrid')) {
    displayProducts();
    qsa('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => filterProducts(btn.dataset.filter || 'all'));
    });
    qs('#searchButton')?.addEventListener('click', (e) => { e.preventDefault(); searchPhones(); });
    qsa('.search-btn').forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); searchPhones(); }));
    qs('#searchInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); searchPhones(); }
    });
  }

  qsa('#themeToggle, .theme-toggle, #themeToggleSmall').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  setupContactForm();
  setupRequestForm();
});
