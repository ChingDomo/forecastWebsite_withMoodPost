import React, { useState, useRef } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input
} from 'reactstrap';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';

import { setSearchText } from 'states/post-actions.js'

import './Main.css';

function Main() {
    const [navbarToggle, setNavbarToggle] = useState(false);
    const [searchText, giveSearchText] = useState('');
    const searchEl = useRef(null);

    const dispatch = useDispatch()

    const handleNavbarToggle = () => {
        setNavbarToggle(!navbarToggle);
    };

    const handleSearchKeyPress = (e) => {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            // console.log(e.target.value)
            giveSearchText(e.target.value);
            dispatch(setSearchText(e.target.value))
        }
    };

    const handleClearSearch = () => {
        giveSearchText('');
        dispatch(setSearchText(''))
        searchEl.current.value = '';
    };

    return (
        <Router>
            <div className='main'>
                <div className='bg-faded'>
                    <div className='container'>
                        <Navbar color='faded' light expand>
                            <NavbarToggler onClick={handleNavbarToggle} />
                            <NavbarBrand className='text-info' href="/">WeatherMood</NavbarBrand>
                            <Collapse isOpen={navbarToggle} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to='/'>Today</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                                    </NavItem>
                                </Nav>
                                <div className='search ml-auto'>
                                    <Input className='ml-auto' type='text' innerRef={searchEl} placeholder='Search' onKeyPress={handleSearchKeyPress}></Input>{
                                        searchText &&
                                        <i className='navbar-text fa fa-times' onClick={handleClearSearch}></i>
                                    }
                                </div>
                            </Collapse>
                        </Navbar>
                    </div>
                </div>

                <Route exact path="/" render={() => (
                    <Today searchText={searchText} />
                )} />

                <Route exact path="/forecast" render={() => (
                    <Forecast />
                )} />
                <div className='footer'>
                    DataLab.
                </div>
            </div>
        </Router>
    );
};

export default Main;
