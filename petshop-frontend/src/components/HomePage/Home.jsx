import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { loggedInData } from '../../services/Authentication';
import { useNavigate} from 'react-router-dom';
import { useAuthorz } from '../contexts/AuthorzContext';

const HomePage = () => {

    const [userLoggedIn, setUserLoggedIn] = useState({});
    const [showInfoModal, setShowInfoModal] = useState(false);
    const navigator = useNavigate();
    const { userRole, userLoggedIn_ } = useAuthorz();
    

    function greetNoti()
    {
        toast.info(`Welcome ${userLoggedIn?.firstName} ${userLoggedIn?.lastName}`, {
            position: "top-right",
            autoClose: 3000,
        });
    }

    function logOut()
    {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('welcomed');
        navigator('/login');
    }

    useEffect(() => {
        loggedInData().then(response => {
            setUserLoggedIn(response.data);
        })
        .catch(error => {
            console.error(error.response?.data);
            navigator("/login");
        });
    }, []);

    useEffect(() => {
        const welcomed = localStorage.getItem('welcomed');
        if (welcomed == 'false' && userLoggedIn?.firstName && userLoggedIn?.lastName) 
        {
            greetNoti();
            localStorage.setItem('welcomed', 'true');
        }
    }, [userLoggedIn]);

    function toManage()
    {
        navigator("/admin/userList")
    }
    function login(e)
    {
        e.preventDefault();
        navigator("/login")
    }
    function changeInfo(id)
    {
        navigator(`/changeInfo/updateUser/${id}`);
    }
    function formatRole(role) {
        return role
            .replace(/^ROLE_/, '')          // Remove 'ROLE_' prefix
            .replace(/_/g, ' ')             // Replace underscores with spaces
            .toLowerCase()                  // Convert to lowercase
            .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize each word
    }

    
    function toggleInfoModal() {
        setShowInfoModal(!showInfoModal);
    }
    
    

  return (
    <div>
        <span>
            <h1>Welcome customer!</h1> 
            {
                Object.keys(userLoggedIn_).length > 0 ? <button className="btn btn-info ms-2" onClick={toggleInfoModal}><i className="bi bi-info-circle me-1"></i>Info</button> : ""
            }           
        </span>
        <p>This is a homepage for customers in the future!</p>
        {
            Object.keys(userLoggedIn_).length > 0 ? (
            <>
                <button className='btn btn-primary' onClick={logOut}>Log Out</button>
                <button className='btn btn-primary' onClick={() => changeInfo(userLoggedIn_.id)}>Change information</button>
                
                {userRole === "ROLE_ADMIN" && (
                    <button className='btn btn-primary' onClick={toManage}>To the manager page</button>
                )}
            </> ) : (<button className='btn btn-primary' onClick={login}>Log In</button> )
        }

        
            {showInfoModal && (
                <div>
                    <div className="modal-backdrop fade show" style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1040
                    }}></div>

                    <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog">
                            <div className="modal-content" autoFocus>
                                <div className="modal-header">
                                    <h5 className="modal-title">User Information</h5>
                                    <button type="button" className="btn-close" onClick={toggleInfoModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>User ID:</strong> {userLoggedIn.id}</p>
                                    <p><strong>First Name:</strong> {userLoggedIn.firstName}</p>
                                    <p><strong>Last Name:</strong> {userLoggedIn.lastName}</p>
                                    <p><strong>Email:</strong> {userLoggedIn.email}</p>
                                    {userRole !== "ROLE_USER" && (
                                        <p><strong>Role:</strong> {formatRole(userRole)}</p>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleInfoModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
    </div>
  )
}

export default HomePage