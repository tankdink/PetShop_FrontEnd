// import { useNavigate } from 'react-router-dom'
// import React, {useEffect, useState} from 'react'
// import { authentication } from '../../../services/Authentication'
// import { toast } from 'react-toastify';
// import { useAuthorz } from '../../contexts/AuthorzContext';
// import { loggedInData } from '../../../services/Authentication';
// import { register } from '../../../services/UserService';
// import "./SignUp.css"

// const SignUpComponent = () => {

//     const [firstName, setfirstName] = useState('')
//     const [lastName, setlastName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [rePassword, setrePassword] = useState('')
//     const navigator = useNavigate();
//     const [errors, setErrors] = useState(
//         {
//             email: '',
//             firstName: '',
//             lastName: '',
//             password: '',
//             rePassword: ''
//         }
//     )

//     function validateEmailInput(emailInput) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (emailRegex.test(emailInput)) return true; else return false;
//     }

//     function validatePasswordInput(newPassword) 
//     {
//         if (newPassword.length >= 8  &&
//             /[A-Z]/.test(newPassword) &&
//             /[a-z]/.test(newPassword) &&
//             /\d/.test(newPassword) &&
//             /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) &&
//             !(/\s/.test(newPassword))) return true;
//         else return false;
//     }

//     function validate()
//     {
//         let valid = true;
//         const errorsCopy = {
//             email: '',
//             firstName: '',
//             lastName: '',
//             password: '',
//             rePassword: ''
//         };

//         if (firstName.trim() == false || firstName == null)
//         {
//             errorsCopy.firstName = 'First name is required!';
//             valid = false;
//         }
//         else 
//         {
//             errorsCopy.firstName = '';
//         }

//         if (lastName.trim() == false || lastName == null)
//         {
//             errorsCopy.lastName = 'Last name is required!';
//             valid = false;
//         }
//         else
//         {
//             errorsCopy.lastName = '';
//         }

//         if (email.trim() == false || email == null)
//         {
//             errorsCopy.email = 'Email is required!';
//             valid = false;
//         }
//         else if (validateEmailInput(email) == false)
//         {
//             errorsCopy.email = 'Invalid email!';
//             valid = false;
//         }
//         else
//         {
//             errorsCopy.email = '';
//         }

//         if (password.trim() == false)
//         {
//             errorsCopy.password = 'Password is required!';
//             valid = false;
//         }
//         else if (validatePasswordInput(password) == false)
//         {
//             errorsCopy.password = 'Password must contain at least 7 characters, one uppercase letter, one lowercase letter, one number, one special character (!@*/...) and no whitespace!';
//             valid = false;
//         }
//         else 
//         {
//             errorsCopy.password = '';
//         }

//         if (rePassword.trim() !== password)
//         {
//             errorsCopy.rePassword = 'Re-password does not match!';
//             valid = false;
//         }
//         else
//         {
//             errorsCopy.rePassword = '';
//         }

//         setErrors(errorsCopy);
//         return valid;
//     }

//     function signup(e)
//     {
//         e.preventDefault();
//         if (validate())
//         {
//             const userInfo = {firstName : firstName.trim(), lastName : lastName.trim(), email : email.trim(), password : password.trim()}
//             register(userInfo).then((response) =>
//             {
//                 toast.success("Register successfully! Please log in to use our services!");
//                 navigator("/login");
//             }).catch(error => {
//                 toast.error(error.response?.data);
//             })
//         }
//     }


//     return (
//         <div className='container'>
//         <br></br> 
//         <br></br>
//         <br></br>
//             <div className='row'>
//                 <div className='card col-md-6 offset-md-3 mb-5'>
//                     <br></br>
//                     <h1>Sign Up</h1>
//                     <button className='btn btn-info float-end' onClick={() => navigator("/login")}>Back</button>
//                     <div className='card-body'>
//                             <form>
//                                 <div className='form-group mb-3'>
//                                     <label className='form-label'>Email:</label>
//                                     <input 
//                                         type='text'
//                                         placeholder='Enter your email'
//                                         name='email'
//                                         value={email}
//                                         className={`form-control mb-2 ${ errors.email ? 'is-invalid' : ''}`}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     >
//                                     </input>
//                                     { errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        
//                                     <label className='form-label'>First name:</label>
//                                     <input 
//                                         type='text'
//                                         placeholder='Enter your first name'
//                                         name='firstname'
//                                         value={firstName}
//                                         className={`form-control mb-2 ${ errors.firstName ? 'is-invalid' : ''}`}
//                                         onChange={(e) => setfirstName(e.target.value)}
//                                         required
//                                     >
//                                     </input>
//                                     { errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}

//                                     <label className='form-label'>Last name:</label>
//                                     <input 
//                                         type='text'
//                                         placeholder='Enter your last name'
//                                         name='lastName'
//                                         value={lastName}
//                                         className={`form-control mb-2 ${ errors.lastName ? 'is-invalid' : ''}`}
//                                         onChange={(e) => setlastName(e.target.value)}
//                                         required
//                                     >
//                                     </input>
//                                     { errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}

