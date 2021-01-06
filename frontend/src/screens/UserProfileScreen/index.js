import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import Message from '../../components/Message'
import PageTitle from '../../components/PageTitle'
import './styles.scss'

const UserProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { error, success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if(!user.name) {
        dispatch(getUserDetails())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user]) 


  const submitHandler = (e) => {
    e.preventDefault()
    setMessage(null)
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
        dispatch(updateUserProfile({ name, email, password }))
    }
  }

  return (
    <>
      <PageTitle title={'User Profile'}/>
      {success ? <Message variant="text--success">Profile updated</Message> : <Message variant="text--success-collapse"></Message>}
      <form className="user-profile__form" onSubmit={submitHandler}>
        <div className="user-profile__form__group-input">
          <label>Name</label>
          <input className="user-profile__form__input" type="text" name="name" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="user-profile__form__group-input">
          <label>Email</label>
          <input className="user-profile__form__input" type="text" name="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="user-profile__form__group-input">
          <label>Password</label>
          <input className="user-profile__form__input" type="password" name="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="user-profile__form__group-input">
          <label>Confirm Password</label>
          <input className="user-profile__form__input" type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>
        </div>
        <button className="user-profile__form__button" type="submit">Update</button>
      </form>
      {message && <Message variant="text--danger">{message}</Message>}
      {error && <Message variant="text--danger">{error}</Message>}
    </>
  )
}

export default UserProfileScreen
