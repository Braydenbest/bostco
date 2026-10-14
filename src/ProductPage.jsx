import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCard.jsx';
import { formatPrice, products } from './products.js';

export default function ProductPage({ onAdd }) {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);
  const [quantity, setQuantity] = useState(1);

  if (!product) return <Navigate to="/" replace />;

  const recommendations = products.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <main className="inner-page product-page" id="top">
      <div className="page-topline">
        <Link to="/#finds" className="back-link"><span aria-hidden="true">←</span> ALL FINDS</Link>
        <span>{product.category.toUpperCase()} / {product.subcategory.toUpperCase()}</span>
      </div>
      <div className="product-detail-layout">
        <div className={`product-detail-image ${product.imageClass}`}>
          <span className="product-tag">{product.tag}</span>
          <img src={product.image} alt={product.imageAlt} />
        </div>
        <section className="product-detail-copy" aria-labelledby="product-title">
          <p className="eyebrow"><span className="eyebrow-dot" /> THE GOOD-STUFF STORE</p>
          <p className="product-category detail-category">{product.category.toUpperCase()} <span>·</span> {product.subcategory.toUpperCase()}</p>
          <h1 id="product-title">{product.name}</h1>
          <p className="detail-price">{formatPrice(product.price)} <span>each</span></p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-actions">
            <div className="quantity-control detail-quantity" aria-label="Choose quantity">
              <button type="button" onClick={() => setQuantity((count) => Math.max(1, count - 1))} aria-label="Decrease quantity">−</button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" onClick={() => setQuantity((count) => count + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button className="button button-dark detail-add" type="button" onClick={() => onAdd(product.id, quantity)}>
              Add to bag <span aria-hidden="true">↗</span>
            </button>
          </div>
          <p className="delivery-note"><span aria-hidden="true">✳</span> Free delivery on orders over $50</p>
          <div className="product-facts">
            <div><span>01</span><p>Picked for everyday</p></div>
            <div><span>02</span><p>Good quality, fair price</p></div>
            <div><span>03</span><p>Easy returns within 30 days</p></div>
          </div>
        </section>
      </div>
      <section className="related-section" aria-labelledby="related-title">
        <div className="section-heading">
          <div><p className="eyebrow section-eyebrow">A FEW MORE FINDS</p><h2 id="related-title">You might also like<span>.</span></h2></div>
          <Link className="text-link related-link" to="/#finds">Shop all <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="product-grid">
          {recommendations.map((item) => <ProductCard key={item.id} product={item} onAdd={onAdd} />)}
        </div>
      </section>
    </main>
  );
}
