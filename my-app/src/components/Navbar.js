import React from "react";
import {MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer} from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {Link} from "react-router-dom";

const BreadcrumbPage = props => {
    return (
        <MDBContainer>
            <MDBBreadcrumb light color="blue lighten-3">
                <MDBBreadcrumbItem icon="star"><Link to={'/'} > Form </Link></MDBBreadcrumbItem>
                <MDBBreadcrumbItem><Link to={'/list'} >List</Link></MDBBreadcrumbItem>
                <MDBBreadcrumbItem ><Link to={'/chart'} >Chart</Link></MDBBreadcrumbItem>
            </MDBBreadcrumb>
        </MDBContainer>
    );
};

export default BreadcrumbPage;