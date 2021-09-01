import React from "react";
import "components/DayListItem.scss";

var classnames = require('classnames');


const formatSpots = function (spots) {
    if (!spots) {
      let spotsRemaining = "no spots remaining";
      return spotsRemaining;
    } 

    if (spots === 1) {
      let spotsRemaining = `1 spot remaining`;
      return spotsRemaining;
    }

    if (spots > 1) {
      let spotsRemaining = `${spots} spots remaining`;
      return spotsRemaining;
    }
}

export default function DayListItem(props) {


  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{formatSpots(props.spots)}</h3>
    </li>
  );
}