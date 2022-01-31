import React from "react";
import './App.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import routes from "./config/routes";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index)=> (
          <Route 
          key={index} 
          path={route.path} 
          element={
            <route.layout>
              <route.component/>
            </route.layout>
          } 
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}



export default App;
