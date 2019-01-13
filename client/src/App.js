import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
    this.db = null;
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

  updateMessage = (event) => {
    this.setState({ message: event.target.value });
    console.log(this.state.message);
  }

  addPhone = () => {
    
    setInterval(function() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          firebase.firestore().collection("phones").doc("12345").set({
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

  render() {
    return (
      <form className="container">
        <input type="text" value={this.state.message} onChange={this.updateMessage} />
        <button type="button" onClick={this.addPhone}>
          Start!
        </button>
      </form>

    );
  }
}

export default App;
