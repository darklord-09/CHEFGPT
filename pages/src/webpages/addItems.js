import React, { useState } from 'react';

function AddTextBoxButton() {
  const [textboxes, setTextboxes] = useState([]);
  const [data, setData] = useState([]);
  const handleAddTextbox = () => {
    setTextboxes([...textboxes, '']); 
    // Add an empty string to represent a new textbox
    console.log(textboxes);
  };

  const handleTextboxChange = (index, event) => {
    const updatedTextboxes = [...textboxes];
    updatedTextboxes[index] = event.target.value;
    setTextboxes(updatedTextboxes);
    
  
  };

   function handleSubmit(){
    fetch('http://localhost:3000/ingredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ingredients : textboxes}),
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
      <button className="btn btn-dark" onClick={handleAddTextbox}>Add Textbox</button>
      <br/>
      <div>
        {textboxes.map((value, index) => (
          <div key={index}>
            <input
              type="text"
              value={value}
              className="form-control"
              onChange={(event) => handleTextboxChange(index, event)}
              placeholder="Enter text"
            />
             <button className="btn btn-dark"  onClick={()=>{
                const updatedTextboxes = [...textboxes];
                updatedTextboxes.splice(index,1)
                setTextboxes(updatedTextboxes)
             }}>Remove</button>
          </div>
        ))}
      </div>

      <div>
        <br/>
      <button className="btn btn-dark"  onClick={()=>{handleSubmit()}}>Submit</button>
      </div>
      
      <pre>
      {data.map((element, index) => (
            <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </pre>
      
    </div>
  );
}

export default AddTextBoxButton;