//                                     <label className='form-label'>Password:</label>
//                                     <input 
//                                         type='text'
//                                         placeholder='Enter your password'
//                                         name='password'
//                                         value={password}
//                                         className={`form-control mb-2 ${ errors.password ? 'is-invalid' : ''}`}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                     >
//                                     </input>
//                                     { errors.password && <div className='invalid-feedback'>{errors.password}</div>}

//                                     <label className='form-label'>Re-enter Password:</label>
//                                     <input 
//                                         type='text'
//                                         placeholder='Re-enter your password'
//                                         name='rePassword'
//                                         value={rePassword}
//                                         className={`form-control mb-2 ${ errors.rePassword ? 'is-invalid' : ''}`}
//                                         onChange={(e) => setrePassword(e.target.value)}
//                                         required
//                                     >
//                                     </input>
//                                     { errors.rePassword && <div className='invalid-feedback'>{errors.rePassword}</div>}

//                                 </div>
//                             <button className='btn btn-success float-end' onClick={signup}>Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SignUpComponent


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register } from '../../../services/UserService'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 
import './SignUp.css'

const SignUpComponent = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    rePassword: ''
  })
  const [passwordVisible, setPasswordVisible] = useState(false)  
  const [rePasswordVisible, setRePasswordVisible] = useState(false)  
  const navigator = useNavigate()

  const validateEmailInput = (emailInput) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailInput)
  }

  const validatePasswordInput = (newPassword) => {
    return (
      newPassword.length >= 8 &&
      /[A-Z]/.test(newPassword) &&
      /[a-z]/.test(newPassword) &&
      /\d/.test(newPassword) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) &&
      !/\s/.test(newPassword)
    )
  }

  const validate = () => {
    let valid = true
    const errorsCopy = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      rePassword: ''
    }

    if (firstName.trim() === '') {
      errorsCopy.firstName = 'First name is required!'
      valid = false
    }
    if (lastName.trim() === '') {
      errorsCopy.lastName = 'Last name is required!'
      valid = false
    }
    if (email.trim() === '' || !validateEmailInput(email)) {
      errorsCopy.email = 'Please provide a valid email address!'
      valid = false
    }
    if (password.trim() === '' || !validatePasswordInput(password)) {
      errorsCopy.password =
        'Password must be at least 8 characters, one uppercase, one lowercase, one number, one special character and no backspace!.'
      valid = false
    }
    if (rePassword.trim() !== password) {
      errorsCopy.rePassword = 'Passwords do not match!'
      valid = false
    }

    setErrors(errorsCopy)
    return valid
  }

  const signup = (e) => {
    e.preventDefault()
    if (validate()) {
      const userInfo = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password.trim()
      }
      register(userInfo)
        .then((response) => {
          toast.success('Registered successfully! Please log in to use our services!')
          navigator('/login')
        })
        .catch((error) => {
          toast.error(error.response?.data)
        })
    }
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='card col-md-6 p-4 mt-5'>
          <h3 className='text-center mb-4'>Sign Up</h3>
          <button className='btn btn-info float-end' onClick={() => navigator('/login')}>
            Back
          </button>
          <div className='card-body'>
            <form onSubmit={signup}>
              <div className='form-group mb-3'>
                <label className='form-label'>Email:</label>
                <input
                  type='text'
                  placeholder='Enter your email'
                  name='email'
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              <div className='form-group mb-3'>
                <label className='form-label'>First Name:</label>
                <input
                  type='text'
                  placeholder='Enter your first name'
                  name='firstName'
                  value={firstName}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>

              <div className='form-group mb-3'>
                <label className='form-label'>Last Name:</label>
                <input
                  type='text'
                  placeholder='Enter your last name'
                  name='lastName'
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>

              <div className='form-group mb-3'>
                <label className='form-label'>Password:</label>
                <div className='input-group'>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder='Enter your password'
                    name='password'
                    value={password}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <div className='input-group-append'>
                    <button
                      type='button'
                      className='btn btn-light'
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
                  </div>
                  {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                </div>
              </div>

              <div className='form-group mb-4'>
                <label className='form-label'>Re-enter Password:</label>
                <div className='input-group'>
                  <input
                    type={rePasswordVisible ? 'text' : 'password'}
                    placeholder='Re-enter your password'
                    name='rePassword'
                    value={rePassword}
                    className={`form-control ${errors.rePassword ? 'is-invalid' : ''}`}
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                  />
                  <div className='input-group-append'>
                    <button
                      type='button'
                      className='btn btn-light'
                      onClick={() => setRePasswordVisible(!rePasswordVisible)}
                    >
                      {rePasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
                  </div>
                  {errors.rePassword && <div className='invalid-feedback'>{errors.rePassword}</div>}
                </div>
              </div>

              <div className='form-group'>
                <button type='submit' className='btn btn-success w-100'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpComponent

