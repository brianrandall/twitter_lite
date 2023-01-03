import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import loc from '../components/img/location-icon.png'
import cal from '../components/img/calendar-icon.png'

const ProfileHeader = () => {
    const {username} = useParams()
    const [user, setUser] = useState([])
    const [following, setFollowing] = useState([])
    const [loggedInUserFollowing, setLoggedInUserFollowing] = useState([])
    const [action, setAction] = useState(false)

    useEffect(() => {
        axios.get(`http://54.67.59.70/api/users/username/${username}`)
        
        .then((res) => {
            console.log(res.data)
            setUser(res.data)
            setFollowing(res.data.followings)
        })
        .catch((err) => console.log(err))

        axios.get(`http://54.67.59.70/api/users/${sessionStorage.getItem('id')}`)
        .then((res) => {
            console.log(res.data)
            setLoggedInUserFollowing(JSON.stringify(res.data.followings))
        })
        .catch((err) => console.log(err))

    }, [action])

    const follow = () => {
        console.log(user.id)
        axios.post(`http://54.67.59.70/api/users/${sessionStorage.getItem('id')}/follows/new-follow`, {
            followingId: user.id
        })
        .then((res) => {
            console.log(res.data)
            setAction(!action)
        })
        .catch((err) => console.log(err))
    }

    const unfollow = () => {
        axios.delete(`http://54.67.59.70/api/users/${sessionStorage.getItem('id')}/follows/delete/${user.id}`)
        .then((res) => {
            console.log(res.data)
            setAction(!action)
        })
        .catch((err) => console.log(err))
    }

    const checkWhoIsLoggedIn = () => {
        if (sessionStorage.getItem('id') != user.id) {
            return checkIfFollowing() ? <Link onClick={ unfollow}>Unfollow @{user.username}</Link> : <Link onClick={ follow }>Follow @{user.username}</Link>
        } else {
            return false
        }
    }

    const checkIfFollowing = () => {
        if (loggedInUserFollowing.includes(user.id)) {
            return true
        } else {
            return false
        }
    }
    console.log(loggedInUserFollowing)
  return (
    <div id='profile-header'>
        <span>{user.firstName} {user.lastName}</span>
        <span style={{color: 'pink', marginBottom: '1em'}}>@{user.username}</span>
        {user.bio ? <p style={{fontStyle: 'oblique', float: 'left', fontSize: 'small'}}>{user.bio} </p> : null}
        <div style={{fontSize: 'x-small'}}>
        <img src={loc} style={{filter: 'invert(.9)'}} height='10px'/>
            {user.location ?  <span>{user.location}</span> : null} // 
            <img src={cal} style={{filter: 'invert(.9)', marginRight: '3px'}} height='10px'/>
            <span >Joined {`${new Date(user.createdAt).toLocaleDateString('default', {day: 'numeric', year: 'numeric', month:'short'})} `}</span>
        </div>
        <span>
        {checkWhoIsLoggedIn()}
        </span>
        <span>
            {following.length} Following 
        </span>
    </div>
  )
}

export default ProfileHeader