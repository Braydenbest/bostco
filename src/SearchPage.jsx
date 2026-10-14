import { Link } from 'react-router-dom';
import ProductCard from './ProductCard.jsx';
import { categories, products } from './products.js';

export default function SearchPage({ query, onAdd }) {
  const normalizedQuery = query.trim().toLowerCase();
  const results = products.filter((product) => {
    if (!normalizedQuery) return true;
    const searchableText = `${product.name} ${product.category} ${product.subcategory} ${product.detail} ${product.description}`.toLowerCase();
    return searchableText.includes(normalizedQuery);
  });

  return (
    <main className="inner-page search-page" id="top">
      <div className="page-topline">
        <span className="back-link"><span aria-hidden="true">⌕</span> BOSTCO FINDS</span>
        <span>{results.length} {results.length === 1 ? 'ITEM' : 'ITEMS'}</span>
      </div>
      <section className="search-results" aria-labelledby="search-title">
        <div className="search-results-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> THE GOOD-STUFF STORE</p>
            <h1 id="search-title">{normalizedQuery ? 'Search results' : 'Find good stuff'}<span>.</span></h1>
            <p className="search-summary">
              {normalizedQuery
                ? `${results.length} ${results.length === 1 ? 'find' : 'finds'} for “${query.trim()}”`
                : 'Browse the full collection or search by item, category, or use.'}
            </p>
          </div>
        </div>
        {results.length > 0 ? (
          <div className="product-grid">
            {results.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}
          </div>
        ) : (
          <div className="search-empty" role="status">
            <span className="search-empty-mark" aria-hidden="true">⌕</span>
            <h2>No finds for “{query.trim()}”<span>.</span></h2>
            <p>Try a different search, or browse a category.</p>
            <div className="search-category-links">
              {categories.filter((category) => category !== 'All').map((category) => (
                <Link key={category} to={`/search?q=${encodeURIComponent(category)}`}>{category}</Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
