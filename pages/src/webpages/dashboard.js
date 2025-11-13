import React, {useEffect} from 'react';
import AddTextBoxButton from './addItems';
import AddRecipe from './addrecipe';
import RecipeSaver from './saveItems';
import DataFetcher from './savedItem';
import {useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
     
    const handleLogout = () => {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('isAuthenticated');
        navigate('/signin'); // Redirect to sign-in page
    };

    // Check if user is authenticated. If not, redirect to sign in
    useEffect(() => {
      
        if ('userId' in sessionStorage) {
          console.log('Ok');
        } else {
          navigate('/signin')
        }
      
    },[])
   
   

    return (
        <div>
         
            <nav className="navbar navbar-light bg-light" >
  <div className="navbar-brand"style={{color : 'chocolate'}}>
    <img src="./chef.png" width="30" height="30" alt=""/>
    <strong>CHEF GPT</strong>
  </div>
  <button type="button" className="btn btn-dark" onClick={handleLogout}>Logout</button>
  
</nav>
<h1><center>HELLO CHEF!</center></h1> 
            
         <br/>   


            <div className="container">
    <div className="row">
        <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Search a recipe</h5>
                <div className="card-text"><AddRecipe/></div>
              </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Get ideas</h5>
                <div className="card-text"><AddTextBoxButton/></div>
              </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Save a recipe</h5>
                <div className="card-text"><RecipeSaver/></div>
              </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Saved recipes</h5>
                <div className="card-text"><DataFetcher/></div>
              </div>
            </div>
        </div>
    </div>
</div>

        </div>
    );
}

export default Dashboard;