import './App.css';
import {useState} from 'react';
import axios from 'axios';
import moment from 'moment';
function App() {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [time, setTime] = useState(0);

  const handleSubmit = async () => {

    const body = {
      language: language,
      code: code
    };
    try {
      const response = await axios.post("http://localhost:4000/code", body);
      let intervalID;
      setOutput("Your code is being processed");
      if(response.data.success)
      {
        intervalID = setInterval(async () => {
          const jobID = response.data.jobID;
          const newData = await axios.get(`http://localhost:4000/status/${jobID}`);
          if(newData.data.job.status === 'success')
          {
            setOutput(newData.data.job.output);
            const completedAt = moment(newData.data.job.completedAt);
            const startedAt = moment(newData.data.job.startedAt);
            const timeTaken = completedAt.diff(startedAt, 'seconds', true)
            setTime(timeTaken)
            clearInterval(intervalID);
          }
          if(newData.data.job.status === 'error')
          {
            setOutput(newData.data.job.output)
            setTime(0);
            clearInterval(intervalID);
          }
        }, 1000);
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
        <h3>
          Run time: {time} s
        </h3>
      </div>
    </div>
  );
}

export default App;
