import './App.css';
import {useState} from "react";
import Axios from 'axios';

function App() {

  const [data,setData] = useState({});
  const [location,setLocation]=useState("");
  const [show,setShow]=useState(false);
  const [temp,settemp]=useState(0);
  const [Pressure,setpressure]=useState(0);
  const [humidity,sethumidity]=useState(0.0);
  const [speed,setspeed]=useState(0.0);
  const [rise,setrise]=useState("");
  const [set,setset]=useState("");
  const [desc,setdesc]=useState("clody");


  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c4bdcb15dd316c063a2b1b538dae3cff`

  const searchlocation = (event) =>{
    if(event.key === "Enter"){
      Axios.get(url).then((response)=>{
        settemp(response.data.main.temp-273.15);
        sethumidity(response.data.main.humidity);
        setspeed(response.data.wind.speed);
        setLocation(response.data.name);
        setpressure(response.data.main.pressure);
        setdesc(response.data.weather[0].description);
        setset(covertUnixToHour(response.data.sys.sunset));
    setrise(covertUnixToHour(response.data.sys.sunrise));
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
    setpressure(response.data.main.pressure);
    setdesc(response.data.weather[0].description);
    setset(covertUnixToHour(response.data.sys.sunset));
    setrise(covertUnixToHour(response.data.sys.sunrise));
    setShow(true);
  })
    }

    const covertUnixToHour= (input) => {
      let date = new Date(input* 1000).toString();
      let time = date.slice(16, 24);
      return time;
  }
  
  
  return (
    <div className={(typeof desc!= "undefined")
    ?(desc === "clear sky" || desc === "few cloluds" || desc === "scatterd clouds")
      ?"app warm"
      :(desc === "broken clouds"|| desc === "shower rain" || desc === "rain")
        ? "app rain" 
        :"app"
    :"app"}>
    <main>
      <div className="search_box">
         <input 
         value={location}
         onChange={event => setLocation(event.target.value)}
         placeholder="Location"
         onKeyPress={searchlocation}
         type="text"
         className='search_bar'/> 
         <button onClick={buttonsearch} className="search_btn">serach</button>
      </div>
      {show&&<div>
        <div className='Location_box'>
          <div className="location">{location}</div>
        </div>
      
        <div className="temp_box">
          <div className='temperature'>{Math.round(temp)}°C</div>
          <div className='description'>{desc}</div>
          <div></div>
          <div className="check">SUN RISE :{rise} AM</div>
          <div className="check">SUN SET :{set} PM</div>
        </div>
        <div className='value_box'>
          <p className='pre'>Pressure : {Pressure}hPa</p>
          <p className='hum'>Humidity : {humidity}%</p>
          <p className="speed">Speed : {Math.round(speed)}km/s</p>
        </div>
      </div>
      }
      
    </main>
      
    
    </div>
  );
}

export default App;

