import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className={`product-image ${product.imageClass}`}>
        <span className="product-tag">{product.tag}</span>
        <Link className="product-image-link" to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.imageAlt} loading="lazy" />
        </Link>
        <button className="quick-add" type="button" onClick={() => onAdd(product.id)} aria-label={`Add ${product.name} to bag`}>+</button>
      </div>
      <div className="product-info">
        <div>
          <p className="product-category">{product.category.toUpperCase()} <span>·</span> {product.subcategory.toUpperCase()}</p>
          <Link className="product-name-link" to={`/products/${product.id}`}><h3>{product.name}</h3></Link>
        </div>
        <p className="product-price">${product.price}<span>.00</span></p>
      </div>
      <p className="product-detail">{product.detail}</p>
    </article>
  );
}
