import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, products } from './products.js';

export default function CheckoutPage({ cart, subtotal, onOrderComplete }) {
  const [confirmation, setConfirmation] = useState(null);
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 6.5;
  const total = subtotal + shipping;
  const cartProducts = products.filter((product) => cart[product.id]);

  function handleSubmit(event) {
    event.preventDefault();
    setConfirmation({ orderNumber: `BOS-${Date.now().toString().slice(-6)}`, total });
    onOrderComplete();
  }

  if (confirmation) {
    return (
      <main className="inner-page checkout-page" id="top">
        <section className="order-confirmation">
          <span className="confirmation-mark" aria-hidden="true">✓</span>
          <p className="eyebrow">THAT WAS A GOOD PICK</p>
          <h1>Order received<span>.</span></h1>
          <p>This is a demo checkout. No payment was collected.</p>
          <div className="confirmation-number"><span>ORDER NUMBER</span><strong>{confirmation.orderNumber}</strong><span>DEMO TOTAL · {formatPrice(confirmation.total)}</span></div>
          <Link className="button button-dark" to="/">Back to shopping <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <main className="inner-page checkout-page" id="top">
        <div className="checkout-empty">
          <p className="eyebrow">YOUR BAG IS EMPTY</p>
          <h1>Nothing to check out yet<span>.</span></h1>
          <p>Find a few good things, then they’ll be waiting here.</p>
          <Link className="button button-dark" to="/#finds">Browse the finds <span aria-hidden="true">↗</span></Link>
        </div>
      </main>
    );
  }

  return (
    <main className="inner-page checkout-page" id="top">
      <div className="page-topline">
        <Link to="/#finds" className="back-link"><span aria-hidden="true">←</span> KEEP SHOPPING</Link>
        <span>SECURE CHECKOUT <span aria-hidden="true">·</span> DEMO</span>
      </div>
      <div className="checkout-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> ALMOST YOURS</p>
        <h1>Checkout<span>.</span></h1>
      </div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-form-section" aria-labelledby="contact-title">
            <div className="checkout-section-heading"><span>01</span><h2 id="contact-title">Contact</h2></div>
            <label className="form-field form-field-wide">Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
          </section>
          <section className="checkout-form-section" aria-labelledby="delivery-title">
            <div className="checkout-section-heading"><span>02</span><h2 id="delivery-title">Delivery details</h2></div>
            <div className="form-grid">
              <label className="form-field">First name<input name="firstName" autoComplete="given-name" required /></label>
              <label className="form-field">Last name<input name="lastName" autoComplete="family-name" required /></label>
              <label className="form-field form-field-wide">Street address<input name="address" autoComplete="street-address" required /></label>
              <label className="form-field">City<input name="city" autoComplete="address-level2" required /></label>
              <label className="form-field">ZIP code<input name="postalCode" autoComplete="postal-code" required /></label>
            </div>
          </section>
          <section className="checkout-form-section" aria-labelledby="payment-title">
            <div className="checkout-section-heading"><span>03</span><h2 id="payment-title">Payment</h2></div>
            <div className="demo-payment"><span className="payment-dot" /><div><strong>Demo order</strong><p>No payment details are requested or charged.</p></div><span className="demo-label">PREVIEW</span></div>
          </section>
          <button className="button button-dark place-order" type="submit">Place demo order <span aria-hidden="true">↗</span></button>
          <p className="checkout-disclaimer">Demo only. Your form details are not sent to a server or stored.</p>
        </form>
        <aside className="order-summary" aria-labelledby="summary-title">
          <div className="summary-heading"><div><p className="eyebrow">THE GOOD STUFF</p><h2 id="summary-title">Your order<span>.</span></h2></div><span>{cartProducts.length} ITEMS</span></div>
          <div className="summary-items">
            {cartProducts.map((product) => (
              <div className="summary-item" key={product.id}>
                <img src={product.image} alt="" />
                <div><strong>{product.name}</strong><span>Qty {cart[product.id]} · {formatPrice(product.price)} each</span></div>
                <b>{formatPrice(product.price * cart[product.id])}</b>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div><span>Standard delivery</span><strong>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</strong></div>
            <div className="summary-total"><span>Estimated total</span><strong>{formatPrice(total)}</strong></div>
            <p>Free standard delivery on orders over $50. Taxes are not included in this demo.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
