import React, { useState, useEffect } from 'react';
import { useNavigate ,Navigate } from 'react-router-dom';
function DataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate =useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await  fetch('https://ogchefgptbackend.vercel.app/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({userid : localStorage.getItem('userId')}),
          }) // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        
        setData(jsonData);  // Assuming the API returns a JSON array
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this runs only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data.length === 0) { //Handle the case when the API returns an empty array.
    return <div>No data available.</div>;
  }

   const handleClick=(index)=>{
    
      fetch('https://ogchefgptbackend.vercel.app/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({index: index,userid : localStorage.getItem('userId'),}),
      }).then(res=>{
        return res.json();
      }).then((data)=>{
        if(data.status===202){
          console.log("okay")
          window.location.reload();
        }
      }).catch(err=>{console.log(err)});
  }


  return (
    <ul>
      {data.map((item, index) => (
        <li key={index} onClick={()=>{handleClick(item.index)}}>{/* Access and display data properties from 'item'  */}
        
          {item.recipe_name && <pre><p>Name: {item.recipe_name}<br/></p></pre>} {/* Conditional rendering to handle potentially missing properties */}
          {item.ingredients && <pre><p>Ingredients: {item.ingredients}<br/></p></pre>}
          {item.recipe&&<pre>Recipe: {item.recipe}</pre>}
        </li>
      ))}
    </ul>
  );
}

export default DataFetcher;