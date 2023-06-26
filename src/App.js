import { Line } from "react-chartjs-2"
import { useEffect, useState } from "react"
import {LineChart} from "./Components/Graph"
import { Calender } from "./Components/Calender"
import { Range } from "./Components/Range"
import "./App.css"

function App() {

  const urlArvg = "https://coronawarnappdaten.onrender.com/getDataAverages?date="
  const url = "https://coronawarnappdaten.onrender.com/getData?date="
  const [apiData, setapiData] = useState([])
  const [apiDataAvrg, setapiDataAvrg] = useState([])
  const [date, setDate] = useState("")

  useEffect(()=>{
      getDataAvrg()
      getData()
  },[])

  const getDataAvrg = async()=>{
      await fetch(`https://coronawarnappdaten.onrender.com/getDataAverages?date=2021`).then((res) => res.json()).then((daten) =>setapiDataAvrg(daten))
  }
  const getData = async()=>{
    await fetch(`https://coronawarnappdaten.onrender.com/getData?date=17.03.2021-25.07.2021`).then((res) => res.json()).then((daten) =>setapiData(daten))
  }

  let chartDataAvrg = {
    labels: apiDataAvrg.map((dayData) => dayData.month), //hier gucken wann was 
    datasets: [{
      label:"Infections per Day",
      data: apiDataAvrg.map((dayData) => dayData.average),
      onClick: (e)=>{
        console.log("dfksgj,n")
      }
      
    }]
  }
  let chartDataAll = {
    labels: apiData.map((dayData) => dayData.date),
    datasets: [{
      label:"Infections per Day",
      data: apiData.map((dayData) => dayData.infections_published_daily),
      borderColor: 'blue',
      backgroundColor: 'blue',
      pointRadius: 0,
    },{
      label: "app_downloads_daily",
      data: apiData.map((dayData) => dayData.app_downloads_daily),
      borderColor: 'red',
      backgroundColor: 'red',
      pointRadius: 0,
      onClick: (e)=>{
        console.log("dfksgj,n")
      }
    }]
  }
  const fetchDataAvrg = async(datum)=>{
    await fetch(urlArvg+datum).then((res) => res.json()).then((daten) =>setapiDataAvrg(daten))
  }
  const fetchData = async(datum)=>{
    await fetch(url+datum).then((res) => res.json()).then((daten) =>setapiData(daten))
  }
  

  return (
    <div className="App">
      <div className="eins">
        <div className="einseins">
          <LineChart chartData={chartDataAvrg}/>
        </div>
        <div className="einseinszwei">
          {/*<div className="einszwei">
            <button onClick={()=>fetchDataAvrg("0")}>All</button>
          </div>
          */}
          <div className="einsdrei">
            <button onClick={()=>fetchDataAvrg("2020")}>2020</button>
          </div>
          <div className="einsvier">
            <button onClick={()=>fetchDataAvrg("2021")}>2021</button>
          </div>
          <div className="einsfunf">
            <button onClick={()=>fetchDataAvrg("2022")}>2022</button>
          </div>
        </div>
      </div>
      <p>Click to remove</p>
      <div className="zwei">
        <LineChart chartData={chartDataAll}/>
        <div className="zweieins">
          <input type="text" placeholder="pattern: mm.YYYY or YYYY or dd.mm.yyyy-dd.mm.yyyy" onKeyDown={(e)=> e.key==="Enter"&&fetchData(date)} onChange={(e)=> setDate(e.target.value)} />
          <button onClick={()=> fetchData(date)}>Submit</button>
        </div>
      </div>
    </div>
  );
  }
export default App;
