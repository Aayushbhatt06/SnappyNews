// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';

import React, { Component } from 'react'
import News from './components/News';

export default class App extends Component {
  c = 3
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <News country = "india" pageSize="20"  />
      </div>
    )
  }
}
