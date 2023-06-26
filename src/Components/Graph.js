import { useEffect, useState, useRef } from "react"
import {Line, getElementAtEvent} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"
import "./Graph.css"

export const LineChart = ({chartData})=>{
    
    const chartRef = useRef();
    const onClick = (event) => {
        console.log(getElementAtEvent(chartRef.current, event));
    } 
    
    return (<div style={{width: 700}}>
            <Line data={chartData} ref={chartRef} onClick={onClick}/>
        </div>)
}