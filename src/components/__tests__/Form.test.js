import React from "react";

import { render, cleanup } from "@testing-library/react";

import Form from "components/Appointment/Form";

import { fireEvent } from "@testing-library/react";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  const { getByPlaceholderText } = render(
    <Form interviewers={interviewers} />
  );

  const { getByTestId } = render(
    <Form interviewers={interviewers} name="Lydia Miller-Jones" />
  );

  const { getByText } = render(
    <Form interviewers={interviewers} />
  );
  
  it("renders without student name if not provided", () => {
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
  
    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
  
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
  
    /* 3. Click the save button */
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    /* 1. Create the mock onSave function */
  
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
  
    /* 3. Click the save button */
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});