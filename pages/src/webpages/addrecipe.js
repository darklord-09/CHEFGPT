import React, { useState } from 'react';
import './addItems.css';
function AddRecipe() {
  const [data, setData] = useState([]);
    const [text, setText] = useState(''); // Initialize with an empty string

  const handleChange = (event) => {
    setText(event.target.value); // Update text state on input change
  };


  function handleSubmit(){
    fetch('http://localhost:3000/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name : text}),
    })
      .then(async(response) =>{ 
        try{
        const reader = response.body.getReader();
        const decoder = new TextDecoder(); // Important: Decode the stream

        let result = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          result += decoder.decode(value); // Decode each chunk
        }
        
        const elementsArray = [];
  let boldFlag = false;
  let i = 0;

  while (i < result.length) {

    if (result[i] === '*' && result[i + 1] === ' ') {
      elementsArray.push("->"); // Or React.createElement('span', null, "->") if needed
      i++;
    } else if (result[i] === '*' && result[i + 1] === '*') {
      boldFlag = !boldFlag;
      i += 2;
    } 
    else {
      const text = result[i]; // Or escape it if needed
      if(boldFlag) {
        elementsArray.push(<strong>{text}</strong>); //React.createElement('strong', null, text)
      } else {
        elementsArray.push(text); // React.createElement('span', null, text) if needed
      }
      i++;
    }
  }

  setData(elementsArray);

       // Set the decoded text in state
      } catch (error) {
        console.error('Error reading stream:', error);
        setData('Error loading data.'); // Display an error message
      }
      
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <label htmlFor="dynamicText">Enter Recipe Name:</label>
      <input
        type="text"
        id="dynamicText"
        value={text} 
        className="form-control"
        onChange={handleChange} 
        placeholder="Type here..." 
      />

     <br/>
<button className="btn btn-dark"  onClick={()=>{handleSubmit()}}>Submit</button>
     <pre>
           {data.map((element, index) => (
                 <React.Fragment key={index}>{element}</React.Fragment>
             ))}
           </pre>

    </div>
  );
}

export default AddRecipe;