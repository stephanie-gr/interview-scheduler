import React from "react";
import "components/DayListItem.scss";

var classnames = require('classnames');


export default function DayListItem(props) {
  const formatSpots = function () {

    if (!props.spots) {
      let spotsRemaining = "No spots remaining";
      return spotsRemaining;
    } 

    if (props.spots > 0) {
      let spotsRemaining = `${props.spots} spots remaining`;
      return spotsRemaining;
    }
  }


  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{formatSpots()}</h3>
    </li>
  );
}