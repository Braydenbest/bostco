import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignInPage() {
  const [notice, setNotice] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setNotice('');
    setSignedIn(true);
  }

  return (
    <main className="signup-page" id="top">
      <div className="signup-shell">
        <section className="signup-story" aria-label="Welcome back to Bostco">
          <img src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1100&q=85" alt="Reusable drink bottles in a range of colors" />
          <div className="signup-story-shade" />
          <div className="signup-story-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> THE GOOD-STUFF STORE</p>
            <h1>Good to see<br />you again<span>.</span></h1>
            <p>Your everyday favorites and fresh finds are right where you left them.</p>
            <div className="signup-perks">
              <p><span>01</span> A good place to pick up where you left off</p>
              <p><span>02</span> Member-only prices</p>
              <p><span>03</span> New finds, added often</p>
            </div>
          </div>
          <span className="signup-story-caption">WELCOME BACK</span>
        </section>

        <section className="signup-form-panel" aria-labelledby="signin-title">
          {signedIn ? (
            <div className="signup-success" role="status">
              <span className="confirmation-mark" aria-hidden="true">✓</span>
              <p className="eyebrow">SIGN-IN PREVIEW</p>
              <h2 id="signin-title">You’re all set<span>.</span></h2>
              <p>Authentication isn’t connected yet, so no account was accessed.</p>
              <Link className="button button-dark" to="/">Back to Bostco <span aria-hidden="true">↗</span></Link>
            </div>
          ) : (
            <>
              <div className="signup-heading">
                <p className="eyebrow">YOUR BOSTCO, YOUR WAY</p>
                <h2 id="signin-title">Welcome back<span>.</span></h2>
                <p>Sign in to get back to the good finds.</p>
              </div>
              <form className="signup-form" onSubmit={handleSubmit}>
                <label className="form-field">Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
                <label className="form-field">Password<input type="password" name="password" autoComplete="current-password" required /></label>
                <div className="signin-options">
                  <label className="signup-consent"><input type="checkbox" name="remember" /> <span>Keep me signed in</span></label>
                  <button className="forgot-link" type="button" onClick={() => setNotice('Password recovery isn’t connected in this preview.')}>Forgot password?</button>
                </div>
                {notice && <p className="signup-notice" role="status">{notice}</p>}
                <button className="button button-dark signup-submit" type="submit">Sign in <span aria-hidden="true">↗</span></button>
                <p className="signup-disclaimer">Demo only. Your details are not sent or stored.</p>
              </form>
              <p className="auth-switch">New to Bostco? <Link to="/signup">Create an account <span aria-hidden="true">↗</span></Link></p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
