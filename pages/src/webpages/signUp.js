import React, { useState } from 'react';
import { useNavigate ,Navigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    else{
      fetch('http://localhost:3000/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username : username, password: password}),
      }).then((res)=>{
        
        return res.json()
      }).then((data)=>{if(data.status===202){
         localStorage.setItem('userId',data.user_id)
        localStorage.setItem('userName', username)
        localStorage.setItem('isAuthenticated',true)
         console.log("navigating to dashboard");
         navigate('/dashboard')}
         else{
           setError('wrong username or password');
         }}).catch(err=>{setError('unknown server error')})
    }

    
  };

  

  return (
    <div>
       <nav className="navbar navbar-light bg-light">
  <div className="navbar-brand" style={{color : 'chocolate'}}>
    <img src="./chef.png" width="30" height="30" alt=""/>
    <strong>CHEF GPT</strong> 
  </div>
  
  </nav>
     
   
<br/>            
<div className="d-grid gap-2">
<div className="d-flex justify-content-center align-items-center vh-100"> {/* Center vertically and horizontally */}
      <div className="card" style={{ backgroundColor: '#D2691E', color: 'white' }}> {/* Chocolate color and white text */}
        <div className="card-body">
          <h1 className="card-title text-center" style={{color : 'white'}}>Sign Up</h1> {/* Centered title */}
          {error && <p className="text-danger">{error}</p>} {/* Red error message */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3"> {/* Added margin bottom for spacing */}
              <label htmlFor="username" className="form-label">Username:</label>
              <input
                type="text"
                id="username"
                className="form-control" // Use Bootstrap form control styling
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required //Added required attribute
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required //Added required attribute
              />
            </div>
            <div className="d-grid gap-2"> {/* Button takes full width */}
            <button type="submit" className="btn btn-light">Sign Up</button> 
           
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
