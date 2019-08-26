import React, {Component} from 'react';
import './Main.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import axios from 'axios';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {adı:'', url:'', request: 'POST', period:'',
            modal:this.props.visible || false, formActive:this.props.formActive,
            current_alert:this.props};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        const url = "http://localhost:8084/alerts";
        axios.get(url).then(response => response.data)
            .then((data) => {
                console.log(data)
            })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            formActive:false
        });
    };


    handleSubmit(event) {
        event.preventDefault();
        const url = "http://localhost:8084/add-alert";
        console.log("submitt");

        alert('request is: ' + this.state.request + "\n" +
            'name is: ' + this.state.adı.enum+ "\n" +
            'url is: ' + this.state.url  + "\n" +
            'period is: ' + this.state.period);

        axios.post(url,
            {
                'name': this.state.adı,
                'url': this.state.url,
                'http_method': this.state.request,
                'period': this.state.period,
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
        this.toggle();
    }


    handleChange(event) {
        console.log("secti-before");
        console.log(this.state.value);

        this.setState({
            [event.target.name]: event.target.value
        });
        console.log("after");
        console.log(event.target.name);
    }

    render() {
        const isValidName = this.state.adı.length > 3;
        const isValidUrl = this.state.url.length > 3;
        return (
            <span className="table-add float-right mb-3 mr-2"><a className="text-light" ><i onClick={this.toggle}
                className="fas fa-plus fa-2x" aria-hidden="true"/>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Request Form</MDBModalHeader>
                    <MDBModalBody>
                        <form className="container"  onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="main">
                                    <p>Name</p>
                                    <p>URL</p>
                                    <p>HTTP Method</p>
                                    <p>Control Period</p>
                                </div>
                                <div className="side">
                                    <label id="input-field">
                                        <input required value={this.state.adı} onChange={this.handleChange} placeholder='Enter Name'
                                               type="text" name="adı" />
                                    </label>
                                    <br/>
                                    <label id="input-field">
                                        <input required value={this.state.url} onChange={this.handleChange} placeholder='Enter URL'
                                               type="text" name="url" />
                                    </label>
                                    <br/>
                                    <label id="input-field">
                                        <select value={this.state.request} onChange={this.handleChange} name="request">
                                            <option value="POST">POST</option>
                                            <option value="GET">GET</option>
                                            <option value="DELETE">DELETE</option>
                                            <option value="UPDATE">UPDATE</option>
                                        </select>
                                    </label>

                                    <br/>
                                    <label id="input-field">
                                        <input required value={this.state.period} onChange={this.handleChange} placeholder='Enter Time'
                                               type="text" name="period" />
                                    </label>
                                    <br/>
                                    <MDBModalFooter style={{margin:2}}>
                                        <MDBBtn  value="Submit" color="pink" type="submit" className="btn-block z-depth-2" >Submit</MDBBtn>
                                        <MDBBtn type="button" color="grey" className="btn-block z-depth-2" onClick={this.toggle}>Cancel</MDBBtn>
                                    </MDBModalFooter>
                                </div>
                            </div>
                        </form>
                    </MDBModalBody>
                </MDBModal>

               </a></span>
        );
    }
}
export default Form;