import React from 'react';
import "./Header.css"
import {Button, Col, Container, Form, Navbar, Row} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import logo from "../img/logo.png";
import logo2 from "../img/logo2.png";
import logo3 from "../img/logo3.png";
import logo4 from "../img/logo4.png";

import {Link} from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";

// logo 테스트
export default function Header() {
  return (
      <header className={'header-container'}>
          <Navbar className="headerNav" expand="lg">
              <Container>
                  <Row className="w-100 align-items-center">
                      <Col lg={3} className="offset-2">
                          <div className="logo-container d-flex justify-content-between" style={{marginLeft:"-10px"}}>
                              <Link to="/">
                                <img src={logo4} alt="logo4" style={{padding:"8px"}} />
                              </Link>
                              <Link href="/" className='navbar-brand text-white logo'>스킬라빗</Link>
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

                      <Col lg={2} className="d-flex justify-content-end">
                          <div className="d-flex headerLink mt-2" style={{marginRight:"80px"}}>
                              <Link to="/myinfo/like" className="toCartPg">
                                  <div className="icon-text-container">
                                      <BsFillHeartFill />
                                      <span className="icon-text">찜</span>
                                  </div>
                              </Link>
                              <div className="icon-text-container">
                                  <BsFillPersonFill />
                                  <span className="icon-text">마이</span>
                              </div>
                          </div>
                      </Col>
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