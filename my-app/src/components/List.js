import './Work.css';
import React, { useState } from 'react';
import Form from "./Form";
import { MDBBtn } from 'mdbreact';
import axios from "axios";


class Alert extends React.Component {
    state = { formActive: false};

    handleRemove = (alert, alerts) => {
        const id = alert.id;
        console.log(alert.id);
        const url = `http://localhost:8084/alert/`;
        axios.delete(url + id)


            .then(res => {Work.setState(

                {alerts : alerts.filter(function (filter_alert){
                        return (alert.id !== filter_alert.id)
                    } )})

            })
            .catch((err) => {
                console.log(err);
            })
    };
    handleEdit = (alert) => {
        this.setState({formActive: true})
    };

    handleCheck =  (param)  => {
        console.log(param);
        const url = "http://localhost:8084/sendRequest";
        axios.post(url,
            {
                'id':param.id,
                'name': param.name,
                'url': param.url,
                'http_method': param.http_method,
                'period': param.period,
            },{
                "headers": {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
            console.log("reactNativeDemo","response get details:"+response.data);
        })
            .catch((error) => {
                console.log("axios error:",error);
            });
        alert(param.name);
    };

    render () {
        return (
            <tr>
                <td onClick={() => this.handleCheck(this.props)}>{this.props.name}</td>
                <td >{this.props.url}</td>
                <td >{this.props.http_method}</td>
                <td >{this.props.period}</td>
                <td><MDBBtn onClick={() =>this.handleEdit(this.props)} outline rounded size="sm" color="blue" className="px-2">
                    <i className="fas fa-pencil-alt mt-0"/>
                </MDBBtn>{this.state.formActive && <Form current_alert={this.props} formActive={this.state.formActive} visible={true}/>}</td>
                <td><MDBBtn onClick={() => this.handleRemove(this.props, this.props.data.alerts)} outline rounded size="sm" color="red" className="px-2">
                    <i className="fas fa-times mt-0"/></MDBBtn></td>
            </tr>
        )
    }
}

class AlertFilter extends React.Component {
    handleChange (event) {
        this.props.updateSearch(event.target.value);
    }

    render () {
        const value = undefined;
        return (
            <input type="text" placeholder="Find a alert" className="input-search" onChange={this.handleChange.bind(this)} value={this.props.searchText} />
        )
    }
}
class AlertList extends React.Component {

    filter (alerts) {
        if (!this.props.filter) {
            return alerts
        }
        return alerts.filter((alert) => alert.name.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0)
    }
    render () {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Url</th>
                        <th>Method</th>
                        <th>Period</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                </table>
                <div className="scrollbar" id="style-7">

                    <table className="table">
                        <tbody>

                        {   this.filter(this.props.alerts)
                            .map((alert, i) => <Alert id={alert.id} name={alert.name} url={alert.url} http_method={alert.http_method}  period={alert.period} key={i} data={this.props}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText:"",
            alerts: [],
            filter: null
        };
    }

    componentDidMount() {
        fetch("http://localhost:8084/alerts")
            .then(res => res.json())
            .then((data) => {
                this.setState({ alerts: data });
                console.log(this.state.alerts())
            })
            .catch(console.log)
    }

    updateSearch (inputValue) {
        let filter = this.state.filter;

        this.setState({
            filter: inputValue
        });
    }

    render () {
        return (
            <div className="app">
                <h1 className="app__title">Your Alerts</h1>
                <Form/>
                <AlertFilter updateSearch={this.updateSearch.bind(this)} searchText={this.state.filter} />
                <AlertList filter={this.state.filter} alerts={this.state.alerts} data={this.state}/>
            </div>
        );
    }
}
export default List;

