import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {onLogoutUser} from '../actions/index'


class Header extends Component {

    state = {
        isOpen : true
    }

    toggle = () => this.setState({isOpen :!this.state.isOpen})

    renderNav = ()=>{
        // jika tidak login
        if(this.props.username == ""){
            return(
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/">Login</NavLink>
                    </NavItem>
                </Nav>   
                        )
        }
        // jika login
            return(
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        {/* pakai this.props karena dari luar dimasukkan ke dalam (state diubah menjadi props?) */}
                        Hello, {this.props.username}
                    </DropdownToggle>
                        <DropdownMenu right>
                            <NavLink tag={Link} to="/tasks">
                                <DropdownItem>Tasks</DropdownItem>
                            </NavLink>
                            <NavLink tag={Link} to="/profile">
                                <DropdownItem>Profile</DropdownItem>
                            </NavLink>
                            <NavLink tag={Link} to="/editprofile">
                                <DropdownItem>Edit Profile</DropdownItem>
                            </NavLink>
                            <DropdownItem divider />
                            <NavLink tag={Link} to="/">
                                <DropdownItem onClick={this.props.onLogoutUser}>logout</DropdownItem>
                            </NavLink>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            )
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand className="text-success" tag={Link} to="/tasks">Todo</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {/* memakai tanda () karena saat komponen ini dibuat kita mau function langsung di running  */}
                        {this.renderNav()}

                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        username : state.auth.username
    }
}

export default connect(mapStateToProps,{onLogoutUser})(Header)
