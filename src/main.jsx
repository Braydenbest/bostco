import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AccountPage from './AccountPage.jsx';
import CheckoutPage from './CheckoutPage.jsx';
import ProductCard from './ProductCard.jsx';
import ProductPage from './ProductPage.jsx';
import SearchPage from './SearchPage.jsx';
import SignInPage from './SignInPage.jsx';
import SignupPage from './SignupPage.jsx';
import { categories, formatPrice, products } from './products.js';
import './styles.css';

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

function Header({ itemCount, onOpenCart, onSearch, onSearchSubmit, searchInputRef, onSelectCategory, searchQuery }) {
  return (
    <>
      <div className="announcement-bar">
        <span>GOOD FINDS, BETTER PRICES</span>
        <span className="announcement-detail">Free delivery on orders over $50 <span aria-hidden="true">*</span></span>
        <span className="announcement-right">MEMBERS GET MORE <span aria-hidden="true">↗</span></span>
      </div>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Bostco home">bostco<span>.</span></Link>
        <nav className="primary-nav" aria-label="Main navigation">
          <Link to="/#finds" onClick={() => onSelectCategory('All')}>Shop all</Link>
          {['Home', 'Beauty', 'Kitchen'].map((category) => (
            <Link key={category} to="/#finds" onClick={() => onSelectCategory(category)}>{category}</Link>
          ))}
        </nav>
        <div className="header-tools">
          <Link className="signin-link" to="/account">Account</Link>
          <Link className="join-link" to="/signup">Join</Link>
          <form className="search-box" role="search" onSubmit={(event) => { event.preventDefault(); onSearchSubmit(); }}>
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              placeholder="Find your thing"
              aria-label="Search products"
              onChange={(event) => onSearch(event.target.value)}
            />
            <button className="search-submit" type="submit" aria-label="Search"><SearchIcon /></button>
            <kbd>/</kbd>
          </form>
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
        <div className="hero-sticker"><span>THE DAILY</span><strong>refresh</strong><span>FROM $16</span></div>
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
            {category === 'All' ? <>Everything <span>{products.length.toString().padStart(2, '0')}</span></> : category}
          </button>
        ))}
      </div>
      <span className="category-aside">GOOD THINGS LIVE HERE <span aria-hidden="true">↓</span></span>
    </section>
  );
}

function ProductSection({ products: visibleProducts, onAdd }) {
  return (
    <section className="finds-section" id="finds" aria-labelledby="finds-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow section-eyebrow">THE SHORTLIST <span>—</span> {products.length.toString().padStart(3, '0')}</p>
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

function CartDialog({ cart, itemCount, subtotal, onQuantityChange, onClose, onCheckout, dialogRef }) {
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
            <button className="button button-dark checkout-button" type="button" onClick={onCheckout}>Checkout <span>↗</span></button>
          </div>
        </>
      )}
    </dialog>
  );
}

function HomePage({ activeCategory, onSelectCategory, products: visibleProducts, onAdd }) {
  return (
    <main id="top">
      <Hero />
      <CategoryStrip activeCategory={activeCategory} onSelectCategory={onSelectCategory} />
      <ProductSection products={visibleProducts} onAdd={onAdd} />
    </main>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '');
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const searchInputRef = useRef(null);
  const dialogRef = useRef(null);

  const itemCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const subtotal = products.reduce((total, product) => total + product.price * (cart[product.id] || 0), 0);
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const searchText = `${product.name} ${product.category} ${product.subcategory} ${product.detail} ${product.description}`.toLowerCase();
    return matchesCategory && searchText.includes(searchQuery.trim().toLowerCase());
  });

  useEffect(() => {
    if (location.pathname === '/search') setSearchQuery(searchParams.get('q') || '');
    else if (location.pathname === '/') setSearchQuery('');
  }, [location.pathname, searchParams]);

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

  function addToCart(productId, quantity = 1) {
    setCart((current) => ({ ...current, [productId]: (current[productId] || 0) + quantity }));
    const product = products.find((item) => item.id === productId);
    setToastMessage(`${quantity > 1 ? `${quantity} × ` : ''}${product.name} added to your bag`);
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
    if (location.pathname !== '/') navigate('/#finds');
  }

  function submitSearch() {
    const query = searchQuery.trim();
    setActiveCategory('All');
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
  }

  function reorderItems(items, orderId) {
    setCart((current) => items.reduce((nextCart, item) => ({
      ...nextCart,
      [item.productId]: (nextCart[item.productId] || 0) + item.quantity,
    }), { ...current }));
    setToastMessage(`Items from order ${orderId} added to your bag`);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function goToCheckout() {
    closeCart();
    navigate('/checkout');
  }

  return (
    <>
      <Header
        itemCount={itemCount}
        onOpenCart={() => setCartOpen(true)}
        onSearch={setSearchQuery}
        onSearchSubmit={submitSearch}
        searchInputRef={searchInputRef}
        onSelectCategory={selectCategory}
        searchQuery={searchQuery}
      />
      <Routes>
        <Route path="/" element={<HomePage activeCategory={activeCategory} onSelectCategory={selectCategory} products={visibleProducts} onAdd={addToCart} />} />
        <Route path="/search" element={<SearchPage key={location.search} query={searchQuery} onAdd={addToCart} />} />
        <Route path="/products/:productId" element={<ProductPage key={location.pathname} onAdd={addToCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} subtotal={subtotal} onOrderComplete={() => setCart({})} />} />
        <Route path="/account" element={<AccountPage onReorder={reorderItems} />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="site-footer"><Link className="brand footer-brand" to="/">bostco<span>.</span></Link><p>Good finds for real life.</p><span>© BOSTCO 2026</span></footer>
      <CartDialog
        cart={cart}
        itemCount={itemCount}
        subtotal={subtotal}
        onQuantityChange={changeQuantity}
        onClose={closeCart}
        onCheckout={goToCheckout}
        dialogRef={dialogRef}
      />
      <div className={`toast${toastMessage ? ' is-visible' : ''}`} role="status" aria-live="polite">{toastMessage}</div>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
