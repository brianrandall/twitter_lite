import React from 'react'
import NavBar from '../components/NavBar'
import Search from '../components/Search'
import ProfileEdit from '../components/ProfileEdit'

const EditProfile = () => {

  if (sessionStorage.getItem('id') === null) {
    window.location.href = '/'
 }


  return (
    <div id='home'>
        <div id='home-left'>
            <NavBar />
        </div>
        <div id='home-center'>
            <ProfileEdit />
        </div>
        <div id='home-right'>
            <Search />
        </div>
    </div>
  )
}

export default EditProfile