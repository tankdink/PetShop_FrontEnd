import { useNavigate } from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import { authentication } from '../../services/Authentication'
import { toast } from 'react-toastify';

const LoginComponent = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const nagivator = useNavigate();

    function authenticate(e)
    {
        e.preventDefault();
        const userInfo = {email, password}
        authentication(userInfo).then((response) =>
            {
                localStorage.setItem('jwtToken', JSON.stringify(response.data.jwt));
                nagivator('/home');
            }).catch(error => 
                {
                    console.error(error);
                })
    }


    return (
        <div>
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
  )
}

export default LoginComponent