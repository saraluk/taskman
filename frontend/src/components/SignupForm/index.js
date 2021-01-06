import React from 'react'
import { ButtonRecSolidBlue } from '../Buttons'
import Message from '../Message'
import './styles.scss'

const SignupForm = ({ signupHandler, credential, setCredential, error, message}) => {
    return (
        <form className="signup" onSubmit={signupHandler}>
            <input className="signup__input" type="text" name="name" placeholder="Name" value={credential.name} onChange={(e) => setCredential({...credential, name: e.target.value})}/>
            <input className="signup__input" type="text" name="email" placeholder="Email" value={credential.email} onChange={(e) => setCredential({...credential, email: e.target.value})}/>
            <input className="signup__input" type="password" name="password" placeholder="Password" value={credential.password} onChange={(e) => setCredential({...credential, password: e.target.value})}/>
            <input className="signup__input" type="password" name="confirmPassword" placeholder="Confirm Password" value={credential.confirmPassword} onChange={(e) => setCredential({...credential, confirmPassword: e.target.value})}/>
            <ButtonRecSolidBlue text="Sign up" type="submit"/>
            {message && <Message variant="text--danger">{message}</Message>}
            {error && <Message variant="text--danger">{error}</Message>}
        </form>
    )
}

export default SignupForm
