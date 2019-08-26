import React, { Component } from 'react';
import Chart from './Chart';
import Form from "./Form";
import Work from "./Work";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BreadcrumbPage from "./Navbar";

class App extends Component {

    render() {
        return (
            <Router>
                <div id="container">
                    <BreadcrumbPage/>

                    <hr />
                    <Switch>
                        <Route exact path='/' component={Form} />
                        <Route path='/list' component={Work} />
                        <Route path='/chart' component={Chart} />
                    </Switch>

                </div>
            </Router>
        );
    }
}

export default App;