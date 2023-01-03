import React, { useState } from 'react'
import axios from 'axios'

const NewPost = () => {

const [username, setUsername] = useState('')
const [count, setCount] = useState(0)
const [content, setContent] = useState('')

const charCount = (e) => {
    setCount(e.target.value.length)
    setContent(e.target.value)
}


const handlePost = (e) => {
    e.preventDefault()
    axios.post(`http://54.67.59.70/api/posts/${username}`, {content})
    .then((response) => {
        console.log(response)
        console.log("new post been posted")
        //reload page
        window.location.href = '/home'
    })
    .catch((err) => console.log(err))
}


axios.get(`http://54.67.59.70/api/users/email/${sessionStorage.getItem('loggedIn')}`)
.then((res) => {
    setUsername(res.data.username)
})
.catch((err) => console.log(err))


  return (
    <div id='newPost'>
        <div>
            <code style={{float: 'left'}}>@{username}</code>
            {count > 139 ? <span style={{float: 'right', fontSize: 'x-small', color: 'red'}}>{count}/139</span> : <span style={{float: 'right', fontSize: 'x-small'}}>{count}/139</span>}
        </div>
        <form id='compose' onSubmit={ handlePost }>
            <textarea placeholder='What are you thinking?' rows={'5'} cols={'40'} style={{resize: 'none'}} onChange={ charCount }/>
            {count > 139 ? <button type='submit' disabled style={{width: '80px', alignSelf: 'center'}} >Post</button> : <button type='submit' style={{width: '80px', alignSelf: 'center'}}>Post</button>}
        </form>
    </div>
  )
}

export default NewPost