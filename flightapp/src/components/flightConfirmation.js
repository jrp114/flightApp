import React from 'react';
import { Button } from 'react-bootstrap';
// renders page depending on the success condition from the backend
const FlightConfirmation = (props) => {
  if (!props.success) return (
    <div className='container'>
      <h4> {props.message} </h4>
      <Button onClick={props.backHome}>Home</Button>
    </div>
  )
  return(
    <div className='container'>
      <h4> Thanks for booking! Your confirmation number is {props.message} </h4>
      <Button onClick={props.backHome}>Home</Button>
    </div>
  )
}

export default FlightConfirmation;
