import React, { useState } from 'react'
import './Auth.scss'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
function Auth() {
  const [signUp, setSignUp] = useState(false)
  const toggleSignUp = () => setSignUp(!signUp)
  return (
    <div className="form-auth d-flex align-items-center min-vh-100 py-3 py-md-0">
      <BootstrapContainer className="trello-auth-container">
        <div className="trello-auth">
          <Row>
            <Col md={5} style={{ 'padding': 0 }}>
              <img src="https://i.pinimg.com/564x/0d/d3/67/0dd367d0da3ad6d1add2e4fe5a605b98.jpg"
                alt="wallpaper-login"
                className="wallpaper-login-img" />
            </Col>
            <Col md={7} style={{ 'background': '#fff', 'padding': 0 }}>
              <div className="card-body">
                <div className="brand-wrapper">
                  <img src="https://logos-download.com/wp-content/uploads/2016/06/Trello_logo.png"
                    alt="logo-login"
                    className="logo-login" />
                  {!signUp ?
                    <p className="login-card-description">Sign into your account</p>
                    : <p className="login-card-description">Sign up</p>
                  }
                  <Form className="form-action">
                    {signUp &&
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFirstName">
                          <Form.Control placeholder="First name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                          <Form.Control placeholder="Last name" />
                        </Form.Group>
                      </Row>
                    }
                    <Form.Group className="email mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Email address" />
                    </Form.Group>

                    <Form.Group className="password mb-1" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    {signUp &&
                      <Form.Group className="repeat-password mb-3 mt-3" controlId="formBasicRepeatPassword">
                        <Form.Control type="password" placeholder="Repeat Password" />
                      </Form.Group>
                    }
                    {!signUp &&
                      <div className="forgot-password-link">
                        <a href="#!">Forgot password?</a>
                      </div>
                    }
                    <Button type="submit" className="btn btn-block login-btn mb-2">
                      {!signUp ? 'Login' : 'Sign up' }
                    </Button>
                    {!signUp &&
                      <>
                        <div className="login-with">
                          <span>Or login with</span>
                        </div>
                        <div className="login-social">
                          <Row>
                            <Col md={6} xs={6}>
                              <Button className="login-facebook">
                                <i className="fa fa-facebook-f"> Facebook</i>
                              </Button>
                            </Col>
                            <Col md={6} xs={6}>
                              <Button className="login-google">
                                <i className="fa fa-google"> Google</i>
                              </Button>
                            </Col>
                          </Row>
                        </div>
                        <p className="login-card-footer-text"> Don&apos;t have an account?
                          <a className="text-reset" onClick={toggleSignUp}> Register here</a></p>
                      </>
                    }
                    {signUp &&
                      <p className="login-card-footer-text mt-1"> Already have an account?
                        <a className="text-reset" onClick={toggleSignUp}> Login now</a></p>
                    }
                  </Form>

                </div>
              </div>
            </Col>
          </Row>
        </div>
      </BootstrapContainer>
    </div>
  )
}

export default Auth
