import React, {Fragment} from 'react'
import {connect} from 'react-redux';
import {Container, Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';

import {logout} from '../../store/actions/authActions';

const Header = ({auth, isAuthenticated, logout}) => {
    const authLinks = (
        <Fragment>
            <NavItem className="navbar-text font-weight-bold mr-4 text-uppercase">
                {auth && auth.user ? `${auth.user.firstName} ${auth.user.lastName}` : ''}
            </NavItem>
            <NavItem className="mx-4 border">
                <NavLink onClick={logout}>
                    <i className="fa fa-sign-out"/> Logout
                </NavLink>
            </NavItem>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <NavItem>
                <NavLink href="/signup">
                    Register
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/signin">
                    Login
                </NavLink>
            </NavItem>
        </Fragment>
    );

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">ABC Bank</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Header);
