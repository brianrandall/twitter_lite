import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import arrow from '../components/img/arrow100.png'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [tryagain, setTryagain] = useState('')
    const userLogin = {
        email,
        password
    }

    const nav = useNavigate()

    const loginUser = (e) => {
        e.preventDefault()
        console.log(userLogin)
        fetch('http://54.67.59.70/api/users/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userLogin),
            ResponseType: JSON
        })
        .then((response) => {
            console.log(response)
            if (response.status === 200) {
                console.log('login successful')
                sessionStorage.setItem('loggedIn', email)
                nav('/home')
                
            }
            else {
                console.log(response.data)
                setTryagain('try again')
            }
        })
    }

  return (
    <div className='middleOfPage'>
       <img src={arrow} height='33'/> 
        <code>welcome to twitter.lite</code>
        <form onSubmit={loginUser} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px'}}>
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br/>
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br/>
            {tryagain ? <p style={{color: 'red'}}>{tryagain}</p> : ''}
            <button type="submit" style={{marginTop: '10px', marginTop: '5px', width: '100px'}}>Login</button>
        </form>
        

        <div>
            <code>new user? <a href="/register" style={{fontStyle: 'oblique'}}>sign up</a></code>
        </div>
        
    </div>
  )
}

export default Login