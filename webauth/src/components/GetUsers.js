import React from 'react'
import User from './User.js'
import Axios from 'axios';

const GetUsers = (props) => {

    const logoutClick = (event) => {
        event.preventDefault()
        Axios.delete('http://localhost:4000/api/auth/logout')
        .then(() => {
            props.history.push('/login')
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <button onClick = {logoutClick}>Logout</button>
            <ul >
                {props.users.map(user => (
                    <User
                        user = {user}
                        key = {user.id}
                    />

                ))}
            </ul>
        </div>
    )
}
export default GetUsers