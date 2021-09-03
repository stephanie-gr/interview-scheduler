export function getAppointmentsForDay(state, day) {
  let apptArray = [];

  //filter days array in state obj by name of day
  const appts = state.days.filter(oneDay => oneDay.name === day)
  
  //if day has no associated data, return empty apptArray
  if (!appts[0]) {
    return apptArray;
  }

  const filteredApptList = appts[0].appointments;

  //filter appointment obj of state obj by filtered appt list and push appointments with matching id's to our apptArray
  for (let appointment in state.appointments) {
    for (let oneOf of filteredApptList) {
      if (state.appointments[appointment].id === oneOf) {
        apptArray.push(state.appointments[appointment]);
      }
    }
  } return apptArray;
};

 






  

