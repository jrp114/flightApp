import React from 'react';
import { Table, Button } from 'react-bootstrap';

const FlightList = (props) =>
  <div className='container'>
  <h1>Flight Schedule</h1>
    <Table id='flight-table' responsive striped bordered hover>
      <thead>
        <tr>
          <th>Book</th>
          <th>Airline</th>
          <th>Cost</th>
          <th>Number</th>
          <th>From</th>
          <th>Departs</th>
          <th>To</th>
          <th>Arrives</th>
        </tr>
      </thead>
      <tbody>
        { props.flights.map(f =>
          <tr key={f.number}>
            <td><Button onClick={() => props.book(f.number)}>Book Me</Button></td>
            <td>{ f.airline }</td>
            <td>${ f.cost.toFixed(2) }</td>
            <td>{ f.number }</td>
            <td>{ f.departs.airport }</td>
            <td>{ new Date(f.departs.when).toUTCString() }</td>
            <td>{ f.arrives.airport }</td>
            <td>{ new Date(f.arrives.when).toUTCString() }</td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>

  export default FlightList;
