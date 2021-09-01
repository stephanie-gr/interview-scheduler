import React from "react";
import DayListItem from "./DayListItem";



export default function DayList (props) {
  const { day, days, setDay} = props;

  const dayMap = days.map(oneDay => (<DayListItem 
    key={oneDay.id}
    name={oneDay.name} 
    spots={oneDay.spots} 
    selected={oneDay.name == props.day}
    setDay={() => setDay(day.name)}  
    />))

  return (
    <ul>
      {dayMap}
    </ul>
  )
}
      

