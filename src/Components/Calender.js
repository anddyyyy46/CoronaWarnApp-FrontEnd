import { useEffect, useState } from "react"
import "./Calender.css"

export const Calender = ()=>{
    const monthsDays = [{month: "January", days: 31}, {month: "February", days: 28}, {month: "March", days: 31}, {month: "April", days: 30}, {month: "May", days: 31}, 
    {month: "June", days: 30}, {month: "July", days: 31}, {month: "August", days: 31}, {month: "September",days: 30}, {month: "October",days: 31},
    {month: "November", days: 30}, {month: "December", days: 31}]
    
    const [monthNumber, setMonthNumber] = useState(1)

    useEffect(()=>{
        getDays(monthNumber)
    },[])

    const getDays = (monthNum) =>{
        let numbers = []
        for (let i = 1; i <= monthsDays[monthNum].days; i++) {
            numbers.push(i)
            
        }
        return numbers;
    }

    

    return (<div> 
        <h3>back</h3>
        <h3>{monthsDays[monthNumber].month}</h3>
        <h3>next</h3>
        <div className="keine">
                {getDays(monthNumber).map((num)=> <div className={num/7==5?"ahha": "haha"}>{num}</div>)}
        </div>
        
    </div>)
}