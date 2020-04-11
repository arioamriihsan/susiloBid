import React from 'react'

// style
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const Register = () => {
    return (
        <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 550 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Register Now . It's Free
                    </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' name='username' placeholder='Username'/>
                        <Form.Input fluid icon='home' iconPosition='left' name='address' placeholder='Address'/>
                        <Form.Input fluid icon='phone' iconPosition='left' name='phone' placeholder='Phone Number'/>
                        <Form.Input fluid icon='lock' iconPosition='left' name='password' placeholder='Password' type='password'/>
                        <Form.Input fluid icon='checkmark' iconPosition='left' name='password' placeholder='Confirm Password' type='password'/>
                        <Button color='teal' fluid size='large'>
                            Register
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default Register;