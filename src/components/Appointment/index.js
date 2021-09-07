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

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    console.log('id:', props.id);
    transition(SAVING);

    props.book(props.id, interview);
  

    transition(SHOW);
  }

  function deleteAppt() {
    const interview = null;

    //TRANSITIONS ARE NOT WORKING
    transition(CONFIRM);

    props.cancel(props.id, interview);

    transition(EMPTY);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteAppt}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save}/>}
      {mode === SAVING && <Status />}
      {mode === CONFIRM && <Confirm onCancel={() => back(SHOW)} />}
      {mode === EDIT && 
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back(SHOW)} 
          name={props.interview.student} 
          onSave={save} 
          />}
    </article>
  )
}