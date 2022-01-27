import React from "react";
import './App.scss';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

function App() {
  
  return (
  <Router>
    <div className="app">
      <h1>Sistema de rutas basico</h1>
      
      <Route>holas</Route>
      {/* <Route path="/" exact component={Home}/> */}
    </div>
  </Router>
  );
}

function Home (){
  return <h2>Estamos en el inicio</h2>
}
function Contact(){
  return <h2>Componente contacto</h2>
}
function Users(){
  return <h2>Estamos en el componente users</h2>
}

export default App;
