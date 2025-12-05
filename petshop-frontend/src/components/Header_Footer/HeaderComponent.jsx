import React, { useEffect, useRef } from 'react';
import { loggedInData } from '../../services/Authentication';
import { toast } from 'react-toastify';
import { useAuthorz } from '../contexts/AuthorzContext';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
  const isFirstRender = useRef(true);
  const { userRole, setUserRole, setUserLoggedIn_, setUserRoleId } = useAuthorz();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isHomeRoute = location.pathname.startsWith("/home");
  const navigator = useNavigate();

  useEffect(() => {
    loggedInData()
      .then((response) => {
        setUserRole(response.data?.role?.name);
        setUserLoggedIn_(response.data);
        setUserRoleId(response.data?.role?.id);
      })
      .catch((error) => {
        if (isFirstRender.current) {
          isFirstRender.current = false;

          const errorMessage = error.response?.data || "Unknown error occurred";

          if (errorMessage === "Session is expired! Please log in again!") {
            toast.error("Session is expired! Please log in again!");
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("welcomed");
            navigator("/login");
          } else if (errorMessage === "Please logged in to use our services!") {
            toast.warn("Please logged in to use our services!");
            if (!isHomeRoute) navigator("/login");
          } else {
            toast.error("Unexpected error occurred. Please try again later.");
            // navigator("/login");
          }
        }
      });
  }, []);

  return (
    <header>
      <nav className="navbar navbar-dark bg-primary px-3">
        {isAdminRoute ? (
          <a className="navbar-brand text-white" href="/admin/userList">
            User Management System for {userRole?.split("_")[1] || ""}
          </a>
        ) : (
          <a className="navbar-brand text-white" href="/home">
            Welcome, Customers!
          </a>
        )}
      </nav>
    </header>
  );
};

export default HeaderComponent;
