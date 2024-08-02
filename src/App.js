import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/.netlify/functions/backend/bfhl",
        JSON.parse(jsonInput)
      );
      setResponse(response.data);
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows="10"
          cols="50"
          placeholder="Enter JSON here..."
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response</h2>
          <div>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleOptionChange}
            />{" "}
            Numbers
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleOptionChange}
            />{" "}
            Alphabets
            <input
              type="checkbox"
              value="highest_alphabet"
              onChange={handleOptionChange}
            />{" "}
            Highest Alphabet
          </div>
          <div>
            {selectedOptions.includes("numbers") && (
              <div>
                <strong>Numbers:</strong> {JSON.stringify(response.numbers)}
              </div>
            )}
            {selectedOptions.includes("alphabets") && (
              <div>
                <strong>Alphabets:</strong> {JSON.stringify(response.alphabets)}
              </div>
            )}
            {selectedOptions.includes("highest_alphabet") && (
              <div>
                <strong>Highest Alphabet:</strong>{" "}
                {JSON.stringify(response.highest_alphabet)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
