import React, {useEffect, useState} from 'react'
import { deleteUserById, userList } from '../../services/UserService'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { loggedInData } from '../../services/Authentication';

export const GetAllUserComponent = () => 
{
    const [user, setUser] = useState([])
    const [userLoggedIn, setUserLoggedIn] = useState({})

    const nagivator = useNavigate();

    useEffect(()=>
        {
            getAllUser();
        }, [])

    useEffect(() => {
        loggedInData().then(response => {
            setUserLoggedIn(response.data);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    function getAllUser()
    {
        userList().then((respose)=>
        {
            setUser(respose.data);
        }).catch(error => 
            {
                console.error(error);
            })
    }

    function addUser() 
    {
        nagivator('/addUser')
    }
    function updateUser(userID) 
    {
        nagivator(`/updateUser/${userID}`)
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
        <p>{userLoggedIn?.email}--{userLoggedIn?.password}-{userLoggedIn.role?.name}</p>
        <h1 className='text-center'>User(s) List</h1>
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
                                <button className='btn btn-info' onClick={()=>updateUser(user.id)}>Update</button>
                                <button className='btn btn-info' onClick={()=>deleteUser(user.id)}>Delete</button>
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
