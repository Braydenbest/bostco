import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, products } from './products.js';

const defaultProfile = {
  firstName: 'Jordan',
  lastName: 'Sample',
  email: 'jordan@example.com',
  phone: '',
  address: '42 Market Street',
  city: 'Portland',
  postalCode: '97201',
};

const defaultPreferences = {
  orderUpdates: true,
  productNotes: false,
  smsUpdates: false,
};

const defaultOrders = [
  {
    id: 'BOS-485102',
    date: 'October 10, 2026',
    status: 'Processing',
    total: 36,
    items: [{ productId: 'wash', quantity: 2 }, { productId: 'bottle', quantity: 1 }],
  },
  {
    id: 'BOS-478721',
    date: 'October 02, 2026',
    status: 'In transit',
    total: 45,
    items: [{ productId: 'headphones', quantity: 1 }, { productId: 'candle', quantity: 1 }],
  },
  {
    id: 'BOS-461904',
    date: 'September 21, 2026',
    status: 'Delivered',
    total: 44,
    items: [{ productId: 'cream', quantity: 1 }, { productId: 'mugs', quantity: 1 }],
  },
];

const orderFilters = ['All orders', 'In progress', 'Delivered', 'Cancelled'];

function readStoredValue(key, fallback) {
  try {
    const storedValue = window.localStorage.getItem(key);
    if (!storedValue) return fallback;
    const parsedValue = JSON.parse(storedValue);
    if (Array.isArray(fallback)) return Array.isArray(parsedValue) ? parsedValue : fallback;
    if (parsedValue === null || typeof parsedValue !== 'object' || Array.isArray(parsedValue)) return fallback;
    return { ...fallback, ...parsedValue };
  } catch {
    return fallback;
  }
}

function saveStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

function OrdersPanel({ orders, activeFilter, onFilterChange, onCancelOrder, onReorder }) {
  const [trackingOrder, setTrackingOrder] = useState('');
  const visibleOrders = orders.filter((order) => {
    if (activeFilter === 'In progress') return ['Processing', 'In transit'].includes(order.status);
    if (activeFilter === 'Delivered' || activeFilter === 'Cancelled') return order.status === activeFilter;
    return true;
  });

  return (
    <section className="account-panel" aria-labelledby="orders-heading">
      <div className="account-panel-heading">
        <div><p className="eyebrow">YOUR ORDER HISTORY</p><h2 id="orders-heading">Your orders<span>.</span></h2></div>
        <span className="account-panel-count">{orders.length} SAMPLE ORDERS</span>
      </div>
      <div className="order-filters" role="group" aria-label="Filter orders">
        {orderFilters.map((filter) => (
          <button key={filter} type="button" className={`order-filter${activeFilter === filter ? ' is-active' : ''}`} aria-pressed={activeFilter === filter} onClick={() => onFilterChange(filter)}>{filter}</button>
        ))}
      </div>
      {visibleOrders.length ? (
        <div className="account-orders">
          {visibleOrders.map((order) => (
            <article className="order-record" key={order.id}>
              <div className="order-record-heading">
                <div><p className="order-number">ORDER {order.id}</p><p className="order-date">Placed {order.date}</p></div>
                <span className={`order-status status-${order.status.toLowerCase().replaceAll(' ', '-')}`}>{order.status}</span>
              </div>
              <div className="order-record-summary">
                <span>{order.items.reduce((count, item) => count + item.quantity, 0)} items</span>
                <strong>{formatPrice(order.total)}</strong>
              </div>
              <div className="order-actions">
                <details className="order-details">
                  <summary>View items <span aria-hidden="true">⌄</span></summary>
                  <ul>
                    {order.items.map((item) => {
                      const product = products.find((entry) => entry.id === item.productId);
                      return <li key={item.productId}><span>{product?.name || 'Store item'} × {item.quantity}</span><span>{formatPrice((product?.price || 0) * item.quantity)}</span></li>;
                    })}
                  </ul>
                </details>
                {order.status !== 'Cancelled' && <button className="account-action" type="button" onClick={() => onReorder(order)}>Reorder items</button>}
                {order.status === 'In transit' && <button className="account-action" type="button" onClick={() => setTrackingOrder(trackingOrder === order.id ? '' : order.id)}>Track package</button>}
                {order.status === 'Processing' && <button className="account-action account-action-danger" type="button" onClick={() => onCancelOrder(order.id)}>Cancel order</button>}
              </div>
              {trackingOrder === order.id && <p className="tracking-note" role="status">Tracking preview: carrier updates are not connected yet.</p>}
            </article>
          ))}
        </div>
      ) : (
        <p className="account-empty-state">No {activeFilter.toLowerCase()} to show.</p>
      )}
      <p className="account-demo-note">Sample order history for this frontend preview.</p>
    </section>
  );
}

