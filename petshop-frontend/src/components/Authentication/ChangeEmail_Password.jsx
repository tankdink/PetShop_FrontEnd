import { useNavigate } from 'react-router-dom'
import React, {useEffect, useState, useRef, useReducer} from 'react'
import { authentication } from '../../services/Authentication'
import { toast } from 'react-toastify';
import { useAuthorz } from '../contexts/AuthorzContext';
import { loggedInData } from '../../services/Authentication';
import { useLocation } from 'react-router-dom';
import { updateUser, updateUserPassword } from '../../services/UserService';

const ChangeEmail_PasswordComponent = () => {

    const { userLoggedIn_ , setUserLoggedIn_ } = useAuthorz();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [errors, setErrors] = useState(
        {
            email: '',
            password: '',
            newPassword: '',
            rePassword: ''
        }
    )
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isAuthen, setIsAuthen] = useState(false);
    const navigator = useNavigate();
    const location = useLocation();
    const isChangeEmailRoute = location.pathname === '/changeEmail';  

    // useEffect(() => {
    //     if (userLoggedIn_ && userLoggedIn_.email) {
    //         setFirstName(userLoggedIn_.firstName);
    //         setLastName(userLoggedIn_.lastName);
    //         setEmail(userLoggedIn_.email);
    //     }
    // }, [userLoggedIn_]);

        useEffect(() => {
            
            setFirstName(userLoggedIn_.firstName);
            setLastName(userLoggedIn_.lastName);
            setEmail(userLoggedIn_.email);
            
        }, [userLoggedIn_]);


    function goBack()
    {
        navigator("/home");
    }

    function authenticate(e)
    {
        e.preventDefault();
        const userInfo = {email , password}
        authentication(userInfo).then((response) =>
            {
                localStorage.setItem('jwtToken', JSON.stringify(response.data.jwt));
                setIsAuthen(true);
                const errorsCopy = {... errors};
                errorsCopy.password = "";
                setErrors(errorsCopy);
            }).catch(error => {
                const errorsCopy = {... errors};
                errorsCopy.password = "Wrong password!";
                setErrors(errorsCopy);
            })
    }

    function editEmail(e)
    {
        e.preventDefault();
        if (validateEmail())
        {
            const updatedUserInfo = {firstName : firstName.trim(), lastName : lastName.trim() , email : newEmail.trim()}
            updateUser(userLoggedIn_.id,updatedUserInfo).then((response) =>
        {
            navigator('/login');
            toast.success("Change email successfully! Please log in again for security purpose!");
        }).catch(error => 
            {
                const errorsCopy = {... errors};
                errorsCopy.email = error.response.data;
                setErrors(errorsCopy);
                console.log(error);
            })
        }
    }

    function editPassword(e)
    {
        e.preventDefault();
        if (validateNewPassword())
        {
            const updatedUserInfo = {firstName, lastName, email, password : newPassword.trim()}
            updateUserPassword(userLoggedIn_.id,updatedUserInfo).then((response) =>
            {
                navigator('/login');
                toast.success("Change password successfully! Please log in again for security purpose!");
            }).catch(error => 
            {
                const errorsCopy = {... errors};
                errorsCopy.newPassword = error.response.data;
                setErrors(errorsCopy);
                console.log(errors);
                console.error(error);
            })
        }
    }

    function validateEmailInput(emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput)) return true; else return false;
    }

    function validateEmail()
    {
        let valid = true;
        const errorsCopy = {... errors};
    
        if (newEmail.trim() == false)
        {
            errorsCopy.email = 'Email is required!';
            valid = false;
        }
        else if (validateEmailInput(newEmail) == false)
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

    function validateNewPasswordInput(newPassword) 
    {
        if (newPassword.length >= 8  &&
            /[A-Z]/.test(newPassword) &&
            /[a-z]/.test(newPassword) &&
            /\d/.test(newPassword) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) &&
            !(/\s/.test(newPassword))) return true;
        else return false;
    }

    function validateNewPassword()
    {
        let valid = true;
        const errorsCopy = {... errors};
    
        if (newPassword.trim() == false)
        {
            errorsCopy.newPassword = 'Password cannot be blank!';
            valid = false;
        }
        else if (validateNewPasswordInput(newPassword) == false)
        {
            errorsCopy.newPassword = 'Password must contain at least 7 characters, one uppercase letter, one lowercase letter, one number, one special character (!@*/...) and no whitespace!';
            valid = false;
        }
        else
        {
            errorsCopy.newPassword = '';
        }

        if (newPassword !== rePassword)
        {
            errorsCopy.rePassword = 'Re-password does not match!';
            valid = false;
        }
        else
        {
            errorsCopy.rePassword = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    return (
        <div className='container'>
        <br></br> 
        <br></br>
        <br></br>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 mb-5'>
                    <br></br>
                    <h1>{(isAuthen === false) ? "Please enter password" : goBack}</h1>
                    <button className='btn btn-info float-end' onClick={() => navigator("/home")}>Back</button>
                    <div className='card-body'>
                            <form> 
                                {isAuthen === false ?
                                    (<>
                                        <div className='form-group mb-3'>
                                            <label className='form-label'>Password:</label>
                                                <input 
                                                    type='text'
                                                    placeholder='Enter your password'
                                                    name='password'
                                                    value={password}
                                                    className={`form-control mb-2 ${ errors.password ? 'is-invalid' : ''}`}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                >
                                                </input>
                                                { errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                                        </div>
                                        <button className='btn btn-success float-end' onClick={authenticate}>Submit</button>
                                    </>)
                                    :
                                    ( isChangeEmailRoute ? 
                                        <>
                                            <h1>Change Email</h1>
                                            <label className='form-label'>Your new email:</label>
                                            <input 
                                                type='text'
                                                placeholder='Enter your new email'
                                                name='newEmail'
                                                className={`form-control mb-2 ${ userLoggedIn_.email === newEmail || errors.email ? 'is-invalid' : ''}`} 
                                                onChange={(e) => setNewEmail(e.target.value)}
                                            >
                                            </input>
                                            { errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                                            { userLoggedIn_.email === newEmail && <div className='invalid-feedback'>Warning: This is your current email!</div>}
                                            
                                            <button className='btn btn-success float-end' onClick={editEmail}>Submit</button>
                                        </>
                                        :
                                        <>
                                            <h1>Change Password</h1>
                                            <div className='form-group mb-3'>
                                                <label className='form-label'>Enter your new password:</label>
                                                    <input 
                                                        type='text'
                                                        placeholder='Enter your password'
                                                        name='password'
                                                        value={newPassword}
                                                        className={`form-control mb-2 ${ errors.newPassword ? 'is-invalid' : ''}`}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    >
                                                    </input>
                                                    { errors.newPassword && <div className='invalid-feedback'>{errors.newPassword}</div>}
                                                    <label className='form-label'>Re-enter your new password:</label>
                                                    <input 
                                                        type='text'
                                                        placeholder='Re-enter your password'
                                                        name='password'
                                                        value={rePassword}
                                                        className={`form-control mb-2 ${ errors.rePassword ? 'is-invalid' : ''}`}
                                                        onChange={(e) => setRePassword(e.target.value)}
                                                    >
                                                    </input>
                                                    { errors.rePassword && <div className='invalid-feedback'>{errors.rePassword}</div>}
                                            </div>
                                            <button className='btn btn-success float-end' onClick={editPassword}>Submit</button>
                                        </>
                                    )
                                }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeEmail_PasswordComponent