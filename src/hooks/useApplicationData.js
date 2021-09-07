import React, { useState } from "react";
import { useEffect } from "react";
import "components/Application.scss";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  })

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then((prev => ({...prev, appointments})))
      .then(console.log(state.appointments))
  }

  function cancelInterview(id, interview) {
    const appointment = {  
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });


    axios.delete(`/api/appointments/${id}`, {interview})
      .then((prev => ({...prev, appointments})))
      .then(console.log(state.appointments))

  }

  useEffect (() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])


  const setDay = day => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview}
}