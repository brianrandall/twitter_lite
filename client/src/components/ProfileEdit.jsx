import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import loc from '../components/img/location-icon.png'
import cal from '../components/img/calendar-icon.png'

const ProfileEdit = () => {
    
    const {id} = useParams()
    const [user, setUser] = useState([])
    const [following, setFollowing] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [successmsg, setSuccessmsg] = useState('')

    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [bioError, setBioError] = useState('')
    const [locationError, setLocationError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [userNameExists, setUserNameExists] = useState('')
    const [fnx, setFnx] = useState(true)
    const [lnx, setLnx] = useState(true)
    const [bnx, setBnx] = useState(true)
    const [lcx, setLcx] = useState(true)
    const [unx, setUnx] = useState(true)
    const [emx, setEmx] = useState(true)
    const [pwx, setPwx] = useState(true)
    const [pcx, setPcx] = useState(true)

    const firstNameValidations = (e) => {
        setFirstName(e.target.value)
        if(e.target.value.length < 2){
            setFirstNameError('First name must be at least 2 characters')
            setFnx(false)
        } else {
            setFirstNameError('')
            setFnx(true)
        }
    }

    const lastNameValidations = (e) => {
        setLastName(e.target.value)
        if(e.target.value.length < 2){
            setLastNameError('Last name must be at least 2 characters')
            setLnx(false)
        } else {
            setLastNameError('')
            setLnx(true)
        }
    }

    const usernameValidations = (e) => {
        setUsername(e.target.value)
        if(e.target.value.length < 2){
            setUsernameError('Username must be at least 2 characters')
            setUnx(false)
        } else {
            setUsernameError('')
            setUnx(true)
        }
    }

    const bioValidations = (e) => {
        setBio(e.target.value)
        if(e.target.value.length > 99){
            setBioError('Bio must be less than 99 characters')
            setBnx(false)
        } else {
            setBioError('')
            setBnx(true)
        }
    }
    
    const locationValidations = (e) => {
        setLocation(e.target.value)
        if(e.target.value.length > 69){
            setLocationError('Location must be less than 69 characters')
            setLcx(false)
        } else {
            setLocationError('')
            setLcx(true)
        }
    }

    const emailregeX = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')

    const emailValidations = (e) => {
        setEmail(e.target.value)
        if (!emailregeX.test(e.target.value)) {
            setEmailError('Email must be a valid email address')
            setEmx(false)
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
            setPwx(false)
        }
        else {
            setPasswordError('')
            setPwx(true)
        }
    }

    const passwordCompare = (e) => {
        setConfirmPassword(e.target.value)
        if (e.target.value !== password) {
            setConfirmPasswordError('Passwords do not match!!!!!!!!!!')
            setPcx(false)
        }
        else {
            setConfirmPasswordError('')
            setPcx(true)
        }
    }

    useEffect(() => {
        axios.get(`http://54.67.59.70/api/users/${id}`)
        .then((res) => {
            console.log(res.data)
            
            setUser(res.data)
            setFirstName(res.data.firstName)
            setLastName(res.data.lastName)
            setUsername(res.data.username)
            setEmail(res.data.email)
            setBio(res.data.bio)
            setLocation(res.data.location)
            setFollowing(res.data.followings)
        })
        .catch((err) => console.log(err))
    }, [id])


    const updateUser = (e) => {
        e.preventDefault()


        axios.put(`http://54.67.59.70/api/users/edit/${id}`,
            {firstName,
            lastName,
            email,
            username,
            bio,
            location,
            password}
        )
        .then((res) => {
            console.log(res.data)
            setSuccessmsg(res.data)
        })
        .catch((err) => console.log(err))
    }

    const checkIfLoggedIn = () => {
        if (sessionStorage.getItem('loggedIn') === user.email) {
            return true
        } else {
            return false
        }
    }

  return (
    <div>
    <div id='profile-header'>
        <span>{firstName} {lastName}</span>
        <span style={{color: 'pink', marginBottom: '1em'}}>@{username}</span>
        {user.bio ? <p style={{fontStyle: 'oblique', float: 'left', fontSize: 'small'}}>{bio} </p> : null}
        <div style={{fontSize: 'x-small'}}>
        <img src={loc} style={{filter: 'invert(.9)'}} height='10px' alt='loc'/>
            {location ?  <span>{location}</span> : null}{' // '} 
            <img src={cal} style={{filter: 'invert(.9)', marginRight: '3px'}} height='10px' alt='cal'/>
            <span >Joined {`${new Date(user.createdAt).toLocaleDateString('default', {day: 'numeric', year: 'numeric', month:'short'})} `}</span>
        </div>
        <span>
            {following.length} Following 
        </span>
    </div>
    <hr/>
    {checkIfLoggedIn() ? <div>
        <form className='editForm' onSubmit={updateUser}>
            <div className='row'>
                <div>
                    <p>First Name</p>
                    <input type={'text'} value={firstName} onChange={ firstNameValidations }/>
                </div>
                <div>
                <p>Last Name</p>
                    <input type={'text'} value={lastName} onChange={ lastNameValidations }/>
                </div>
                <div>
                <p>@username</p>
                    <input type={'text'} value={username} onChange={ usernameValidations }/>
                </div>
            </div>
            <div>
                <p>
                    Bio
                </p>
                <textarea value={bio} rows={'4'} cols={'58'} style={{resize: 'none'}} onChange={ bioValidations }/>
            </div>
            <div className='row'>
                <div>
                    <p>Location</p>
                    <textarea value={location} rows={'1'} cols={'25'} style={{resize: 'none'}} onChange={ locationValidations }/>
                </div>
                <div>
                    <p>Email</p>
                    <textarea value={email} rows={'1'} cols={'26'} style={{resize: 'none'}} onChange={ emailValidations }/>
                    </div>
            </div>
            <div className='row'>
                <div>
                    <p>Member Since</p>
                    <input type={'text'} value={`${new Date(user.createdAt).toLocaleDateString('default', {day: 'numeric', year: 'numeric', month:'short'})} `} disabled/>
                </div>
                <div>
                    <p>New Password</p>
                    <input type={'password'} value={password}  onChange={ passwordValidations }/>
                </div>
                <div>
                    <p>New Password x2</p>
                    <input type={'password'} value={confirmPassword} onChange={ passwordCompare }/>
                </div>
            </div>
            <div className='editForm'>
                {fnx === true && lnx === true && unx === true && bnx === true && lcx === true && emx === true && pcx === true && pwx === true ? <button type={'submit'} style={{marginLeft: '200px'}}>Update</button> : 
                <button type={'submit'} disabled>Update</button>}
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
            {firstNameError ? <span className='error-text'>{ ' >> '}{firstNameError}</span> : null}
            {lastNameError ? <span className='error-text'>{ ' >> '}{lastNameError}</span> : null}
            {usernameError ? <span className='error-text'>{ ' >> '}{usernameError}</span> : null}
            {bioError ? <span className='error-text'>{ ' >> '}{bioError}</span> : null}
            {locationError ? <span className='error-text'>{ ' >> '}{locationError}</span> : null}
            {emailError ? <span className='error-text'>{ ' >> '}{emailError}</span> : null}
            {passwordError ? <span className='error-text'>{ ' >> '}{passwordError}</span> : null}
            {confirmPasswordError ? <span className='error-text'>{ ' >> '}{confirmPasswordError}</span> : null}
            {userNameExists ? <span className='error-text'>{ ' >> '}{userNameExists}</span> : null}
            {successmsg ? <code>user info updated { '>>' } <Link to={`/profile/${username}`}>view profile</Link>{ ' >> '}<Link to={'/home'}>home</Link></code> : null}
            </div>
        </form>
    </div> : null}
    </div>
  )
}

export default ProfileEdit