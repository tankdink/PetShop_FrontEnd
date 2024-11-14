import { useNavigate } from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import { authentication } from '../../services/Authentication'
import { toast } from 'react-toastify';
import { useAuthorz } from '../contexts/AuthorzContext';
import { loggedInData } from '../../services/Authentication';

const SignUpComponent = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { userLoggedIn_ , setUserLoggedIn_ } = useAuthorz();

    const navigator = useNavigate();

    function authenticate(e)
    {
        e.preventDefault();
        const userInfo = {email, password}
        authentication(userInfo).then((response) =>
            {
                localStorage.setItem('jwtToken', JSON.stringify(response.data.jwt));
                localStorage.setItem('welcomed', 'false');
                navigator("/home");
            }).catch(error => {
                    toast.error(error.response?.data);
            })
    }


    return (
        <div className='container'>
        <br></br> 
        <br></br>
        <br></br>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 mb-5'>
                    <br></br>
                    <h1>Sign Up</h1>
                    <button className='btn btn-info float-end' onClick={() => navigator("/login")}>Back</button>
                    <div className='card-body'>
                            <form>
                                <div className='form-group mb-3'>
                                    <label className='form-label'>Email:</label>
                                    <input 
                                        type='text'
                                        placeholder='Enter your registered email'
                                        name='email'
                                        value={email}
                                        className={`form-control mb-2`}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    >
                                    </input>
                        
                                    <label className='form-label'>Password:</label>
                                    <input 
                                        type='text'
                                        placeholder='Enter your password'
                                        name='password'
                                        value={password}
                                        className={`form-control mb-2`}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    >
                                    </input>
                                </div>
                            <button className='btn btn-success float-end' onClick={authenticate}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpComponent