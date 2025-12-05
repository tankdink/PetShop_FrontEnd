import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { addUser, getUserById, updateUser } from '../../../services/UserService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthorz } from '../../contexts/AuthorzContext';
import { gettedRole, gettedRoleList } from '../../../services/RoleService';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const Add_EditUserComponent =  () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setrePassword] = useState('')
    const [roleList, setRoleList] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const {userLoggedIn_} = useAuthorz();
    const {userRole, userRoleId} = useAuthorz();
    const navigator = useNavigate();
    const isFirstRender = useRef(true);
    const {id} = useParams();
    const location = useLocation();
    const isNavigatedFromHomepage = location.pathname.startsWith("/changeInfo");

    const [errors, setErrors] = useState(
        {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            rePassword: '',
            role: ''
        }
    )

    const [showNewPassword, setShowNewPassword] = useState(false);
    const adjustHideNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const [showRePassword, setShowRePassword] = useState(false);
    const adjustHideRePassword = () => {
        setShowRePassword(!showRePassword);
    };


    //If present an id in URL, this form will be an update form, this hook will get information of the updated user
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
                    if (isFirstRender.current)
                    {
                        isFirstRender.current=false;
                        console.error(error);
                        if (error.response.data === "") toast.error("Invalid argument!");
                        else toast.error(error.response.data);
                        navigator("/");
                    }
                })
        }
    },[id])

    //Get approriate role list for current admin
    useEffect(() => {
        gettedRoleList(userRoleId).then(response => {
            setRoleList(response.data);
        })
        .catch(error => {
            console.error(error.response.data);
        });
    }, []);


    function validateEmailInput(emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput)) return true; else return false;
    }

    function validateEdit()
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

        if (lastName.trim() == false || lastName == null)
        {
            errorsCopy.lastName = 'Last name is required!';
            valid = false;
        }
        else
        {
            errorsCopy.lastName = '';
        }

        if (email.trim() == false || email == null)
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

    function validatePasswordInput(newPassword) 
    {
        if (newPassword.length >= 8  &&
            /[A-Z]/.test(newPassword) &&
            /[a-z]/.test(newPassword) &&
            /\d/.test(newPassword) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) &&
            !(/\s/.test(newPassword))) return true;
        else return false;
    }

    function validateAdd()
    {
        let valid = true;
        const errorsCopy = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            rePassword: ''
        };

        if (firstName.trim() == false || firstName == null)
        {
            errorsCopy.firstName = 'First name is required!';
            valid = false;
        }
        else 
        {
            errorsCopy.firstName = '';
        }

        if (lastName.trim() == false || lastName == null)
        {
            errorsCopy.lastName = 'Last name is required!';
            valid = false;
        }
        else
        {
            errorsCopy.lastName = '';
        }

        if (email.trim() == false || email == null)
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

        if (password.trim() == false)
        {
            errorsCopy.password = 'Password is required!';
            valid = false;
        }
        else if (validatePasswordInput(password) == false)
        {
            errorsCopy.password = 'Password must contain at least 7 characters, one uppercase letter, one lowercase letter, one number, one special character (!@*/...) and no whitespace!';
            valid = false;
        }
        else 
        {
            errorsCopy.password = '';
        }

        if (rePassword.trim() !== password)
        {
            errorsCopy.rePassword = 'Re-password does not match!';
            valid = false;
        }
        else
        {
            errorsCopy.rePassword = '';
        }

        if (selectedRole.trim() === '')
        {
            errorsCopy.role = 'Please select a role!';
            valid = false;
        }
        else
        {
            errorsCopy.role = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    async function add_editUser(e)
    {
        e.preventDefault();
        //Edit user 
        if (id)
        {
            if (validateEdit())
            {
                const newUserInfo = {firstName : firstName.trim(), lastName : lastName.trim(), email}
                updateUser(id,newUserInfo).then((response) =>
                {
                    goBack();
                    toast.success("Change information successfully!");
                    console.log(response.data);
                }).catch(error => 
                    {
                        const errorsCopy = {... errors};
                        errorsCopy.firstName = "";
                        errorsCopy.lastName = "";
                        errorsCopy.email = error.response?.data;
                        setErrors(errorsCopy);
                        console.error(error);
                    })
            }
        }
        else //Add user 
        {
            if (validateAdd())
            {
                //Get new role
                const response = await gettedRole(selectedRole);
                const newRole = response?.data;
                const newUser = {firstName : firstName.trim(), lastName : lastName.trim(), email : email.trim(), password : password.trim(), role : newRole}
                console.log(newUser);
                addUser(newUser).then((response) =>
                {
                    navigator('/admin/userList');
                    toast.success("Add new account successfully!");
                    console.log(response.data);
                }).catch(error => 
                    {
                        const errorsCopy = {... errors};
                        errorsCopy.email = error.response.data;
                        setErrors(errorsCopy);
                        console.error(error);
                    })
            }
        } 
    }

    function goBack()
    {
        if (location.pathname.startsWith("/admin") || !location.pathname.startsWith("/changeInfo")) navigator("/admin/userList");
        else navigator('/');
    }

    function pageTitle()
    {
        if (id) return <h2 className='text-center'>Update user </h2>
        else return <h2 className='text-center'>Add new user</h2>
    }

    const formatRole = (role) => {
        return role
          .replace(/^ROLE_/, '')
          .replace(/_/g, ' ')
          .toLowerCase()
          .replace(/\b\w/g, char => char.toUpperCase());
      };

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
                                {/* The field that render only if this form is add user for admin */}
                                {!id && 
                                    <>
                                        <label className='form-label'>Email:</label>
                                        <input 
                                            type='text'
                                            placeholder='Enter email'
                                            name='email'
                                            value={email}
                                            className={`form-control mb-2 ${ errors.email ? 'is-invalid' : ''}`}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        >
                                        </input>
                                        { errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                                        <br></br>

                                        <label className='form-label'>Password:</label>
                                        <div className="position-relative">
                                            <input 
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder='Enter password'
                                                name='password'
                                                value={password}
                                                className={`form-control mb-2 ${ errors.password ? 'is-invalid' : ''}`}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            >
                                            </input>
                                            { errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                                            <br></br>

                                            <span
                                                onClick={adjustHideNewPassword}
                                                style={{
                                                    position: "absolute",
                                                    right: errors.password ? "35px" : "10px", 
                                                    top: "50%",
                                                    transform: errors.password ? "translateY(-180%)" : "translateY(-115%)",
                                                    cursor: "pointer",
                                                    color: "#6c757d"
                                                }}
                                                >
                                                {showNewPassword ? ( <AiOutlineEyeInvisible size={20} /> ) : ( <AiOutlineEye size={20} /> )}
                                            </span>
                                        </div>

                                        <label className='form-label'>Re-enter Password:</label>
                                        <div className="position-relative">
                                            <input 
                                                type={showRePassword ? "text" : "password"}
                                                placeholder='Re-enter password'
                                                name='rePassword'
                                                value={rePassword}
                                                className={`form-control mb-2 ${ errors.rePassword ? 'is-invalid' : ''}`}
                                                onChange={(e) => setrePassword(e.target.value)}
                                                required
                                            >
                                            </input>
                                            { errors.rePassword && <div className='invalid-feedback'>{errors.rePassword}</div>}
                                            <br></br>
                                        
                                            <span
                                                onClick={adjustHideRePassword}
                                                style={{
                                                    position: "absolute",
                                                    right: errors.rePassword ? "35px" : "10px", 
                                                    top: "50%",
                                                    transform: errors.rePassword ? "translateY(-145%)" : "translateY(-115%)",
                                                    cursor: "pointer",
                                                    color: "#6c757d"
                                                }}
                                                >
                                                {showRePassword ? ( <AiOutlineEyeInvisible size={20} /> ) : ( <AiOutlineEye size={20} /> )}
                                            </span>
                                        </div>
                                    </>
                                }

                                {/* Button for changing email and password if navigate from home page */}
                                {console.log(id, userLoggedIn_.id)}
                                {(id && isNavigatedFromHomepage && parseInt(id) === userLoggedIn_.id) ?  
                                    <div>
                                        <button className='btn btn-primary' onClick={() => navigator("/changeEmail")}>Change Email</button>
                                        <button className='btn btn-primary' onClick={() => navigator("/changePassword")}>Change Password</button>
                                        <div>
                                            <br></br>
                                        </div>
                                    </div>
                                    : ""
                                }

                                {/* The field has both in edit and add user form */}
                                <label className='form-label'>User's first name:</label>
                                <input 
                                    type='text'
                                    placeholder='Enter user&apos;s first name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control mb-2 ${ errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                >
                                </input>
                                { errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                                <br></br>

                                <label className='form-label'>User's last name:</label>
                                <input 
                                    type='text'
                                    placeholder='Enter user&apos;s last name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control mb-2 ${ errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                >
                                </input>
                                { errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                                <br></br>
                                
                                {/* Role field for add user only*/}
                                {!id && 
                                    <>
                                        <label className='form-label'>Role:</label>
                                        <select
                                            name='role'
                                            value={selectedRole}
                                            onChange={(e) => setSelectedRole(e.target.value)}
                                            className={`form-control mb-2 ${errors.role ? 'is-invalid' : ''}`}
                                            required
                                        >
                                            <option value=''>Select a role</option>
                                            {roleList.map((role) => (
                                                <option key={role.id} value={role.name}>
                                                    {formatRole(role.name)}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.role && <div className='invalid-feedback'>{errors.role}</div>}
                                    </>
                                }
                            
                            </div>
                            <button className='btn btn-primary' onClick={goBack}>Back</button>   
                            <button className='btn btn-success float-end' onClick={add_editUser}>Submit</button>
                            </form>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
        </div>
    )
}

export default Add_EditUserComponent

