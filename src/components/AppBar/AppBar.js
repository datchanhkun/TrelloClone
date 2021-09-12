import React from 'react'
import { Container as BootstrapContainer, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import './AppBar.scss'

function AppBar() {
  return (
    <nav className="navbar-app">
      <BootstrapContainer className="trello-appbar-container">
        <Row>
          <Col sm={5} xs={4} className="col-no-padding">
            <div className="app-actions">
              <div className="item all"><i className="fa fa-th" /></div>
              <div className="item home"><i className="fa fa-home" /></div>
              <div className="item boards"><i className="fa fa-columns" /></div>
              <div className="item search">
                <InputGroup className="group-search">
                  <FormControl className="input-search" placeholder="Search...." />
                  <InputGroup.Text className="input-icon-search"><i className="fa fa-search" /></InputGroup.Text>
                </InputGroup>
              </div>
            </div>
          </Col>
          <Col sm={2} xs={4} className="col-no-padding">
            <div className="app-branding text-center">
              <a target="blank">
                <img
                  src="https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif"
                  className="top-logo"
                  alt="trello-logo"
                />
              </a>
            </div>
          </Col>
          <Col sm={5} xs={4}>
            <div className="user-actions">
              <div className="item quick"><i className="fa fa-plus-square-o" /></div>
              <div className="item news"><i className="fa fa-info-circle" /></div>
              <div className="item notification"><i className="fa fa-bell-o" /></div>
              <div className="item user-avatar">
                <img
                  src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/117241906_1591552187672471_8521985825544730116_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=KIO8r-lrkZwAX-l8ew1&_nc_ht=scontent.fsgn5-5.fna&oh=0d33f1f319816a5eec29426169d5a980&oe=6160A2A6"
                  alt="avt-fb"
                  title="avatar-facebook"
                />
              </div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  )
}

export default AppBar
