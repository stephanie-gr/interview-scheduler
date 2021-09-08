import { useState } from "react";
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

  useEffect (() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  const setDay = day => setState({ ...state, day });

  function updateSpots (state, appointments) {
    const dayObj = state.days.find(d => d.name === state.day);
    console.log(dayObj);
    let spots = 0;
    
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      console.log('appt:', appointment);
      if (!appointment.interview) {
        spots++;
      }
    }
  
      console.log("spots = ", spots);
      const newDay = {...dayObj, spots}
  
      const newDays = state.days.map(d => d.name === state.day ? newDay : d)

  
      return newDays;
  }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state, appointments);
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(
      setState({
        ...state,
        appointments,
        days
      })
    )
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

    const days = updateSpots(state, appointments);

    return axios.delete(`/api/appointments/${id}`, {interview})
      .then( () => {
        setState(prev => ({...prev, appointments, days}))

      }
    )
  }

  return { state, setDay, bookInterview, cancelInterview}
}
