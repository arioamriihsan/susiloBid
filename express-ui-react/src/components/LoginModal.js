import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

// API
import { API_URL } from '../support/API_URL';
import Axios from 'axios';

// redux
import { useDispatch } from 'react-redux'
import { Login } from '../redux/action/AuthAction';

// style
import { Modal } from 'react-bootstrap'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const LoginModal = props => {

  const [formInput, setForm] = useState({
    username: '',
    password: ''
  })
  const [modal, setModal] = useState(null)
  const [failedLogin, setfailedLogin] = useState(false)

  const dispatch = useDispatch()

  const handleChange = e => {
    setForm({
      ...formInput,
      [e.target.name]: e.target.value
    })
  }

  const handleBtn = async () => {
    // console.log(props)
    let { username, password } = formInput
    let res = await Axios.post(`${API_URL}/users/login/`, { username, password })
    
    // console.log(res.data)
    if (res.data.length !== 0) {
      let { id, username, role } = res.data[0]
      dispatch(Login({
        id,
        username,
        role
      }))
      setModal(props.onHide)
    } else {
      setfailedLogin(true)
    }
  }

  const renderModal = () => {
    return (
      <div>
        {
          !failedLogin
            ?
            <>
              <Modal.Body>
                <Grid textAlign='center' style={{ height: '65vh' }} verticalAlign='middle'>
                  <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                      Login
                    </Header>
                    <Form size='large'>
                      <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' name='username' placeholder='Username' onChange={handleChange} />
                        <Form.Input
                          fluid
                          icon='lock'
                          iconPosition='left'
                          name='password'
                          placeholder='Password'
                          type='password'
                          onChange={handleChange}
                        />
                        <Button color='teal' fluid size='large' onClick={handleBtn}>
                          Login
                        </Button>
                      </Segment>
                    </Form>
                    <Message>
                      Do not have SusiloBid account? <Link to='/register' style={{ textDecoration: 'none', color: '#009C95' }}>Sign Up </Link>
                    </Message>
                  </Grid.Column>
                </Grid>
              </Modal.Body>
            </>
            :
            <>
              <Modal.Header className='d-flex justify-content-center'>
                <Modal.Title className='text-center' style={{ color: '#009C95' }}>Login Failed</Modal.Title>
              </Modal.Header>
              <Modal.Body className='d-flex justify-content-center h2'>Username does not exist</Modal.Body>
              <Modal.Footer className='d-flex justify-content-center'>
                <Button className='ui teal basic button' onClick={() => setfailedLogin(false)}>
                  Try Again
                </Button>
                <Link to='/register'>
                  <Button className='ui teal button' onClick={props.onHide}>
                    Register
                  </Button>
                </Link>
              </Modal.Footer>
            </>
        }
      </div>
    )
  }

  // console.log(formInput)

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      {renderModal()}
    </Modal>
  )
}

export default LoginModal