import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      users: [],
      coords: [],
      message: "",
      closeUsers: [],
      distance: 100
    }
  }

  componentDidMount() {
    const config = {
      apiKey: "AIzaSyCdfKsagen0HrHGvIrCc-hGiNaQ8Pm2b9c",
      authDomain: "sb-hacks-2019-228405.firebaseapp.com",
      databaseURL: "https://sb-hacks-2019-228405.firebaseio.com",
      projectId: "sb-hacks-2019-228405",
      storageBucket: "sb-hacks-2019-228405.appspot.com",
      messagingSenderId: "38962198313"
    };
    firebase.initializeApp(config);
  }

  componentDidUpdate(props) {
    if (this.state.users !== props.users && this.state.coords !== props.coords && this.state.message !== props.message) {
      this.sendText();
    }
  }

  updateNumber = (event) => {
    this.setState({ number: event.target.value });
    //console.log(this.state.message);
  }

  updateMessage = (event) => {
    this.setState ({ message: event.target.value});
  }

  addPhone = () => {
    //console.log(this.state.message);
    let number = this.state.number;
    if (!number || number.length < 10) {
      alert("Please enter a valid phone number");
    } else {
      setInterval(function() {
        console.log(number);
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(function(position) {
            firebase.firestore().collection("phones").doc(number).set({
              lat: position.coords.latitude,
              long: position.coords.longitude
            })
              .then(function() {
                  console.log("Document successfully written!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
          });
        } else {
          console.log("Geolocation'nt")
        }
      }, 3000);
    }
  }

  getCoords = () => {
    let curCoords = [];
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        curCoords.push(position.coords.latitude);
        curCoords.push(position.coords.longitude);
      })
      this.setState({
        coords: curCoords
      })
    } else {
      console.log("Couldn't get current coordinates");
    }
  }

  getUsers = () => {
    let newUsers =[];

    firebase.firestore().collection("phones").get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function(doc) {
          newUsers.push([doc.id,doc.data()]);
        })
        //console.log(newUsers);
      })
      .catch(function(error){
        console.log("Error in getting users: ", error);
      });

    //console.log("newUsers: ", newUsers);
    this.setState({
      users: newUsers
    })
  }

  getInfo =() => {
    this.getCoords();
    this.getUsers();
  }

  getCloseUsers = (coords, users) => {

  }

  sendText = () => {
    let coords = this.state.coords;
    let users = this.state.users;
    let msg = this.state.message;
    this.getCloseUsers(coords, users);
  }

  render() {
    return (
      <div className="container">
        <form className="container form-group">
          <h2> Please enter your phone number below with only numbers (e.g. 3214567890) </h2>
          <input type="text" value={this.state.number} onChange={this.updateNumber} /><br/>
          <button className="btn btn-primary" type="button" onClick={this.addPhone}>
            Sign Up!
          </button>
        </form>
        <form className="container form-group">
          <h2> Please enter your message here </h2>
          <input type="text" value={this.state.message} onChange={this.updateMessage} /><br/>
          <button className="btn btn-primary" type="button" onClick={this.getInfo}>
            Start!
          </button>
        </form>

      </div>

    );
  }
}

export default App;
