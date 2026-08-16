const products = [
  {
    id: 'p1',
    name: 'Delineador Asa de Morango',
    category: 'olhos',
    price: 49.9,
    emoji: '✏️',
    desc: 'Delineador líquido preto intenso para asas dramáticas e precisas.',
    badge: 'Best Seller',
  },
  {
    id: 'p2',
    name: 'Máscara Cílios Doces Sonhos',
    category: 'olhos',
    price: 59.9,
    emoji: '👁️',
    desc: 'Volume extremo e cílios alongados com fórmula à prova d\'água.',
    badge: null,
  },
  {
    id: 'p3',
    name: 'Paleta Olhar Kawaii',
    category: 'olhos',
    price: 89.9,
    emoji: '🎨',
    desc: '12 tons rosados e neutros para looks do dia e da noite.',
    badge: 'Novo',
  },
  {
    id: 'p4',
    name: 'Batom Vermelho Morango',
    category: 'labios',
    price: 54.9,
    emoji: '💋',
    desc: 'Vermelho clássico matte com acabamento aveludado de longa duração.',
    badge: 'Best Seller',
  },
  {
    id: 'p5',
    name: 'Gloss Brilho Doces Sonhos',
    category: 'labios',
    price: 39.9,
    emoji: '✨',
    desc: 'Brilho intenso com fragrância suave de morango.',
    badge: null,
  },
  {
    id: 'p6',
    name: 'Lápis Contorno Lábios',
    category: 'labios',
    price: 34.9,
    emoji: '🖊️',
    desc: 'Contorno preciso em tom vermelho morango para lábios definidos.',
    badge: null,
  },
  {
    id: 'p7',
    name: 'Base Pele de Porcelana',
    category: 'pele',
    price: 79.9,
    emoji: '🧴',
    desc: 'Cobertura média-alta com acabamento natural e luminoso.',
    badge: null,
  },
  {
    id: 'p8',
    name: 'Blush Rosé Kawaii',
    category: 'pele',
    price: 44.9,
    emoji: '🌸',
    desc: 'Blush rosado suave para bochechas coradas estilo doll.',
    badge: 'Novo',
  },
  {
    id: 'p9',
    name: 'Iluminador Morango Glow',
    category: 'pele',
    price: 64.9,
    emoji: '💫',
    desc: 'Glow rosado com partículas de brilho para pele radiante.',
    badge: null,
  },
];

const accessories = [
  {
    id: 'a1',
    name: 'Cinto Coração Dourado',
    category: 'acessorios',
    price: 69.9,
    emoji: '💛',
    desc: 'Cinto preto com fivela coração dourada e pingente morango.',
    badge: 'Exclusivo',
  },
  {
    id: 'a2',
    name: 'Brincos Morango',
    category: 'acessorios',
    price: 39.9,
    emoji: '🍓',
    desc: 'Brincos em formato de morango com acabamento brilhante.',
    badge: null,
  },
  {
    id: 'a3',
    name: 'Colar M Initial',
    category: 'acessorios',
    price: 49.9,
    emoji: '📿',
    desc: 'Colar dourado com pingente "M" estilo Morangópolis.',
    badge: null,
  },
  {
    id: 'a4',
    name: 'Tênis Heart High-Top',
    category: 'acessorios',
    price: 199.9,
    emoji: '👟',
    desc: 'Tênis preto cano alto com detalhes coração rosa.',
    badge: 'Novo',
  },
  {
    id: 'a5',
    name: 'Necessaire Doces Sonhos',
    category: 'acessorios',
    price: 59.9,
    emoji: '👜',
    desc: 'Necessaire rosa com estampa morango para suas makes.',
    badge: null,
  },
  {
    id: 'a6',
    name: 'Presilha Morango Glitter',
    category: 'acessorios',
    price: 29.9,
    emoji: '🎀',
    desc: 'Presilha decorativa com glitter e moranguinho.',
    badge: null,
  },
];

const coupons = {
  MORANGO10: { type: 'percent', value: 10 },
  DOCES20: { type: 'percent', value: 20 },
  FRETEGRATIS: { type: 'fixed', value: 15 },
};

let cart = [];
let appliedCoupon = null;

const productGrid = document.getElementById('productGrid');
const accessoryGrid = document.getElementById('accessoryGrid');
const cartDrawer = document.getElementById('cartDrawer');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const subtotalEl = document.getElementById('subtotal');
const discountEl = document.getElementById('discount');
const discountRow = document.getElementById('discountRow');
const totalEl = document.getElementById('total');
const couponInput = document.getElementById('couponInput');
const couponMessage = document.getElementById('couponMessage');
const toast = document.getElementById('toast');

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

