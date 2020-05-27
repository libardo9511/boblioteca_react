import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Books from "./pages/books/books-items.page";
import Readers from "./pages/readers/readers-items.page";
import ReadersType from "./pages/reader_type/reader_type.page";
import ReadersTypeEdit from "./pages/reader_type/reader_type_edit.page";

import NavBar from "./components/navigate/navigate.component";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <div className="container p-4">      
        <Switch>
          <Route path="/books" exact component={Books}></Route> 
          <Route path="/books/:id" exact component={Books}></Route>                             
          <Route path="/readers" exact component={Readers}></Route>
          <Route path="/readerstype" exact component={ReadersType}></Route>
          <Route path="/readerstype/:id" exact component={ReadersTypeEdit}></Route>   
          <Redirect from="/" to="/books"></Redirect>       
        </Switch>
      </div>
    </Router>
  );
}

export default App;
