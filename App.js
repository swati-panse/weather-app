import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";
import './App.css'

function App() {

  const apiKey = "b153afb2f21cc38ca4a4a9345b001970"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="heading">weather app</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control" value={inputCity}
            onChange={handleChangeInput} />
          <button className="btn btn-primary" type="button" onClick={handleSearch}>search</button>
        </div>
      </div>
      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded weatherResultBox">
            <img className="weatherIcon" src="https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Weather-1024.png"></img>
            <h5 className="weatherCity"> {data?.name}</h5>
            <h5 className="weatherTemp">{((data?.main?.temp) - 273.15).toFixed(2)}℃</h5>
          </div>
        </div>
      }
    </div>

  );
    }


  export default App;
