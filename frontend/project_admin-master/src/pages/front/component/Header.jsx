import React, {useState} from 'react';
import "./Header.css"
import {Button, Col, Container, Form, Navbar, Row} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import logo4 from "../img/logo4.png";


import {Link} from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

// logo 테스트
export default function Header() {
    // 로컬 스토리지에서 ACCESS TOKEN 가져오기
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    const [isMyMenuOpen, setIsMyMenuOpen] = useState(false);

    const handleMyMenuToggle = () => {
        setIsMyMenuOpen(!isMyMenuOpen);
    };

    const closeMyMenu = () => {
        setIsMyMenuOpen(false);
    };


    const logout = () => {
        localStorage.setItem("ACCESS_TOKEN", null);
        window.location.href = "/";
    }

    const login = () => {
        window.location.href = "/login";
    }

    return (
        <header className={'header-container'}>
            <Navbar className="headerNav" expand="lg">
                <Container>
                    <Row className="w-100 align-items-center">
                        <Col lg={3} className="offset-2">
                            <div className="logo-container d-flex justify-content-between" style={{marginLeft:"-10px"}}>
                                <img src={logo4} alt="logo4" style={{ padding: "8px" }} />
                                <Link href to="/" className='navbar-brand text-white logo' >스킬라빗</Link>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <Link to={"/search"}>
                                <Form>
                                    <InputGroup>

                                        <Form.Control placeholder="클래스를 찾아보세요!" className="searchBar"/>
                                        <InputGroup.Text className="bg-white search-btn-container">
                                            <Button className="searchBtn btn-outline-light" href={'/viewclass'}>
                                                <BsSearch className="searchIcon"/>
                                            </Button>
                                        </InputGroup.Text>

                                    </InputGroup>
                                </Form>
                            </Link>
                        </Col>

                        <Col lg={1} className="d-flex justify-content-end">
                            <div className="d-ex headerLink mt-2fl">

                                <Dropdown
                                    onMouseEnter={handleMyMenuToggle}
                                    onMouseLeave={closeMyMenu}
                                    show={isMyMenuOpen}
                                >
                                    <Dropdown.Toggle
                                        as={CustomToggle}
                                        id="dropdown-my-menu"
                                        className="my-button"
                                    >
                                        <BsFillPersonFill className="my-icon" style={{color: 'white'}} />
                                        <span className="icon-text my-text" style={{color: 'white'}}>마이</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/myinfo/like">찜목록</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/myinfo/paylist">결재 내역</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>

                        {(accessToken && accessToken !== "null")
                            ?
                            <Col lg={3} className={'d-flex justify-content-end'}>
                                <div className={'d-flex mt-2'}>
                                    <Button className={'btn btn-dark'} onClick={logout}>로그아웃</Button>
                                </div>
                            </Col>
                            :
                            <Col lg={3} className={'d-flex justify-content-end'}>
                                <div className={'d-flex mt-2'}>
                                    <Button className={'btn btn-secondary'} onClick={login}>로그인</Button>
                                </div>
                            </Col>
                        }
                    </Row>
                </Container>
            </Navbar>
        </header>
    );
}

function myInfo() {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </div>
));