import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 👈 added state for loader
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    } else {
      setLoading(true); // 👈 start loader before fetch
      fetch('https://ogchefgptbackend.vercel.app/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false); // 👈 stop loader after fetch
          if (data.status === 202) {
            localStorage.setItem('userId', data.user_id);
            localStorage.setItem('userName', username);
            localStorage.setItem('isAuthenticated', true);
            console.log('navigating to dashboard');
            navigate('/dashboard');
          } else {
            setError('wrong username or password');
          }
        })
        .catch((err) => {
          setLoading(false); // 👈 stop loader on error
          setError('unknown server error');
        });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand" style={{ color: 'chocolate' }}>
          <img src="./chef.png" width="30" height="30" alt="" />
          <strong>CHEF GPT</strong>
        </div>
      </nav>

      <br />
      <div className="d-grid gap-2">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="card" style={{ backgroundColor: '#D2691E', color: 'white' }}>
            <div className="card-body">
              <h1 className="card-title text-center" style={{ color: 'white' }}>
                Sign Up
              </h1>
              {error && <p className="text-danger">{error}</p>}
              {loading && (
                <div className="text-center mb-3">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )} {/* 👈 Bootstrap loader */}

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
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={loading} // 👈 disable while loading
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading} // 👈 disable while loading
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-light" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
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

export default SignUp;