function ProfilePanel({ profile, onSave }) {
  const [formValues, setFormValues] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => setFormValues(profile), [profile]);

  function updateField(event) {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(formValues);
    setSaved(true);
  }

  return (
    <section className="account-panel" aria-labelledby="profile-heading">
      <div className="account-panel-heading">
        <div><p className="eyebrow">YOUR DETAILS</p><h2 id="profile-heading">Profile<span>.</span></h2></div>
        <span className="account-panel-count">EDITABLE PROFILE</span>
      </div>
      <form className="account-profile-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field">First name<input name="firstName" autoComplete="given-name" value={formValues.firstName} onChange={updateField} required /></label>
          <label className="form-field">Last name<input name="lastName" autoComplete="family-name" value={formValues.lastName} onChange={updateField} required /></label>
          <label className="form-field form-field-wide">Email address<input type="email" name="email" autoComplete="email" value={formValues.email} onChange={updateField} required /></label>
          <label className="form-field form-field-wide">Phone number <span className="optional-label">OPTIONAL</span><input type="tel" name="phone" autoComplete="tel" value={formValues.phone} onChange={updateField} /></label>
        </div>
        <div className="account-form-divider"><p className="eyebrow">DELIVERY ADDRESS</p></div>
        <div className="form-grid">
          <label className="form-field form-field-wide">Street address<input name="address" autoComplete="street-address" value={formValues.address} onChange={updateField} required /></label>
          <label className="form-field">City<input name="city" autoComplete="address-level2" value={formValues.city} onChange={updateField} required /></label>
          <label className="form-field">ZIP code<input name="postalCode" autoComplete="postal-code" value={formValues.postalCode} onChange={updateField} required /></label>
        </div>
        <div className="account-save-row">
          <button className="button button-dark" type="submit">Save profile <span aria-hidden="true">↗</span></button>
          {saved && <span className="save-confirmation" role="status">Profile saved on this device.</span>}
        </div>
      </form>
    </section>
  );
}

function SettingsPanel({ preferences, onPreferenceChange }) {
  const settings = [
    { key: 'orderUpdates', title: 'Order updates', detail: 'Get an email when an order is confirmed, shipped, or delivered.' },
    { key: 'productNotes', title: 'New finds and offers', detail: 'Occasional notes about new products and member pricing.' },
    { key: 'smsUpdates', title: 'Text message updates', detail: 'Get delivery status updates by text when available.' },
  ];

  return (
    <section className="account-panel" aria-labelledby="settings-heading">
      <div className="account-panel-heading">
        <div><p className="eyebrow">YOUR PREFERENCES</p><h2 id="settings-heading">Settings<span>.</span></h2></div>
        <span className="account-panel-count">SAVED ON THIS DEVICE</span>
      </div>
      <div className="account-settings-list">
        {settings.map((setting) => (
          <label className="account-setting" key={setting.key}>
            <span className="account-setting-copy"><strong>{setting.title}</strong><span>{setting.detail}</span></span>
            <input type="checkbox" role="switch" checked={preferences[setting.key]} onChange={(event) => onPreferenceChange(setting.key, event.target.checked)} aria-label={setting.title} />
          </label>
        ))}
      </div>
      <p className="account-demo-note">Preferences are stored locally in this browser preview.</p>
    </section>
  );
}

export default function AccountPage({ onReorder }) {
  const [activeTab, setActiveTab] = useState('Orders');
  const [activeFilter, setActiveFilter] = useState('All orders');
  const [profile, setProfile] = useState(() => readStoredValue('bostco.profile', defaultProfile));
  const [preferences, setPreferences] = useState(() => readStoredValue('bostco.preferences', defaultPreferences));
  const [orders, setOrders] = useState(() => readStoredValue('bostco.orders', defaultOrders));
  const [notice, setNotice] = useState('');

  useEffect(() => saveStoredValue('bostco.profile', profile), [profile]);
  useEffect(() => saveStoredValue('bostco.preferences', preferences), [preferences]);
  useEffect(() => saveStoredValue('bostco.orders', orders), [orders]);

  function saveProfile(nextProfile) {
    setProfile(nextProfile);
  }

  function updatePreference(key, value) {
    setPreferences((current) => ({ ...current, [key]: value }));
  }

  function cancelOrder(orderId) {
    setOrders((current) => current.map((order) => order.id === orderId ? { ...order, status: 'Cancelled' } : order));
    setNotice(`Order ${orderId} cancelled in this demo.`);
  }

  function reorder(order) {
    onReorder(order.items, order.id);
  }

  const tabs = ['Orders', 'Profile', 'Settings'];

  return (
    <main className="inner-page account-page" id="top">
      <div className="page-topline"><Link to="/" className="back-link"><span aria-hidden="true">←</span> BACK TO STORE</Link><span>DEMO ACCOUNT</span></div>
      <header className="account-page-heading">
        <div><p className="eyebrow"><span className="eyebrow-dot" /> YOUR BOSTCO</p><h1>Account<span>.</span></h1><p>Good to have you, {profile.firstName}.</p></div>
        <p className="account-demo-banner">Profile, orders, and preferences are saved locally in this browser preview.</p>
      </header>
      <div className="account-tabs" role="tablist" aria-label="Account sections">
        {tabs.map((tab) => (
          <button key={tab} id={`account-tab-${tab.toLowerCase()}`} className={`account-tab${activeTab === tab ? ' is-active' : ''}`} type="button" role="tab" aria-selected={activeTab === tab} aria-controls="account-tab-panel" onClick={() => { setActiveTab(tab); setNotice(''); }}>{tab}</button>
        ))}
      </div>
      <div className="account-tab-panel" id="account-tab-panel" role="tabpanel" aria-labelledby={`account-tab-${activeTab.toLowerCase()}`}>
        {notice && <p className="account-notice" role="status">{notice}</p>}
        {activeTab === 'Orders' && <OrdersPanel orders={orders} activeFilter={activeFilter} onFilterChange={setActiveFilter} onCancelOrder={cancelOrder} onReorder={reorder} />}
        {activeTab === 'Profile' && <ProfilePanel profile={profile} onSave={saveProfile} />}
        {activeTab === 'Settings' && <SettingsPanel preferences={preferences} onPreferenceChange={updatePreference} />}
      </div>
      <p className="account-signin-note">Need a real account? <Link to="/signin">Go to sign in <span aria-hidden="true">↗</span></Link></p>
    </main>
  );
}
