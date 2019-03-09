import React, { Component } from 'react';
import FlightList from './components/flightList';
import BookFlight from './components/bookFlight';
import FlightConfirmation from './components/flightConfirmation';
import validateForm from './validator';

class App extends Component {
  constructor(){
    super();
    this.state = {
      error: '',
      flights: [],
      currentView: () => <FlightList flights={this.state.flights} book={this.bookAFlight} backHome={this.backHome} />
    }
  }
  // grabs list of flighs from the backend
  async grabFlights() {
    const api = 'flights'
    const request = new Request(process.env.REACT_APP_API + api);
     await fetch(request)
      .then(result => result.json())
      .then(data => this.setState({
        flights: data.flights
      }))
    }
  // saves the flight once the user fills out a valid form.
  saveFlight = async (obj) => {
    const { error } = validateForm(obj);
    if (error) {
      const err = await error.message.match(/\[(.*?)\]/).pop()
      return this.setState({
        currentView: () => <BookFlight error={err} flightNum={obj.flight_number} save={this.saveFlight} backHome={this.backHome} />
      });
    }
    const api = 'book';
    const request = new Request(process.env.REACT_APP_API + api, {
      method: 'POST',
      type: 'application/json',
      body: JSON.stringify(obj)
    });
    // grabing the response from the backend post
    let message;
    let success;
    await fetch(request)
      .then(response => response.json())
      .then(data => {
        if (!data.success) message=data.message
        else message=data.confirmation
        success=data.success;
        })
      .catch(err => console.log('ERROR', err.message));
    // set the new currentView state
    this.setState({
      currentView: () => <FlightConfirmation success={success} message={message} backHome={this.backHome} />
    })
  }
  // sends the user back to the flightlist page
  backHome = () =>
    this.setState({
      currentView: () => <FlightList flights={this.state.flights} book={this.bookAFlight}/>
    })
  // user clicks on the Book it button from the flightlist to get sent to the booking form
  bookAFlight = (flightNum) =>
    this.setState({
      currentView: () => <BookFlight flightNum={flightNum} save={this.saveFlight} backHome={this.backHome} />
    })
  // grab the flightlist data and set the error state back to an empty string
  componentWillMount() {
    this.grabFlights();
    this.setState({
      error: '',
    })
  }

  render() {
    return (
      this.state.currentView()
    );
  }
}

export default App;
