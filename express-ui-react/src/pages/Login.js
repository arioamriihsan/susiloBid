import React, {useState} from 'react'
import { Link } from 'react-router-dom';

// API
import { API_URL } from '../support/API_URL';
import Axios from 'axios';

// style
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const Login = () => {
    
    const [formInput, setForm] = useState({
        username : '',
        password : ''
    })
    
    const handleChange = e => {
        setForm({
            ...formInput,
            [e.target.name] : e.target.value
        })
    }
    
    const handleBtn = async () => {
        let { username, password } = formInput
        let res = await Axios.post(`${API_URL}/users/login/`, {username, password})
        console.log(res.data)
    }
    
    console.log(formInput)
    
    return (
    <Grid textAlign='center' style={{ height: '65vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
            </Header>
            <Form size='large'>
                <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' name='username' placeholder='Username' onChange={handleChange}/>
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
            <Message color='teal'>
                New to us? <Link to='/register' style={{textDecoration: 'none'}}>Sign Up </Link>
            </Message>
        </Grid.Column>
    </Grid>
    )
}

export default Login