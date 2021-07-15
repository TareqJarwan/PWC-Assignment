import React, {useState} from "react";
import {connect} from "react-redux";
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";

import AddComplaint from "./AddComplaint";
import ShowComplaints from "./ShowComplaints";

const Complaints = ({isAdmin}) => {
    const [activeTab, setActiveTab] = useState("1");

    const toggle = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({active: activeTab === "1"})}
                             onClick={() => toggle("1")}>
                        <i className="fa fa-list"/> Complaints List
                    </NavLink>
                </NavItem>
                {!isAdmin ? (
                    <>
                        <NavItem>
                            <NavLink className={classnames({active: activeTab === "2"})}
                                     onClick={() => toggle("2")}>
                                <i className="fa fa-plus-circle"/> Add Complaint
                            </NavLink>
                        </NavItem>
                    </>
                ) : null}
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <ShowComplaints/>
                        </Col>
                    </Row>
                </TabPane>
                {!isAdmin ?
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <AddComplaint/>
                            </Col>
                        </Row>
                    </TabPane>
                    : null}
            </TabContent>
        </div>
    )
}

const mapStateToProps = state => ({
    isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, null)(Complaints);
