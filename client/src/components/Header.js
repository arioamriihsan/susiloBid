import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setModal } from '../redux/action';

// child
import LoginModal from './LoginModal';
import ProfileModal from './ProfileModal';

// style
import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavDropdown, Button } from 'react-bootstrap';
import { CaretDownOutlined } from '@ant-design/icons';
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart, FaWallet } from "react-icons/fa";

// image
import NoName from '../asset/no_profile.jpg';

const Header = () => {
    
    const [modalProfile, setModalProfile] = useState(false);

    const gState = useSelector(({ auth, modal }) => {
        return {
            isLogged: auth.logged,
            uName: auth.username,
            modalShow : modal.modalShow
        };
    });

    const dispatch = useDispatch();

    const { isLogged, uName, modalShow } = gState;

    return (
        <Navbar bg="light" expand="lg" className="p-3">
            <Navbar.Brand className="ml-5 font-weight-bold" style={{ color: '#009C95' }}>SusiloBid</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="mr-5">
                <Nav className="mr-auto">
                    <Nav.Link className="ml-3">
                        <Link to='/' style={{ textDecoration: 'none', color: '#8C8E94' }}>Home</Link>
                    </Nav.Link>
                    <Nav.Link className="ml-3 mr-3">
                        <Link to='/' style={{ textDecoration: 'none', color: '#8C8E94' }}>Link</Link>
                    </Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <div className="input-group d-flex align-items-center mr-5">
                <input type="text" className="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append d-flex align-items-center" >
                        <span className="input-group-text" id="basic-addon2" style={{ height: '2.4rem' }}><IoIosSearch /></span>
                    </div>
            </div>
            <span className='mr-3 input-group-text' style={{ height: '2.4rem' }}><FaShoppingCart /></span>
            <span className='mr-5 input-group-text' style={{ height: '2.4rem' }}><FaWallet /></span>
            {
                !isLogged
                    ?
                    <>
                        <Button className='mr-3 ui teal basic button' onClick={() => dispatch(setModal())}>Login</Button>
                        <Link to='/register'>
                            <Button className='mr-5 ui teal button' variant="outline-success">Register</Button>
                        </Link>
                    </>
                    :
                    <>
                        <img 
                            src={NoName} 
                            alt='No Prof Pict' 
                            className='rounded-circle' 
                            width='58.5rem' height='28.5rem' 
                            style={{ textDecoration: 'none' }}
                            className='mr-3 ml-7'
                        />
                        <h6 className='mr-5 hover-text' style={{ color: '#939393' }} onClick={() => setModalProfile(true)}>{uName} <CaretDownOutlined /></h6>
                    </>
            }
            <LoginModal
                show={modalShow}
                onHide={() => dispatch(setModal())}
            />
            <ProfileModal
                show={modalProfile}
                onHide={() => setModalProfile(false)}
            />
        </Navbar>
    );
};

export default Header;