import React,{useState,useEffect} from 'react';
import './App.css';
import { Route,  BrowserRouter, Switch } from 'react-router-dom';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import fire from './Config/fire';
import Dashboard from './containers/Dashboard/Dashboard';
import Auth from './Config/Auth';
function App() {
    
  const[setUsers ] = useState({});

  useEffect(() =>{
    authListener();
  },[])

    const authListener = () =>{
      fire.auth().onAuthStateChanged((user) =>{

         if(user) {
           setUsers(user)
         }else{
           setUsers(null)
         }


      })

    }


  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path="/" component={Register} />
      <Route path="/login" component={Login} />

      <Route path="/dashboard" render={(props) => 
      <Auth>
        <Dashboard />
      </Auth>  
    }
       />
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
