import React from 'react'
import NavBar from '../components/NavBar'
import ProfileFeed from '../components/ProfileFeed'
import Search from '../components/Search'
import ProfileHeader from '../components/ProfileHeader'

const Home = () => {



  return (
    <div id='home'>
        <div id='home-left'>
            <NavBar />
        </div>
        <div id='home-center'>
            <ProfileHeader />
            <ProfileFeed />
        </div>
        <div id='home-right'>
            <Search />
        </div>
    </div>
  )
}

export default Home