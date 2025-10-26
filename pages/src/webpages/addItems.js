import React, { useState } from 'react';
import './addItems.css'; // ✅ same CSS file for spinner styling

function AddTextBoxButton() {
  const [textboxes, setTextboxes] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Loader state

  const handleAddTextbox = () => {
    setTextboxes([...textboxes, '']);
  };

  const handleTextboxChange = (index, event) => {
    const updatedTextboxes = [...textboxes];
    updatedTextboxes[index] = event.target.value;
    setTextboxes(updatedTextboxes);
  };

  function handleSubmit() {
    setLoading(true); // ✅ Start loader
    setData([]); // Clear previous result

    fetch('https://ogchefgptbackend.vercel.app/ingredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients: textboxes }),
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
          setLoading(false); // ✅ Stop loader
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); // ✅ Stop loader even on error
      });
  }

  return (
    <div>
      <button className="btn btn-dark" onClick={handleAddTextbox}>
        Add Textbox
      </button>
      <br />
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
            <button
              className="btn btn-dark"
              onClick={() => {
                const updatedTextboxes = [...textboxes];
                updatedTextboxes.splice(index, 1);
                setTextboxes(updatedTextboxes);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div>
        <br />
        <button className="btn btn-dark" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* ✅ Loader display */}
      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Analyzing your ingredients...</p>
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

export default AddTextBoxButton;
