import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import NewPost from '../components/NewPost'
import Feed from '../components/HomeFeed'
import Search from '../components/Search'


const Home = () => {

if (sessionStorage.getItem('loggedIn') === null) {
   window.location.href = '/'
}

const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div id='home'>
        <div id='home-left'>
            <NavBar setLoggedIn={setLoggedIn}/>
        </div>
        <div id='home-center'>
            <NewPost />
            <Feed loggedIn = {loggedIn} />
        </div>
        <div id='home-right'>
            <Search />
            
        </div>
    </div>
  )
}

export default Home