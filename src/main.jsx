import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const products = [
  {
    id: 'wash',
    name: 'Sunday Reset Hand Wash',
    category: 'Home',
    subcategory: 'Bath',
    price: 8,
    tag: 'BOSTCO PICK',
    detail: 'A sink-side upgrade. Two in the set.',
    imageClass: 'image-coral',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=850&q=80',
    imageAlt: 'Minimal hand wash and skincare bottles',
  },
  {
    id: 'bottle',
    name: 'Daytrip Insulated Bottle',
    category: 'Kitchen',
    subcategory: 'On the go',
    price: 12,
    tag: 'JUST LANDED',
    detail: 'Cold stays cold. Your new desk buddy.',
    imageClass: 'image-yellow',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=850&q=80',
    imageAlt: 'Colorful reusable drink bottles',
  },
  {
    id: 'cream',
    name: 'Cloud Nine Daily Cream',
    category: 'Beauty',
    subcategory: 'Skincare',
    price: 16,
    tag: 'MEMBER FAVE',
    detail: 'A little glow goes a long way.',
    imageClass: 'image-lilac',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=850&q=80',
    imageAlt: 'Daily moisturizer and skincare products',
  },
  {
    id: 'headphones',
    name: 'On-the-go Wireless Headphones',
    category: 'Tech',
    subcategory: 'Everyday',
    price: 19,
    tag: 'SMALL BUT MIGHTY',
    detail: 'Good sound, wherever the day goes.',
    imageClass: 'image-blue',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=850&q=80',
    imageAlt: 'Wireless headphones for everyday listening',
  },
];

