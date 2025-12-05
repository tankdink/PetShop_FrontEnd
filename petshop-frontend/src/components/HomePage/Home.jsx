import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { loggedInData } from '../../services/Authentication';
import { useNavigate } from 'react-router-dom';
import { useAuthorz } from '../contexts/AuthorzContext';
import "./Home.css";

const HomePage = () => {
    const [userLoggedIn, setUserLoggedIn] = useState({});
    const [showInfoModal, setShowInfoModal] = useState(false);
    const navigator = useNavigate();
    const { userRole, userLoggedIn_ } = useAuthorz();

    function greetNoti() {
        toast.info(`Welcome ${userLoggedIn?.firstName} ${userLoggedIn?.lastName}`, {
            position: "top-right",
            autoClose: 3000,
        });
    }

    function logOut() {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>Are you sure you want to log out?</p>
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => {
                                localStorage.removeItem('jwtToken');
                                localStorage.removeItem('welcomed');
                                navigator("/login");
                                toast.success("Logout successfully!");
                                closeToast();
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={closeToast}
                        >
                            No
                        </button>
                    </div>
                </div>
            ),
            { autoClose: false }
        );
    }

    useEffect(() => {
        loggedInData()
            .then((response) => {
                setUserLoggedIn(response.data);
            })
            .catch((error) => {
                console.error("Session expired! Please log in again.");
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('welcomed');
            });
    }, []);

    useEffect(() => {
        const welcomed = localStorage.getItem('welcomed');
        if (welcomed === 'false' && userLoggedIn?.firstName && userLoggedIn?.lastName) {
            greetNoti();
            localStorage.setItem('welcomed', 'true');
        }
    }, [userLoggedIn]);

    function toManage() {
        navigator("/admin/userList");
    }

    function login(e) {
        e.preventDefault();
        navigator("/login");
    }

    function changeInfo(id) {
        navigator(`/changeInfo/updateUser/${id}`);
    }

    function formatRole(role) {
        return role
            .replace(/^ROLE_/, '')
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    function toggleInfoModal() {
        setShowInfoModal(!showInfoModal);
    }

    return (
        <div className="container">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4" style={{ marginTop: '-6rem' }}>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {Object.keys(userLoggedIn_).length > 0 ? (
                            <>
                                <li className="nav-item ">
                                    <button className="btn btn-outline-primary nav-link btn-text-white" onClick={logOut}>
                                        Log out
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-primary nav-link btn-text-white" onClick={() => changeInfo(userLoggedIn_.id)}>
                                        Edit profile
                                    </button>
                                </li>
                                {(userRole === "ROLE_ADMIN" || userRole === "ROLE_ACCOUNT_MANAGER") && (
                                    <li className="nav-item">
                                        <button className="btn btn-outline-primary nav-link btn-text-white" onClick={toManage}>
                                            Manage users
                                        </button>
                                    </li>
                                )}
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-outline-primary nav-link" onClick={login}>
                                    Log In
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>

            
            <div className="text-center mb-4">
                <h1>Welcome, Customer!</h1>
                {Object.keys(userLoggedIn_).length > 0 && (
                    <button className="btn btn-info ms-3" onClick={toggleInfoModal}>
                        <i className="bi bi-info-circle me-1"></i> Info
                    </button>
                )}
            </div>

            <p className="text-center">This is the homepage for customers in the future!</p>

            {/* Modal for user Information */}
            {showInfoModal && (
                <div>
                    <div
                        className="modal-backdrop fade show"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1040,
                        }}
                    ></div>

                    <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">User Information</h5>
                                    <button type="button" className="btn-close" onClick={toggleInfoModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        <strong>User ID:</strong> {userLoggedIn.id}
                                    </p>
                                    <p>
                                        <strong>First Name:</strong> {userLoggedIn.firstName}
                                    </p>
                                    <p>
                                        <strong>Last Name:</strong> {userLoggedIn.lastName}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {userLoggedIn.email}
                                    </p>
                                    {userRole !== "ROLE_USER" && (
                                        <p>
                                            <strong>Role:</strong> {formatRole(userRole)}
                                        </p>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleInfoModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;



