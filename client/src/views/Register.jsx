import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import arrow from '../components/img/arrow100.png'

const Register = () => {

    const nav = useNavigate();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameExists, setUserNameExists] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordConfirmationError, setPasswordConfirmationError] = useState('')
    const [validationCount, setValidationCount] = useState(0)
    const [fnx, setFnx] = useState(false)
    const [lnx, setLnx] = useState(false)
    const [unx, setUnx] = useState(false)
    const [emx, setEmx] = useState(false)
    const [pwx, setPwx] = useState(false)
    const [pcx, setPcx] = useState(false)


    const firstNameValidations = (e) => {
        setFirstName(e.target.value)
        if(e.target.value.length < 2){
            setFirstNameError('First name must be at least 2 characters')
            
        } else {
            setFirstNameError('')
            setFnx(true)
        }
    }

    const lastNameValidations = (e) => {
        setLastName(e.target.value)
        if(e.target.value.length < 2){
            setLastNameError('Last name must be at least 2 characters')
            setValidationCount(validationCount - 1)
        } else {
            setLastNameError('')
            setLnx(true)
        }
    }

    const usernameValidations = (e) => {
        setUsername(e.target.value)
        if(e.target.value.length < 2){
            setUsernameError('Username must be at least 2 characters')
        } else {
            setUsernameError('')
            setUnx(true)
        }
    }

    const emailregeX = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')

    const emailValidations = (e) => {
        setEmail(e.target.value)
        if (!emailregeX.test(e.target.value)) {
            setEmailError('Email must be a valid email address')
        }
        else {
            setEmailError('')
            setEmx(true)
        }
    }

    const passregeX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{6,}$')
    

    const passwordValidations = (e) => {
        setPassword(e.target.value)
        if (!passregeX.test(e.target.value)) {
            setPasswordError('Password must contain at least one number, one uppercase, one special character, one lowercase letter, and be at least 6 characters long')
        }
        else {
            setPasswordError('')
            setPwx(true)
        }
    }

    const passwordCompare = (e) => {
        setPasswordConfirmation(e.target.value)
        if(e.target.value !== password){
            setPasswordConfirmationError('Passwords do not match')
        } else {
            setPasswordConfirmationError('')
            setPcx(true)
        }
    }

    const registerNewUser = (e) => {

        e.preventDefault()
        const newUser = {
            firstName,
            lastName,
            username,
            email,
            password,
            passwordConfirmation
        }

        axios.get(`http://54.67.59.70/api/users/username/${username}`)
            .then((res) => {
                if (res.data.username === username) {
                    setUserNameExists('username already exists')
                } else {
                    setUserNameExists('')
                    fetch('http://54.67.59.70/api/users/register', {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newUser)
                    }).then((response) => {
                        console.log(response)
                        console.log("new user added")
                        sessionStorage.setItem('loggedIn', email)
                        nav('/home')
                    }).catch(error => {
                        console.log(error)
                    })
                }
            })
            .catch((err) => console.log(err))
    }


  return (
    <div className='middleOfPage'>
        <img src={arrow} height='33'/> 
        <code>join us </code>
        <form onSubmit={registerNewUser} class='centerForm'>
            
            <input type="text" placeholder="first name" required={true} name='firstName' onChange={ firstNameValidations } /><br/>
            <input type="text" placeholder="last name" required={true} name='lastName' onChange={ lastNameValidations } /><br/>
            <input type="text" placeholder="username" required={true} onChange={ usernameValidations } /><br/>
            <input type="text" placeholder="email" required={true} onChange={ emailValidations } /><br/>
            <input type="password" placeholder="password" required={true} onChange={ passwordValidations } /><br/>
            <input type="password" placeholder="confirm password" required={true} onChange={ passwordCompare }/><br/>
            {fnx === true && lnx === true && unx === true && emx === true && pwx === true && pcx === true
            ?
            <button type="submit" style={{marginTop: '10px', marginLeft: '40px'}}>Register</button>
            :
            <button type="submit" style={{marginTop: '10px', marginLeft: '40px'}}
             disabled>Register</button>}
        </form>
        <div style={{display: 'flex', flexDirection: 'column'}}>
        {firstNameError ? <span className='error-text'>{'>>'}{firstNameError}</span> : ''}
        {lastNameError ? <span className='error-text'>{'>>'}{lastNameError}</span> : ''}
        {usernameError ? <span className='error-text'>{'>>'}{usernameError}</span> : ''}
        {usernameExists ? <span className='error-text'>{'>>'}{usernameExists}</span> : ''}
        {emailError ? <span className='error-text'>{'>>'}{emailError}</span> : ''}
        {passwordError ? <span className='error-text'>{'>>'}{passwordError}</span> : ''}
        {passwordConfirmationError ? <span className='error-text'>{'>>'}{passwordConfirmationError}</span> : ''}
        </div>
    </div>
  )
}

export default Register