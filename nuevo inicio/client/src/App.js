import React from "react";
import './App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import routes from "./config/routes";

function App() {
  
  return (
    <Router>
      <Routes>
        {routes.map((route, index)=>(
          <RouteWithSubRoutes key={index} {...route} />
        ))}
      </Routes>
    </Router>
  );
}

function RouteWithSubRoutes(route){
  console.log(route);
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.element routes={route.routes} {...props}/>}
    />
  )
}


export default App;
