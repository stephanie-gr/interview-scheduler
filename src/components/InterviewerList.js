import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";



export default function InterviewerList (props) {
  const { interviewers, interviewer, setInterviewer } = props;

  const interviewerMap = interviewers.map(oneInterviewer => (<InterviewerListItem 
    key={oneInterviewer.id}
    name={oneInterviewer.name} 
    avatar={oneInterviewer.avatar}
    selected={oneInterviewer.id === interviewer}
    setInterviewer={() => setInterviewer(oneInterviewer.name)}  
    />))

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerMap}</ul>
    </section>
  )
}