import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addUser, getUserById, updateUser } from '../../services/UserService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Add_EditUserComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const [errors, setErrors] = useState(
        {
            firstName: '',
            lastName: '',
            email: ''
        }
    )

    const nagivator = useNavigate();

    const {id} = useParams();



    useEffect(() => {
        if (id)
        {
            getUserById(id).then((respose)=>
            {
                setFirstName(respose.data.firstName);
                setLastName(respose.data.lastName);
                setEmail(respose.data.email);
            }).catch(error => 
                {
                    console.error(error);
                })
        }
    },[id])

    function validateEmailInput(emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput)) return true; else return false;
    }

    function validate()
    {
        let valid = true;
        const errorsCopy = {
            firstName: '',
            lastName: '',
            email: ''
        };
        if (firstName.trim() == false)
        {
            errorsCopy.firstName = 'First name is required!';
            valid = false;
        }
        else 
        {
            errorsCopy.firstName = '';
        }

        if (lastName.trim() == false)
        {
            errorsCopy.lastName = 'Last name is required!';
            valid = false;
        }
        else
        {
            errorsCopy.lastName = '';
        }

        if (email.trim() == false)
        {
            errorsCopy.email = 'Email is required!';
            valid = false;
        }
        else if (validateEmailInput(email) == false)
        {
            errorsCopy.email = 'Invalid email!';
            valid = false;
        }
        else
        {
            errorsCopy.email = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    function add_editUser(e)
    {
        e.preventDefault();
        if (validate())
        {
            if (id)
            {
                const newUserInfo = {firstName, lastName, email}
                updateUser(id,newUserInfo).then((response) =>
                {
                    
                    nagivator('/');
                    console.log(response.data);
                }).catch(error => 
                    {
                        const errorsCopy = {... errors};
                        errorsCopy.firstName = "";
                        errorsCopy.lastName = "";
                        errorsCopy.email = "Email has been used!";
                        setErrors(errorsCopy);
                        console.error(error);
                    })
            }
            else
            {
                const newUser = {firstName, lastName, email}
                addUser(newUser).then((response) =>
                {
                    nagivator('/');
                    console.log(response.data);
                }).catch(error => 
                    {
                        const errorsCopy = {... errors};
                        errorsCopy.firstName = "";
                        errorsCopy.lastName = "";
                        errorsCopy.email = "Email has been used!";
                        setErrors(errorsCopy);
                        console.error(error);
                    })
            }
            
        }
    }

    function goBack()
    {
        nagivator('/');
    }

    function pageTitle()
    {
        if (id) return <h2 className='text-center'>Update User Form</h2>
        else return <h2 className='text-center'>Add User Form</h2>
    }

    return (
        <div className='container'>
        <br></br>
        <br></br>
        <br></br>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 mb-5'>
                    <br></br>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-3'>
                                <label className='form-label'>User's first name:</label>
                                <input 
                                    type='text'
                                    placeholder='Enter user&apos;s first name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control mb-2 ${ errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                >
                                </input>
                                { errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                                <label className='form-label'>User's last name:</label>
                                <input 
                                    type='text'
                                    placeholder='Enter user&apos;s last name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control mb-2 ${ errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                >
                                </input>
                                { errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                                <label className='form-label'>User's email:</label>
                                <input 
                                    type='text'
                                    placeholder='Enter user&apos;s email'
                                    name='email'
                                    value={email}
                                    className={`form-control mb-2 ${ errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                                { errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                            </div>
                            <button className='btn btn-primary' onClick={goBack}>Go Back</button>
                            <button className='btn btn-success float-end' onClick={add_editUser}>Submit</button>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add_EditUserComponent