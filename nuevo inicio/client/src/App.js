import React from "react";
import './App.scss';
import {HashRouter, Route, Routes} from 'react-router-dom';
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProvider";

function App() {
  
  return (
    <AuthProvider> 
      <HashRouter>
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
      </HashRouter>
    </AuthProvider>
    
  );
}



export default App;
