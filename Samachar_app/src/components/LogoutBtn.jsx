import React from 'react'
import authService from '../appWrite/authService'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const logoutHandler =()=>{
        authService.logout().then(()=>{
            dispatch(logout())
            navigate("/")
        })

    }
    return (
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-red-500 rounded-full'
        onClick={logoutHandler}
        >Logout</button>
      ) 
}
export default LogoutBtn