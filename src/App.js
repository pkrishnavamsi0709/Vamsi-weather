import './App.css';
import {useState} from "react";
import Axios from 'axios';

function App() {

  const [data,setData] = useState({});
  const [location,setLocation]=useState("");
  const [show,setShow]=useState(false);
  const [temp,settemp]=useState(0);
  const [humidity,sethumidity]=useState(0.0);
  const [speed,setspeed]=useState(0.0);
  const [desc,setdesc]=useState("clody");


  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c4bdcb15dd316c063a2b1b538dae3cff`

  const searchlocation = (event) =>{
    if(event.key === "Enter"){
      Axios.get(url).then((response)=>{
        settemp(response.data.main.temp-273.15);
        sethumidity(response.data.main.humidity);
        setspeed(response.data.wind.speed);
        setLocation(response.data.name);
        setdesc(response.data.weather[0].main);
        setShow(true);
      })
    }
  }
 const buttonsearch =()=>{
  Axios.get(url).then((response)=>{
    console.log(response.data);
    settemp(response.data.main.temp-273.15);
    sethumidity(response.data.main.humidity);
    setspeed(response.data.wind.speed);
    setLocation(response.data.name);
    setdesc(response.data.weather[0].main);
    setShow(true);
  })
    }
  
  
  return (
    <div className='app'>
      <div  className="searchbox">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        placeholder="Location Name"
        onKeyPress={searchlocation}
        type="text" />
        <button onClick={buttonsearch}>Search</button>
      </div>
    {show && <div className='container'>
     <div className="top">
     <div className="location">
      <p>{location}</p>
      </div>
     <div className="temp">
     <h2>{Math.round(temp)} &deg;C</h2>
      </div>
      <div className="description">
      <p>{desc}</p>
     </div>
     </div>
     <div className="bottom">
     <div className="temper">
      <p>Temperature</p>
      <p className="value">{Math.round(temp)} &deg;C</p>
      </div>
      <div className="humidity">
      <p>Humidity</p>
      <p className="value">{humidity} %</p>
      </div>
      <div className="windspeed">
      <p>Wind Speed</p>
      <p className="value">{speed} Km/s</p>
      </div>
      </div> 
    </div> }   
    
      
    
    </div>
  );
}

export default App;
