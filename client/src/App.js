import './App.css';
import {useState} from 'react';
import axios from 'axios';
function App() {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');

  const handleSubmit = async () => {

    const body = {
      language: language,
      code: code
    };
    try {
      const response = await axios.post("http://localhost:4000/code", body);
      if(response.data.success)
      {
        setOutput(response.data.output);
      }
      else{
        setOutput(response.data.message);
      }
    } catch (error) {
      window.alert("Error Connecting to Server!!");
    }
  }

  return (
    <div className="App">
      <div className="CodePlace">
        <h2>
          Code Compilor
        </h2>
        <div className="languageSelector">
          <label>Language:</label>
          <select value={language} onChange={(e)=>{
            setLanguage(e.target.value);
            console.log(e.target.value);
          }}>
            <option value="cpp">C++</option>
            <option value="py">Python</option>
          </select>
        </div>
        <div className="codeForm">
          <textarea rows='20' cols='75' value={code} spellCheck="false" onChange={(e)=>{
            setCode(e.target.value);
          }}></textarea>
          <button type="submit" onClick={handleSubmit}>Run</button>
        </div>
      </div>
      <div className="OutputPlace">
        <h2>
          Output
        </h2>
        <p>{output}</p>
      </div>
    </div>
  );
}

export default App;
