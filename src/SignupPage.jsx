import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get('password') !== formData.get('confirmPassword')) {
      setError('Those passwords do not match. Try again.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  return (
    <main className="signup-page" id="top">
      <div className="signup-shell">
        <section className="signup-story" aria-label="Bostco member benefits">
          <img src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1100&q=85" alt="Reusable drink bottles in a range of colors" />
          <div className="signup-story-shade" />
          <div className="signup-story-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> THE GOOD-STUFF STORE</p>
            <h1>A little more<br />Bostco<span>.</span></h1>
            <p>Make room for the good stuff, and we’ll keep the good finds coming.</p>
            <div className="signup-perks">
              <p><span>01</span> First dibs on fresh finds</p>
              <p><span>02</span> Member-only prices</p>
              <p><span>03</span> The occasional very good deal</p>
            </div>
          </div>
          <span className="signup-story-caption">GOOD THINGS, ON YOUR TERMS</span>
        </section>

        <section className="signup-form-panel" aria-labelledby="signup-title">
          {submitted ? (
            <div className="signup-success" role="status">
              <span className="confirmation-mark" aria-hidden="true">✓</span>
              <p className="eyebrow">WELCOME TO THE CLUB</p>
              <h2 id="signup-title">You’re on the list<span>.</span></h2>
              <p>This signup preview does not create or store an account yet.</p>
              <Link className="button button-dark" to="/">Back to Bostco <span aria-hidden="true">↗</span></Link>
            </div>
          ) : (
            <>
              <div className="signup-heading">
                <p className="eyebrow">YOUR BOSTCO, YOUR WAY</p>
                <h2 id="signup-title">Come on in<span>.</span></h2>
                <p>Create an account for the good finds and member pricing.</p>
              </div>
              <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-name-fields">
                  <label className="form-field">First name<input name="firstName" autoComplete="given-name" required /></label>
                  <label className="form-field">Last name<input name="lastName" autoComplete="family-name" required /></label>
                </div>
                <label className="form-field">Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
                <label className="form-field">Password<input type="password" name="password" autoComplete="new-password" minLength="8" required /><span className="field-hint">Use at least 8 characters.</span></label>
                <label className="form-field">Confirm password<input type="password" name="confirmPassword" autoComplete="new-password" minLength="8" required /></label>
                {error && <p className="signup-error" role="alert">{error}</p>}
                <label className="signup-consent"><input type="checkbox" name="updates" /> <span>Send me occasional new-find notes and member offers.</span></label>
                <label className="signup-consent signup-terms"><input type="checkbox" name="terms" required /> <span>I agree to the Bostco terms and privacy policy.</span></label>
                <button className="button button-dark signup-submit" type="submit">Create account <span aria-hidden="true">↗</span></button>
                <p className="signup-disclaimer">Demo only. Your details stay in this browser session and are not sent anywhere.</p>
              </form>
              <p className="auth-switch">Already a Bostco member? <Link to="/signin">Sign in <span aria-hidden="true">↗</span></Link></p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
