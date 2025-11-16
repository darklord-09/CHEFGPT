// import React, {useEffect} from 'react';
// import AddTextBoxButton from './addItems';
// import AddRecipe from './addrecipe';
// import RecipeSaver from './saveItems';
// import DataFetcher from './savedItem';
// import {useNavigate } from 'react-router-dom';

// function Dashboard() {
//     const navigate = useNavigate();
     
//     const handleLogout = () => {
//         sessionStorage.removeItem('userId');
//         sessionStorage.removeItem('userName');
//         sessionStorage.removeItem('isAuthenticated');
//         navigate('/signin'); // Redirect to sign-in page
//     };

//     // Check if user is authenticated. If not, redirect to sign in
//     useEffect(() => {
      
//         if ('userId' in sessionStorage) {
//           console.log('Ok');
//         } else {
//           navigate('/signin')
//         }
      
//     },[])
   
   

//     return (
//         <div>
         
//             <nav className="navbar navbar-light bg-light" >
//   <div className="navbar-brand"style={{color : 'chocolate'}}>
//     <img src="./chef.png" width="30" height="30" alt=""/>
//     <strong>CHEF GPT</strong>
//   </div>
//   <button type="button" className="btn btn-dark" onClick={handleLogout}>Logout</button>
  
// </nav>
// <h1><center>HELLO CHEF!</center></h1> 
            
//          <br/>   


//             <div className="container">
//     <div className="row">
//         <div className="col-md-4">
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">Search a recipe</h5>
//                 <div className="card-text"><AddRecipe/></div>
//               </div>
//             </div>
//         </div>
//         <div className="col-md-4">
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">Get ideas</h5>
//                 <div className="card-text"><AddTextBoxButton/></div>
//               </div>
//             </div>
//         </div>
//         <div className="col-md-4">
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">Save a recipe</h5>
//                 <div className="card-text"><RecipeSaver/></div>
//               </div>
//             </div>
//         </div>
//     </div>
//     <div className="row">
//         <div className="col-md-12">
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">Saved recipes</h5>
//                 <div className="card-text"><DataFetcher/></div>
//               </div>
//             </div>
//         </div>
//     </div>
// </div>

//         </div>
//     );
// }

// export default Dashboard;


import React, { useEffect, useState } from 'react';
// Assuming these are your components in other files
import AddTextBoxButton from './addItems';
import AddRecipe from './addrecipe';
import RecipeSaver from './saveItems';
import DataFetcher from './savedItem';
// ---
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Chef');

  // --- STYLES ---
  // This block contains the theme styles from SignIn/SignUp,
  // plus new ones for the dashboard layout.
  const componentStyles = `
    .dashboard-page-container {
      /* Dark wood-like background color */
      background-color: #3d2a1a;
      min-height: 100vh;
      font-family: 'Open Sans', sans-serif;
    }

    .navbar-themed {
      background-color: #D2691E; /* Chocolate */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-bottom: 2px solid #a0522d; /* Darker Sienna */
      padding: 0.5rem 1rem;
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
    
    .btn-logout {
      background-color: #fffaf0;
      color: #D2691E;
      font-weight: 600;
      border: 0;
    }
    
    .btn-logout:hover {
      background-color: white;
      color: #a0522d;
    }

    .dashboard-title {
      font-family: 'cursive', 'Georgia', serif;
      color: #fffaf0; /* Parchment/Floral White */
      font-size: 2.8rem;
      text-align: center;
      margin: 1.5rem 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    /* We use the same recipe-card style */
    .recipe-card {
      background-color: #fffaf0; /* Floral White / Parchment */
      color: #5C3A21; /* Dark Brown text */
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      border: 5px solid #D2691E;
      height: 100%; /* Make cards in a row the same height */
      display: flex;
      flex-direction: column;
    }
    
    .recipe-card .card-body {
      flex-grow: 1; /* Allows card body to fill space */
    }

    .recipe-card-header {
      font-family: 'cursive', 'Georgia', serif;
      color: #D2691E; /* Chocolate */
      font-size: 1.8rem; /* Sized for card titles */
      border-bottom: 2px solid #D2691E;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }
  `;
  // --- END OF STYLES ---

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('isAuthenticated');
    navigate('/signin'); // Redirect to sign-in page
  };

  // Check if user is authenticated. If not, redirect to sign in
  useEffect(() => {
    if ('userId' in sessionStorage) {
      // Fetch the username to personalize the welcome message
      const storedName = sessionStorage.getItem('userName');
      if (storedName) {
        setUsername(storedName);
      }
      console.log('User is authenticated');
    } else {
      console.log('User not authenticated, redirecting');
      navigate('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array means this runs once on mount

  return (
    <div className="dashboard-page-container">
      {/* Inject the styles */}
      <style>{componentStyles}</style>

      {/* --- Themed Navbar --- */}
      <nav className="navbar navbar-themed justify-content-between">
        <div className="navbar-brand-themed">
          <span className="navbar-brand-emoji">🧑‍🍳</span>
          <strong>CHEF GPT</strong>
        </div>
        <button type="button" className="btn btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* --- Themed Title --- */}
      <h1 className="dashboard-title">Hello, {username}!</h1>

      <br />

      {/* --- Themed Card Layout --- */}
      <div className="container">
        {/* Added 'g-4' for spacing between cards */}
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card recipe-card">
              <div className="card-body">
                <h5 className="card-title recipe-card-header">Search a recipe</h5>
                <div className="card-text">
                  <AddRecipe />
                </div>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card recipe-card">
              <div className="card-body">
                <h5 className="card-title recipe-card-header">Get ideas</h5>
                <div className="card-text">
                  <AddTextBoxButton />
                </div>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card recipe-card">
              <div className="card-body">
                <h5 className="card-title recipe-card-header">Save a recipe</h5>
                <div className="card-text">
                  <RecipeSaver />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Row */}
        {/* Added 'g-4' for spacing and 'mt-4' for margin-top */}
        <div className="row g-4 mt-4">
          <div className="col-md-12">
            <div className="card recipe-card">
              <div className="card-body">
                <h5 className="card-title recipe-card-header">Saved recipes</h5>
                <div className="card-text">
                  <DataFetcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;