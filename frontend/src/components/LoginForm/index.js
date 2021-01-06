import React from 'react';
import { ButtonRecSolidBlue } from '../Buttons';
import Message from '../Message'
import './styles.scss'

const LoginForm = ({ loginHandler, credential, setCredential, error}) => {
    return (
        <form onSubmit={loginHandler} className="login" >
            <input className="login__input" type="text" name="email" placeholder="Email" value={credential.email} onChange={(e) => setCredential({...credential, email: e.target.value})}/>
            <input className="login__input" type="password" name="password" placeholder="Password" value={credential.password} onChange={(e) => setCredential({...credential, password: e.target.value})}/>          
            <ButtonRecSolidBlue text="Login" type="submit"/>
            {error && <Message variant='text--danger'>{error}</Message>}
        </form>
    )
}

export default LoginForm
