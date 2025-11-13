import React, { useState } from 'react';
// Navigation imports are now enabled
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Navigation hook is now enabled
  const navigate = useNavigate();

  // --- CSS for the component ---
  // All styles, including your original spinner, are now in this
  // single, self-contained <style> block.
  const componentStyles = `
    .signin-page-container {
      /* Dark wood-like background color */
      background-color: #3d2a1a;
      min-height: 100vh;
      font-family: 'Open Sans', sans-serif;
    }

    .navbar-themed {
      background-color: #D2691E; /* Chocolate */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-bottom: 2px solid #a0522d; /* Darker Sienna */
    }

    .navbar-brand-themed {
      font-family: 'cursive', 'Georgia', serif;
      font-size: 28px;
      font-weight: bold;
      color: white;
    }
    
    .navbar-brand-emoji {
      margin-right: 10px;
      font-size: 24px;
    }

    .page-content {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 85vh;
      padding: 1rem;
    }

    .recipe-card {
      background-color: #fffaf0; /* Floral White / Parchment */
      color: #5C3A21; /* Dark Brown text */
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      border: 5px solid #D2691E;
      min-width: 350px;
      max-width: 420px;
    }

    .recipe-card-title {
      font-family: 'cursive', 'Georgia', serif;
      color: #D2691E; /* Chocolate */
      font-size: 3.2rem;
      margin-bottom: 1rem;
    }

    .form-label {
      font-weight: 600;
      color: #a0522d; /* Sienna */
    }

    .input-group-text-themed {
      background-color: #D2691E;
      color: white;
      border: 1px solid #D2691E;
      font-size: 1.2rem;
      width: 42px; /* Fixed width for alignment */
      justify-content: center;
    }

    .form-control:focus {
      border-color: #D2691E;
      box-shadow: 0 0 0 0.25rem rgba(210, 105, 30, 0.4); /* Chocolate focus ring */
    }
    
    .btn-chocolate {
      background-color: #D2691E;
      color: white;
      border: none;
      font-weight: 600;
      padding: 10px;
      transition: background-color 0.2s;
    }

    .btn-chocolate:hover {
      background-color: #a0522d; /* Darker Sienna */
      color: white;
    }

    .btn-chocolate:disabled {
      background-color: #D2691E;
      opacity: 0.7;
    }

    .btn-outline-themed {
      border: 2px solid #D2691E;
      color: #D2691E;
      font-weight: 600;
      padding: 10px;
      transition: all 0.2s;
    }
    
    .btn-outline-themed:hover {
      background-color: #D2691E;
      color: white;
    }

    /* --- Your Original Cupcake Spinner --- */
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .cupcake-spinner {
      font-size: 48px;
      animation: spin 1s linear infinite;
      display: inline-block;
      color: #D2691E; /* Themed the cupcake */
    }
  `;

  // --- All your handler functions remain identical ---

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    } else {
      setLoading(true); // Start loader
      setError(''); // Clear previous errors

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
            return res.json().then((errData) => {
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
            // Navigation to dashboard is now enabled
            navigate('/dashboard');
          } else {
            setError(data.message || 'Wrong username or password');
            setUsername(''); // Clear username on failed login
            setPassword(''); // Clear password on failed login
          }
        })
        .catch((err) => {
          setLoading(false); // Stop loader on error
          console.error(err);
          setError('An error occurred. Please try again.');
          setUsername(''); // Clear username on error
          setPassword(''); // Clear password on error
        });
    }
  };

  const handleSignUp = () => {
    // Navigation to sign up is now enabled
    navigate('/signup');
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
    // We use the class from our <style> tag
    <div className="signin-page-container">
      {/* Inject the styles into the component */}
      <style>{componentStyles}</style>

      {/* Navbar uses themed classes */}
      <nav className="navbar navbar-themed">
        <div className="container-fluid">
          <div className="navbar-brand-themed">
            <span className="navbar-brand-emoji">🧑‍🍳</span>
            CHEF GPT
          </div>
        </div>
      </nav>

      <br />
      <div className="d-grid gap-2">
        {/* Page content wrapper for centering */}
        <div className="page-content">
          {/* The "Recipe Card" */}
          <div className="card recipe-card">
            <div className="card-body p-4 p-md-5">
              <h1 className="card-title text-center recipe-card-title">
                Sign In
              </h1>

              {/* Error Message */}
              {error && (
                <div
                  className="alert alert-danger text-center mt-3" // Changed to alert-danger for better visibility
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* === CUPCAKE LOADER === */}
              {loading && (
                <div className="text-center my-3">
                  <div className="cupcake-spinner" role="status">
                    🧁
                  </div>
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}

              {/* We conditionally render the form instead of using inline styles */}
              {!loading && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <div className="input-group">
                      <span className="input-group-text input-group-text-themed">
                        🧑
                      </span>
                      <input
                        type="text"
                        id="username"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <div className="input-group">
                      <span className="input-group-text input-group-text-themed">
                        🔑
                      </span>
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="d-grid gap-3 mt-4">
                    <button
                      type="submit"
                      className="btn btn-chocolate btn-lg"
                      disabled={loading}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-themed btn-lg"
                      onClick={handleSignUp}
                      disabled={loading}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;