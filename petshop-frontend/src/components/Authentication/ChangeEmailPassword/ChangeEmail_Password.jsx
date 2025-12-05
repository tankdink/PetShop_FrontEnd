import { useNavigate } from 'react-router-dom'
import React, {useEffect, useState, useRef, useReducer} from 'react'
import { authentication } from '../../../services/Authentication'
import { toast } from 'react-toastify';
import { useAuthorz } from '../../contexts/AuthorzContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation } from 'react-router-dom';
import { updateUser, updateUserPassword } from '../../../services/UserService';
import "./ChangeEmail_Password.css"

const ChangeEmail_PasswordComponent = () => {

    const { userLoggedIn_  } = useAuthorz();
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

    const [showPassword, setShowPassword] = useState(false);
    const adjustHidePassword = () => {
        setShowPassword(!showPassword);
    };
    const [showNewPassword, setShowNewPassword] = useState(false);
    const adjustHideNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const [showRePassword, setShowRePassword] = useState(false);
    const adjustHideRePassword = () => {
        setShowRePassword(!showRePassword);
    };

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
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('welcomed');
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
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('welcomed');
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
        const errorsCopy = {
            email: '',
            password: '',
            newPassword: '',
            rePassword: ''
        };
    
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
        <div className="container">
        <div className="row justify-content-center">
            <div className="card col-md-6">
                <div className="card-body">
                    <h1 className="text-center">
                        {isAuthen === false ? "Please Authenticate" : isChangeEmailRoute ? "Change Email" : "Change Password"}
                    </h1>
                    
                    <form>
                        {isAuthen === false ? (
                            <>
                                <div className="form-group mb-3">
                                    <label className="form-label">Password</label>
                                    <div className="position-relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                        <span
                                            onClick={adjustHidePassword}
                                            style={{
                                                position: "absolute",
                                                right: errors.password ? "35px" : "10px",
                                                top: "50%",
                                                transform: errors.password ? "translateY(-95%)" : "translateY(-50%)", 
                                                cursor: "pointer",
                                                color: "#6c757d"
                                            }}
                                        >
                                            {showPassword ? ( <AiOutlineEyeInvisible size={20} /> ) : ( <AiOutlineEye size={20} /> )}
                                        </span>
                                    </div>
                                </div>
                                <button className="btn btn-primary" onClick={() => navigator("/home")}>
                                    Back
                                </button>
                                <button className="btn btn-success float-end" onClick={authenticate}>
                                    Submit
                                </button>
                            </>
                        ) : isChangeEmailRoute ? (
                            <>
                                <div className="form-group mb-3">
                                    <label className="form-label">New Email</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        placeholder="Enter your new email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        required
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    { userLoggedIn_.email === newEmail && <div className='invalid-feedback'>Warning: This is your current email!</div>}
                                </div>

                                <button className='btn btn-primary' onClick={goBack}>Back</button>   
                                <button className='btn btn-success float-end' onClick={editEmail}>Submit</button>
                                
                            </>
                        ) : (
                            <>
                                <div className="form-group mb-3">
                                    <label className="form-label">New Password</label>
                                    <div className="position-relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                                            placeholder="Enter your new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                        {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
                                        <span
                                            onClick={adjustHideNewPassword}
                                            style={{
                                                position: "absolute",
                                                right: errors.newPassword ? "35px" : "10px",
                                                top: "50%",
                                                transform: errors.newPassword ? "translateY(-130%)" : "translateY(-50%)", 
                                                cursor: "pointer",
                                                color: "#6c757d"
                                            }}
                                        >
                                            {showNewPassword ? ( <AiOutlineEyeInvisible size={20} /> ) : ( <AiOutlineEye size={20} /> )}
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Re-enter New Password</label>
                                    <div className="position-relative">
                                        <input
                                            type={showRePassword ? "text" : "password"}
                                            className={`form-control ${errors.rePassword ? "is-invalid" : ""}`}
                                            placeholder="Re-enter your new password"
                                            value={rePassword}
                                            onChange={(e) => setRePassword(e.target.value)}
                                            required
                                        />
                                        {errors.rePassword && <div className="invalid-feedback">{errors.rePassword}</div>}
                                        <span
                                            onClick={adjustHideRePassword}
                                            style={{
                                                position: "absolute",
                                                right: errors.rePassword ? "35px" : "10px",
                                                top: "50%",
                                                transform: errors.rePassword ? "translateY(-95%)" : "translateY(-50%)", 
                                                cursor: "pointer",
                                                color: "#6c757d"
                                            }}
                                        >
                                            {showRePassword ? ( <AiOutlineEyeInvisible size={20} /> ) : ( <AiOutlineEye size={20} /> )}
                                        </span>
                                    </div>
                                </div>
                                
                                <button className='btn btn-primary' onClick={goBack}>Back</button>   
                                <button className='btn btn-success float-end' onClick={editPassword}>Submit</button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ChangeEmail_PasswordComponent