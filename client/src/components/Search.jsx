import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Search = () => {

    const [searchFor, setSearchFor]= useState('')
    const [searchResults, setSearchResults] = useState([])
    
    const search = (e) => {
        setSearchFor(e.target.value)
    }

    useEffect(() => {
      axios.get(`http://54.67.59.70/api/users/search/${searchFor}`)
      .then((res) => {
        console.log(res.data)
        setSearchResults(res.data)
      })
      .catch((err) => {console.log(err)}) 
    }, [searchFor])

  return (
    <div>
      
        <textarea placeholder='Search Twitter.lite' onChange={ search } rows={'2'} cols={'20'} style={{resize: 'none'}} />
        <div id='search-results'>
            {searchResults.map((result, i) => {
                return (
                  <div key={i}>
                    <a href={`/profile/${result.username}`}><code>@{result.username}</code></a> 
                    <p style={{fontSize: 'small'}}>{result.firstName} {result.lastName}</p> 
                  </div>
                  
                )
            })}
        </div>
        
    </div>
  )
}

export default Search