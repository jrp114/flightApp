import React from 'react';
import { Button, Row } from 'react-bootstrap';
// user form to fill in for booking a flight.
const BookFlight = (props) =>
<div className='container'>
  <h1>Book Flight #{props.flightNum}</h1>

  <div id='submit-form'>
    <div id='validation-error'>{ props.error }</div>
    <form id='book-flight'>
      <Row>
        <label>First Name</label>
        <input id='first' placeholder='First name here' />
      </Row>
      <Row>
        <label>Last Name</label>
        <input id='last' placeholder='Last name here' />
      </Row>
      <Row>
        <label>Luggage</label>
        <input id='bags' placeholder='Number of bags' />
      </Row>
    </form>
    <div id='button-group'>
    <button onClick={() =>
        props.save({
          first_name: document.getElementById('first').value,
          last_name: document.getElementById('last').value,
          bags: document.getElementById('bags').value,
          flight_number: props.flightNum
        })}>Submit</button>
    <button onClick={props.backHome}>Home</button>
    </div>
  </div>
  </div>

export default BookFlight;