function createProductCard(item) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.category = item.category;
  card.innerHTML = `
    <div class="product-image">
      ${item.badge ? `<span class="product-badge">${item.badge}</span>` : ''}
      <span>${item.emoji}</span>
    </div>
    <div class="product-info">
      <span class="product-category">${getCategoryLabel(item.category)}</span>
      <h3>${item.name}</h3>
      <p class="product-desc">${item.desc}</p>
      <div class="product-footer">
        <span class="product-price">${formatPrice(item.price)}</span>
        <button class="btn-add" data-id="${item.id}">Adicionar 🍓</button>
      </div>
    </div>
  `;
  return card;
}

function getCategoryLabel(cat) {
  const labels = {
    olhos: 'Olhos',
    labios: 'Lábios',
    pele: 'Pele',
    acessorios: 'Acessórios',
  };
  return labels[cat] || cat;
}

function renderProducts(filter = 'todos') {
  productGrid.innerHTML = '';
  const filtered = filter === 'todos'
    ? products
    : products.filter((p) => p.category === filter);

  filtered.forEach((item) => {
    productGrid.appendChild(createProductCard(item));
  });
}

function renderAccessories() {
  accessoryGrid.innerHTML = '';
  accessories.forEach((item) => {
    accessoryGrid.appendChild(createProductCard(item));
  });
}

function getAllItems() {
  return [...products, ...accessories];
}

function addToCart(id) {
  const item = getAllItems().find((i) => i.id === id);
  if (!item) return;

  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCart();
  showToast(`${item.name} adicionado ao carrinho! 🍓`);
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  updateCart();
}

function updateQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    updateCart();
  }
}

function getSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getDiscount(subtotal) {
  if (!appliedCoupon) return 0;
  const coupon = coupons[appliedCoupon];
  if (coupon.type === 'percent') {
    return subtotal * (coupon.value / 100);
  }
  return Math.min(coupon.value, subtotal);
}

function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Seu carrinho está vazio</p>';
  } else {
    cartItems.innerHTML = cart.map((item) => `
      <div class="cart-item" data-id="${item.id}">
        <span class="cart-item-emoji">${item.emoji}</span>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>${formatPrice(item.price)}</p>
          <div class="cart-item-qty">
            <button type="button" class="qty-minus" aria-label="Diminuir">−</button>
            <span>${item.qty}</span>
            <button type="button" class="qty-plus" aria-label="Aumentar">+</button>
          </div>
        </div>
        <button type="button" class="cart-item-remove" aria-label="Remover">&times;</button>
      </div>
    `).join('');
  }

  const subtotal = getSubtotal();
  const discount = getDiscount(subtotal);
  const total = Math.max(0, subtotal - discount);

  subtotalEl.textContent = formatPrice(subtotal);
  discountEl.textContent = `- ${formatPrice(discount)}`;
  totalEl.textContent = formatPrice(total);
  discountRow.hidden = discount <= 0;
}

function openCart() {
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
}

function applyCoupon() {
  const code = couponInput.value.trim().toUpperCase();
  if (!code) {
    couponMessage.textContent = 'Digite um cupom válido.';
    couponMessage.className = 'coupon-message error';
    return;
  }

  if (coupons[code]) {
    appliedCoupon = code;
    const coupon = coupons[code];
    const label = coupon.type === 'percent'
      ? `${coupon.value}% de desconto`
      : `${formatPrice(coupon.value)} de desconto`;
    couponMessage.textContent = `Cupom "${code}" aplicado! ${label}`;
    couponMessage.className = 'coupon-message success';
    updateCart();
    showToast('Cupom aplicado com sucesso! ✨');
  } else {
    appliedCoupon = null;
    couponMessage.textContent = 'Cupom inválido. Tente MORANGO10 ou DOCES20.';
    couponMessage.className = 'coupon-message error';
    updateCart();
  }
}

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    renderProducts(tab.dataset.category);
  });
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-add')) {
    addToCart(e.target.dataset.id);
  }

  if (e.target.classList.contains('qty-minus')) {
    const id = e.target.closest('.cart-item').dataset.id;
    updateQty(id, -1);
  }

  if (e.target.classList.contains('qty-plus')) {
    const id = e.target.closest('.cart-item').dataset.id;
    updateQty(id, 1);
  }

  if (e.target.classList.contains('cart-item-remove')) {
    const id = e.target.closest('.cart-item').dataset.id;
    removeFromCart(id);
  }
});

document.getElementById('openCartBtn').addEventListener('click', openCart);
document.getElementById('closeCartBtn').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);
document.getElementById('applyCouponBtn').addEventListener('click', applyCoupon);
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) {
    showToast('Adicione produtos ao carrinho primeiro!');
    return;
  }
  showToast('Pedido enviado! Obrigada por comprar na Morangópolis 🍓');
  cart = [];
  appliedCoupon = null;
  couponInput.value = '';
  couponMessage.textContent = '';
  updateCart();
  closeCart();
});

couponInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') applyCoupon();
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

renderProducts();
renderAccessories();
updateCart();
