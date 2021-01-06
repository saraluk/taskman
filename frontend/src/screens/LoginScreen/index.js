import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../../actions/userActions';
import PageTitle from '../../components/PageTitle';

import './styles.scss'

const LoginPage = ({ history }) => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { error, userInfo} = userLogin
    const [credential, setCredential] = useState({ email: '', password: ''})

    useEffect(() => {
        if(userInfo) {
            history.push('/')
        }
    }, [history, userInfo])

    const loginHandler = async (e) => {
        e.preventDefault();
        dispatch(login(credential.email, credential.password))
    }


    return (
        <div className="loginPage">
            <div className="loginPage__container">
                <PageTitle title="Welcome"/>
                <div className="loginPage__nav">
                    <NavLink to='/login' exact={true} activeClassName='is-active--underline' className="loginPage__nav__item">
                        Log in
                </NavLink>
                    <NavLink to='/signup' exact={true} activeClassName='is-active--underline' className="loginPage__nav__item">
                        Sign up
                </NavLink>
                </div>
                <div className="loginPage__form">
                    <LoginForm loginHandler={loginHandler} credential={credential} setCredential={setCredential} error={error}/>
                </div>
            </div>

        </div>
    )
}

export default LoginPage
