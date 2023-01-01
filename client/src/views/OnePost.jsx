import React from 'react'
import NavBar from '../components/NavBar'
import Search from '../components/Search'
import Post from '../components/Post'

const OnePost = () => {

  return (
    <div id='home'>
        <div id='home-left'>
            <NavBar />
        </div>
        <div id='home-center'>
            <Post />
        </div>
        <div id='home-right'>
            <Search />
        </div>
    </div>
  )
}

export default OnePost