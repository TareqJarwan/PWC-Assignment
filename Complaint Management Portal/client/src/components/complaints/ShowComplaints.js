import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Table} from "reactstrap";
import classNames from "classnames";

import {formatDate} from '../../utils/utility';

import {acceptComplaint, getComplaints, getUserComplaints, rejectComplaint} from "../../store/actions/complaintActions";

const ShowComplaints = ({getUserComplaints, acceptComplaint, isAdmin, rejectComplaint, getComplaints, complaints}) => {
    useEffect(() => {
        if (isAdmin) {
            getComplaints();
        } else {
            getUserComplaints();
        }
    }, [getUserComplaints, isAdmin]);

    return (
        <div className="container h-100">
            <div className="jumbotron my-5">
                <div className="panel-body m-5 text-center mx-auto">
                    <div className="row mt-5 mb-3">
                        <h3 className="text-center">Complaints List</h3>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Created Date</th>
                            <th>Message</th>
                            <th>Status</th>
                            {isAdmin ? <th>Actions</th> : null}
                        </tr>
                        </thead>
                        <tbody>
                        {complaints.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.firstName} {item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{formatDate(new Date(item.date))}</td>
                                <td>{item.message}</td>
                                <td className={classNames(
                                    {"text-info": item.status === "pending"},
                                    {"text-success": item.status === "accept"},
                                    {"text-danger": item.status === "reject"})}>
                                    {item.status}
                                </td>
                                {isAdmin ? <td>
                                    <button className="btn btn-success m-1" onClick={() => {
                                        acceptComplaint(item._id);
                                    }}>
                                        <i className="fa fa-check"/>
                                    </button>
                                    <button className="btn btn-danger m-1" onClick={() => {
                                        rejectComplaint(item._id)
                                    }}>
                                        <i className="fa fa-times"/>
                                    </button>
                                </td> : null}
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    complaints: state.complaint.complaints,
    isAdmin: state.auth.isAdmin,
    error: state.error
});

export default connect(mapStateToProps, {
    getUserComplaints,
    getComplaints,
    acceptComplaint,
    rejectComplaint
})(ShowComplaints);
