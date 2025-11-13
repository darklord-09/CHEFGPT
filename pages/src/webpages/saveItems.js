// 
import React, { useState } from 'react';
import { useNavigate ,Navigate } from 'react-router-dom';

function RecipeSaver() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe]=useState('');
  const [error, setError] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!name || !ingredients|| !recipe) {
      setError('All fields are required.');
      return;
    }

    else{
      console.log({userid : sessionStorage.getItem('userId'),name : name, ingredients: ingredients, recipes: recipe});
      fetch('https://ogchefgptbackend.vercel.app/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid : sessionStorage.getItem('userId'),name : name, ingredients: ingredients, recipes: recipe}),
      }).then((res)=>{
        
        return res.json()
      }).then((data)=>{if(data.status===202){
        console.log("happy happy happy");
        window.location.reload();
    }
         else{
           setError('unknown server error');
         }}).catch(err=>{setError('unknown server error')})
    }

    
  };

  return (
    <div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name of Dish:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ingredients">ingredients:</label>
          <input
            type="text"
            id="ingredients"
            className="form-control"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="recipe">Recipe:</label>
          <input
            type="textarea"
            id="recipe"
            value={recipe}
            className="form-control"
            onChange={(e) => setRecipe(e.target.value)}
          />
        </div>
        <br/>
        <button className="btn btn-dark" type="submit">Save</button>
      </form>
    </div>
  );
}

export default RecipeSaver;
