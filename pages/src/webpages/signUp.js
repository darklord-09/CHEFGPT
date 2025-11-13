import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- CSS for the component ---
  // This is the identical style block from SignIn.js for a consistent theme.
  const componentStyles = `
    .signup-page-container {
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

    /* --- Cupcake Spinner --- */
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

  // --- Handler function for your API call ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    } else {
      setLoading(true); // Start loader
      setError(''); // Clear previous errors

      fetch('https://ogchefgptbackend.vercel.app/createUser', {
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
            navigate('/dashboard');
          } else {
            // Use the error message from the server if it exists
            setError(data.message || 'Error creating user');
            setUsername(''); // Clear fields on failure
            setPassword('');
          }
        })
        .catch((err) => {
          setLoading(false); // Stop loader on error
          console.error(err);
          setError(err.message || 'An unknown error occurred');
          setUsername('');
          setPassword('');
        });
    }
  };
  
  // --- Navigation handler to go back ---
  const handleGoToSignIn = () => {
    navigate('/'); // Or '/signin', whatever your sign-in route is
  };

  // --- Handlers to clear error on type (from SignIn template) ---
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
    <div className="signup-page-container">
      {/* Inject the styles into the component */}
      <style>{componentStyles}</style>

      {/* Navbar uses themed classes */}
      <nav className="navbar navbar-themed">
        <div className="container-fluid">
          <div className="navbar-brand-themed">
            {/* Using emoji for consistency, no broken image links */}
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
                Sign Up
              </h1>

              {/* Error Message */}
              {error && (
                <div
                  className="alert alert-danger text-center mt-3"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* === CUPCAKE LOADER (from template) === */}
              {loading && (
                <div className="text-center my-3">
                  <div className="cupcake-spinner" role="status">
                    🧁
                  </div>
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}

              {!loading && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Choose a Username:
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
                        onChange={handleUsernameChange} // Added handler
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Choose a Password:
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
                        onChange={handlePasswordChange} // Added handler
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* === CHANGED SECTION === */}
                  {/* Replaced d-grid with Bootstrap's row/col for side-by-side buttons */}
                  <div className="row g-3 mt-4">
                    <div className="col">
                      <button
                        type="submit"
                        className="btn btn-chocolate btn-lg w-100"
                        disabled={loading}
                      >
                        {loading ? 'Signing Up...' : 'Create Account'}
                      </button>
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-outline-themed btn-lg w-100"
                        onClick={handleGoToSignIn}
                        disabled={loading}
                      >
                        Back to Sign In
                      </button>
                    </div>
                  </div>
                  {/* === END OF CHANGED SECTION === */}

                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;