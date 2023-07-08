import { useEffect, useState } from "react"
import {LineChart} from "./Components/Graph"
import "./App.css"

function App() {

  const urlArvg = "https://coronawarnappdaten.onrender.com/getDataAverages?date="
  const url = "https://coronawarnappdaten.onrender.com/getData?date="
  const [apiData, setapiData] = useState([])
  const [apiDataAvrg, setapiDataAvrg] = useState([])
  const [date, setDate] = useState("")
  const [displayedRangeAvrg, setDisplayedRangeAvrg] = useState("2021")
  const [displayedRange, setDisplayedRange] = useState("17.03.2021-25.07.2021")
  

  useEffect(()=>{
      getDataAvrg()
      getData()
  },[])

  const getDataAvrg = async()=>{
      await fetch(`https://coronawarnappdaten.onrender.com/getDataAverages?date=${displayedRangeAvrg}`).then((res) => res.json()).then((daten) =>setapiDataAvrg(daten))
  }
  const getData = async()=>{
    await fetch(`https://coronawarnappdaten.onrender.com/getData?date=${displayedRange}`).then((res) => res.json()).then((daten) =>setapiData(daten))
  }

  let chartDataAvrg = {
    labels: apiDataAvrg.map((dayData) => dayData.month), //hier gucken wann was 
    datasets: [{
      label:"Average infections per day in a month",
      data: apiDataAvrg.map((dayData) => dayData.average)
    }]
  }
  let chartDataAll = {
    labels: apiData.map((dayData) => dayData.date),
    datasets: [{
      label:"Infections per day",
      data: apiData.map((dayData) => dayData.infections_published_daily),
      borderColor: 'blue',
      backgroundColor: 'blue',
      pointRadius: 0, //points removed because they are too much in a big Range
    },{
      label: "app downloads daily",
      data: apiData.map((dayData) => dayData.app_downloads_daily),
      borderColor: 'red',
      backgroundColor: 'red',
      pointRadius: 0 //points removed because they are too much in a big Range
    }]
  }
  const fetchDataAvrg = async(datum)=>{
    await fetch(urlArvg+datum).then((res) => res.json()).then((daten) =>setapiDataAvrg(daten))
    setDisplayedRangeAvrg(datum)
  }
  const fetchData = async(datum)=>{
    await fetch(url+datum).then((res) => res.json()).then((daten) =>setapiData(daten))
    setDisplayedRange(datum)
  }
  

  return (
    <div className="App">
    <h1>Displayed: {displayedRangeAvrg}</h1>
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
            <button onClick={() => fetchDataAvrg("2020")}>2020</button>
          </div>
          <div className="einsvier">
            <button onClick={() => fetchDataAvrg("2021")}>2021</button>
          </div>
          <div className="einsfunf">
            <button onClick={() => fetchDataAvrg("2022")}>2022</button>
          </div>
        </div>
      </div>
      <hr/>
      <h1>Displayed: {displayedRange}</h1>
      <div className="zwei">
        <LineChart chartData={chartDataAll}/>
        <div className="zweieins">
          <input type="text" placeholder="e.g. 17.03.2021-25.07.2021" onKeyDown={(e)=> e.key==="Enter"&&fetchData(date)} onChange={(e)=> setDate(e.target.value)} />
          <div className="infos">
            <p>Data range: 01.01.2020-05.07.2022</p>
            <p>Patterns:</p>
            <ul>
              <li>YYYY for example: 2021</li>
              <li>MM.YYYY for example: 02.2021</li>
              <li>DD.MM.YYYY-DD.MM.YYYY for example: 01.01.2021-01.02.2022</li>
            </ul>
          </div>
          <button onClick={() => fetchData(date)}>Submit</button>
        </div>
      </div>
    </div>
  );
  }
export default App;
