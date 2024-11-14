import React, {useEffect, useState} from 'react'
import { deleteUserById, userList } from '../../services/UserService'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { loggedInData } from '../../services/Authentication';

export const GetAllUserComponent = () => 
{
    const [user, setUser] = useState([])
    const [userLoggedIn, setUserLoggedIn] = useState({})

    const navigator = useNavigate();

    useEffect(()=>
        {
            getAllUser();
        }, [])

    useEffect(() => {
        loggedInData().then(response => {
            setUserLoggedIn(response.data);
        })
        .catch(error => {
            console.error("JWT is expired:", error.response.data);
        });
    }, []);

    function getAllUser()
    {
        userList().then((respose)=>
        {
            setUser(respose.data);
        }).catch(error => 
            {
                console.log(error.response.data);
            })
    }

    function addUser() 
    {
        navigator('/admin/addUser')
    }

    function goBack() 
    {
        navigator('/home')
    }

    function updateUser(userID) 
    {
        navigator(`/updateUser/${userID}`)
    }

    function deleteUser(userID) 
    {
        deleteUserById(userID).then((respose)=>
            {
                getAllUser();
            }).catch(error => 
                {
                    console.error(error);
            })
    }

    
  return (
    <div className='container'>
        <h1 className='text-center'>User(s) List</h1>
        <button className='btn btn-primary' onClick={goBack}>Back to Shop</button>
        <button className='btn btn-primary' onClick={addUser}>Add new User</button>
        <table className='table table-striped table-hover'>
            <thead>
                <tr>
                    <td>User ID</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Email</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {
                    user.map(user =>
                        <tr key={user.id}> 
                            <td> {user.id} </td>
                            <td> {user.firstName} </td>
                            <td> {user.lastName} </td>
                            <td> {user.email} </td>
                            <td>
                                    { user.id !== userLoggedIn.id && (
                                            <>
                                                <button className='btn btn-info' onClick={() => updateUser(user.id)}>Update</button>
                                                <button className='btn btn-danger' onClick={() => deleteUser(user.id)}>Delete</button>
                                            </>
                                        )
                                    }       
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>

    </div>
  )
}

export default GetAllUserComponent
