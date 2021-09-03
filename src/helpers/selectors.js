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

export function getInterview(state, interview) {
  let totalInterview = {}

  if (!interview) {
    return null;
  }

  for (let interviewer in state.interviewers) {
    if (interviewer == interview.interviewer) {
      totalInterview.student = interview.student;
      totalInterview.interviewer = state.interviewers[interviewer];
    }
  } return totalInterview;
}




