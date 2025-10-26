import React, { useState } from 'react';
import './addItems.css';

function AddRecipe() {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  const handleChange = (event) => {
    setText(event.target.value);
  };

  async function handleSubmit() {
    setLoading(true); // ✅ Start loader
    setData([]); // clear previous data

    fetch('https://ogchefgptbackend.vercel.app/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: text }),
    })
      .then(async (response) => {
        try {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          let result = '';
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value);
          }

          const elementsArray = [];
          let boldFlag = false;
          let i = 0;

          while (i < result.length) {
            if (result[i] === '*' && result[i + 1] === ' ') {
              elementsArray.push('->');
              i++;
            } else if (result[i] === '*' && result[i + 1] === '*') {
              boldFlag = !boldFlag;
              i += 2;
            } else {
              const text = result[i];
              if (boldFlag) {
                elementsArray.push(<strong>{text}</strong>);
              } else {
                elementsArray.push(text);
              }
              i++;
            }
          }

          setData(elementsArray);
        } catch (error) {
          console.error('Error reading stream:', error);
          setData(['Error loading data.']);
        } finally {
          setLoading(false); // ✅ Stop loader after completion
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); // ✅ Stop loader even on error
      });
  }

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
      <br />
      <button className="btn btn-dark" onClick={handleSubmit}>
        Submit
      </button>

      {/* ✅ Loader */}
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Generating your recipe...</p>
        </div>
      )}

      {/* ✅ Only show data when not loading */}
      {!loading && (
        <pre>
          {data.map((element, index) => (
            <React.Fragment key={index}>{element}</React.Fragment>
          ))}
        </pre>
      )}
    </div>
  );
}

export default AddRecipe;
