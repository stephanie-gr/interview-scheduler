import React from "react";
import "components/InterviewerListItem.scss";
var classnames = require('classnames');

export default function InterviewerListItem (props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass}
      onClick={() => props.setInterviewer(props.name)}
    >
      <img
      className={interviewerClass}
      src={props.avatar}
      alt={props.name}
      />
      {props.name}
    </li>
    )
}