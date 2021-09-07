import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const ERROR_SAVE ="ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING, true);
    props.book(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  function deleteAppt() {
    transition(DELETE, true);
    
    props.cancel(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }


  return (
    <article className="appointment">

      <Header 
        time={props.time}
      />

      {mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE)} 
        />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteAppt}
          onEdit={() => transition(EDIT)}
        />)}

      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back(EMPTY)} 
          onSave={save}
        />}

      {mode === SAVING && <Status />}

      {mode === CONFIRM && 
        <Confirm 
          onCancel={() => back(SHOW)} 
        />}

      {mode === EDIT && 
        <Form 
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers} 
          onCancel={() => back(SHOW)} 
          name={props.interview.student} 
          onSave={save} 
          />}
          
    </article>
  )
}