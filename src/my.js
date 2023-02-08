import React from 'react'

export default function my() {
  const [temp,settemp]=useState(0);
  const [humidity,sethumidity]=useState(0.0);
  const [speed,setspeed]=useState(0.0);
  const [value,setValue]=useState("tenali");
  const [button,setbutton]=useState(true);
 
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=c4bdcb15dd316c063a2b1b538dae3cff`


  const getclimate= () =>{
   Axios.get(url).then((response)=>{
     console.log(response);
     settemp(response.data.main.temp-273.15);
     sethumidity(response.data.main.humidity);
     setspeed(response.data.wind.speed);
   })
  }

  const searchItems = (v) =>{
    setbutton(false);
    setValue(v);
 }
  return (
    <div>
      <div className="App mx-3">
      <h1> This is the current wheather</h1>-
    </div>
    <div style={{textAlign:"center"}}>
      <h2>Enter the city Name</h2>
      <input icon='search'
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
      <button disabled={button} onClick={getclimate}>Get Data</button>
    </div>
    <div className="values" style={{textAlign:"center"}}>
      <h3>Temp:{Math.round(temp)} &deg;C</h3>
      <h3>humidity:{humidity} %</h3>
      <h3>wind speed:{speed} km/s%</h3>
    </div>
    </div>
  )
}