const categories = ['All', 'Home', 'Beauty', 'Kitchen', 'Tech'];
const formatPrice = (amount) => `$${amount.toFixed(2)}`;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8.5h14l1 12H4l1-12Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function Header({ itemCount, onOpenCart, onSearch, searchInputRef, onSelectCategory }) {
  return (
    <>
      <div className="announcement-bar">
        <span>GOOD FINDS, BETTER PRICES</span>
        <span className="announcement-detail">Free delivery on orders over $50 <span aria-hidden="true">*</span></span>
        <span className="announcement-right">MEMBERS GET MORE <span aria-hidden="true">↗</span></span>
      </div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Bostco home">bostco<span>.</span></a>
        <nav className="primary-nav" aria-label="Main navigation">
          <a href="#finds" onClick={() => onSelectCategory('All')}>Shop all</a>
          {['Home', 'Beauty', 'Kitchen'].map((category) => (
            <a key={category} href="#finds" onClick={() => onSelectCategory(category)}>{category}</a>
          ))}
        </nav>
        <div className="header-tools">
          <label className="search-box">
            <SearchIcon />
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Find your thing"
              aria-label="Search products"
              onChange={(event) => onSearch(event.target.value)}
            />
            <kbd>/</kbd>
          </label>
          <button className="cart-trigger" type="button" onClick={onOpenCart} aria-label={`Open shopping bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}>
            <BagIcon />
            <span className="cart-label">Bag</span>
            <span className="cart-count" aria-live="polite">{itemCount}</span>
          </button>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> THE GOOD-STUFF STORE</p>
        <h1 id="hero-title">Good stuff.<br /><span>More of it.</span></h1>
        <p className="hero-description">The everyday things you love, at prices that make stocking up feel like a very good idea.</p>
        <a className="button button-dark" href="#finds">Shop the good stuff <span aria-hidden="true">↘</span></a>
        <div className="hero-footnote"><span className="footnote-star">✳</span><span>Little luxuries.<br />Very sensible prices.</span></div>
      </div>
      <div className="hero-art">
        <img src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=85" alt="Reusable drink bottles ready for everyday use" />
        <div className="hero-sticker"><span>THE DAILY</span><strong>refresh</strong><span>FROM $12</span></div>
        <div className="hero-caption"><span className="caption-mark">01</span><span>EVERYDAY, BUT BETTER</span><span className="caption-line" /><span>2026</span></div>
      </div>
      <div className="hero-side-note" aria-hidden="true">STOCK UP ON THE GOOD STUFF</div>
    </section>
  );
}

function CategoryStrip({ activeCategory, onSelectCategory }) {
  return (
    <section className="category-strip" aria-label="Shop by category">
      <span className="category-intro">A little bit of everything</span>
      <div className="category-links" role="group" aria-label="Filter products by category">
        {categories.map((category) => (
          <button
            className={`category-chip${activeCategory === category ? ' is-active' : ''}`}
            type="button"
            key={category}
            onClick={() => onSelectCategory(category)}
            aria-pressed={activeCategory === category}
          >
            {category === 'All' ? <>Everything <span>04</span></> : category}
          </button>
        ))}
      </div>
      <span className="category-aside">GOOD THINGS LIVE HERE <span aria-hidden="true">↓</span></span>
    </section>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className={`product-image ${product.imageClass}`}>
        <span className="product-tag">{product.tag}</span>
        <img src={product.image} alt={product.imageAlt} loading="lazy" />
        <button className="quick-add" type="button" onClick={() => onAdd(product.id)} aria-label={`Add ${product.name} to bag`}>+</button>
      </div>
      <div className="product-info">
        <div>
          <p className="product-category">{product.category.toUpperCase()} <span>·</span> {product.subcategory.toUpperCase()}</p>
          <h3>{product.name}</h3>
        </div>
        <p className="product-price">${product.price}<span>.00</span></p>
      </div>
      <p className="product-detail">{product.detail}</p>
    </article>
  );
}

function ProductSection({ products: visibleProducts, onAdd }) {
  return (
    <section className="finds-section" id="finds" aria-labelledby="finds-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow section-eyebrow">THE SHORTLIST <span>—</span> 001</p>
          <h2 id="finds-title">New &amp; noteworthy<span>.</span></h2>
        </div>
        <p className="section-note">A few things worth<br />making room for.</p>
      </div>
      {visibleProducts.length ? (
        <div className="product-grid">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}
        </div>
      ) : (
        <p className="empty-state" role="status">No good stuff found. Try another search.</p>
      )}
      <div className="member-banner">
        <span className="banner-spark" aria-hidden="true">✳</span>
        <div><p className="eyebrow">A GOOD DEAL GETS EVEN BETTER</p><h2>More Bostco. More to love.</h2></div>
        <p className="banner-note">Join the club for early access<br />and member-only prices.</p>
        <a href="mailto:hello@bostco.example?subject=Join%20Bostco" className="button button-light">Count me in <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}

function CartDialog({ cart, itemCount, subtotal, onQuantityChange, onClose, dialogRef }) {
  return (
    <dialog
      className="cart-dialog"
      ref={dialogRef}
      aria-labelledby="cart-title"
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="cart-panel-head">
        <div><p className="eyebrow">YOUR GOOD STUFF</p><h2 id="cart-title">Your bag<span>.</span></h2></div>
        <button className="close-cart" type="button" onClick={onClose} aria-label="Close shopping bag">×</button>
      </div>
      {itemCount === 0 ? (
        <div className="cart-empty"><span aria-hidden="true">✳</span><p>Your bag is taking a breather.</p><button className="text-link" type="button" onClick={onClose}>Find something good <span aria-hidden="true">↗</span></button></div>
      ) : (
        <>
          <div className="cart-items">
            {products.filter((product) => cart[product.id]).map((product) => (
              <article className="cart-row" key={product.id}>
                <img src={product.image} alt="" />
                <div>
                  <h3>{product.name}</h3>
                  <p>{formatPrice(product.price)} each</p>
                  <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                    <button type="button" onClick={() => onQuantityChange(product.id, -1)} aria-label={`Remove one ${product.name}`}>−</button>
                    <span>{cart[product.id]}</span>
                    <button type="button" onClick={() => onQuantityChange(product.id, 1)} aria-label={`Add one ${product.name}`}>+</button>
                  </div>
                </div>
                <span className="cart-row-total">{formatPrice(product.price * cart[product.id])}</span>
              </article>
            ))}
          </div>
          <div className="cart-summary">
            <div className="subtotal"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <p>Shipping and taxes calculated at checkout.</p>
            <button className="button button-dark checkout-button" type="button" disabled>Checkout <span>↗</span></button>
          </div>
        </>
      )}
    </dialog>
  );
}

function App() {
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const searchInputRef = useRef(null);
  const dialogRef = useRef(null);

  const itemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const subtotal = products.reduce((total, product) => total + product.price * (cart[product.id] || 0), 0);
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const searchText = `${product.name} ${product.category}`.toLowerCase();
    return matchesCategory && searchText.includes(searchQuery.trim().toLowerCase());
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (cartOpen && !dialog.open) dialog.showModal();
    if (!cartOpen && dialog.open) dialog.close();
  }, [cartOpen]);

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timeout = window.setTimeout(() => setToastMessage(''), 1800);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      const isEditing = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA'].includes(target.tagName));
      if (event.key === '/' && !isEditing && !cartOpen) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cartOpen]);

  function addToCart(productId) {
    setCart((current) => ({ ...current, [productId]: (current[productId] || 0) + 1 }));
    const product = products.find((item) => item.id === productId);
    setToastMessage(`${product.name} added to your bag`);
  }

  function changeQuantity(productId, amount) {
    setCart((current) => {
      const quantity = (current[productId] || 0) + amount;
      if (quantity > 0) return { ...current, [productId]: quantity };
      const nextCart = { ...current };
      delete nextCart[productId];
      return nextCart;
    });
  }

  function selectCategory(category) {
    setActiveCategory(category);
    setSearchQuery('');
    if (searchInputRef.current) searchInputRef.current.value = '';
  }

  function closeCart() {
    setCartOpen(false);
  }

  return (
    <>
      <Header
        itemCount={itemCount}
        onOpenCart={() => setCartOpen(true)}
        onSearch={setSearchQuery}
        searchInputRef={searchInputRef}
        onSelectCategory={selectCategory}
      />
      <main id="top">
        <Hero />
        <CategoryStrip activeCategory={activeCategory} onSelectCategory={selectCategory} />
        <ProductSection products={visibleProducts} onAdd={addToCart} />
      </main>
      <footer className="site-footer"><a className="brand footer-brand" href="#top">bostco<span>.</span></a><p>Good finds for real life.</p><span>© BOSTCO 2026</span></footer>
      <CartDialog
        cart={cart}
        itemCount={itemCount}
        subtotal={subtotal}
        onQuantityChange={changeQuantity}
        onClose={closeCart}
        dialogRef={dialogRef}
      />
      <div className={`toast${toastMessage ? ' is-visible' : ''}`} role="status" aria-live="polite">{toastMessage}</div>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
