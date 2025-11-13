import React, { useState } from 'react';
// Using hooks for navigation is great, but since we're in a single-file
// environment without a Router, I'll comment this out.
// If you're using react-router-dom, you can uncomment these.
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Uncomment if using react-router-dom

  // --- CSS for the spinning cupcake ---
  // We inject a <style> tag directly into the component for this demo.
  const spinnerStyles = `
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    } else {
      setLoading(true); // Start loader
      setError(''); // Clear previous errors

      // Simulate API call
      // setTimeout(() => { // Removing simulation
        fetch('https://ogchefgptbackend.vercel.app/findUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, password: password }),
        })
          .then((res) => {
            if (!res.ok) {
                // Handle non-2xx responses
                return res.json().then(errData => {
                    throw new Error(errData.message || 'Server error');
                });
            }
            return res.json();
          })
          .then((data) => {
            setLoading(false); // Stop loader
            if (data.status === 202) {
              sessionStorage.setItem('userId', data.user_id);
              sessionStorage.setItem('userName', username);
              sessionStorage.setItem('isAuthenticated', true);
              console.log('navigating to dashboard');
              navigate('/dashboard'); // Uncomment if using react-router-dom
              // alert('Sign in successful! Navigating to dashboard...'); // Placeholder
            } else {
              setError(data.message || 'Wrong username or password');
              setPassword(''); // Clear password on failed login
            }
          })
          .catch((err) => {
            setLoading(false); // Stop loader on error
            console.error(err);
            setError('An error occurred. Please try again.');
            setPassword(''); // Clear password on error
          });
      // }, 1500); // Removed 1.5s delay
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Uncomment if using react-router-dom
    // alert('Navigating to Sign Up page...'); // Placeholder
  };

  // --- Handlers to clear error on type ---
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div>
      {/* Inject the styles into the component */}
      <style>{spinnerStyles}</style>

      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand" style={{ color: 'chocolate' }}>
          {/* Using an emoji as placeholder for the image */}
          <span style={{marginRight: '10px', fontSize: '24px'}}>🧑‍🍳</span>
          <strong>CHEF GPT</strong>
        </div>
      </nav>

      <br />
      <div className="d-grid gap-2">
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
          <div className="card" style={{ backgroundColor: '#D2691E', color: 'white', minWidth: '350px' }}>
            <div className="card-body p-4">
              <h1 className="card-title text-center" style={{ color: 'white' }}>
                Sign In
              </h1>
              
              {/* Error Message */}
              {error && 
                <div className="alert alert-warning text-center mt-3" role="alert">
                  {error}
                </div>
              }

              {/* === CUPCAKE LOADER === */}
              {loading && (
                <div className="text-center my-3">
                  <div className="cupcake-spinner" role="status">
                    🧁
                  </div>
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    disabled={loading} // Disable while loading
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    disabled={loading} // Disable while loading
                  />
                </div>
                <div className="d-grid gap-2 mt-4">
                  <button type="submit" className="btn btn-light" style={{ marginRight: '30px' }} disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                  <button type="button" className="btn btn-dark" onClick={handleSignUp} disabled={loading}>
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// In a real app, you'd have a root file that renders this App
// component using ReactDOM.render.
// This default export is correct.
export default SignIn;





