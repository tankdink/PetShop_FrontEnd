import React, { useEffect, useState } from 'react';
import { deleteUserById, disableUserById, getUserById, getUserByIdLikely, getUserByEmailLikely, getUserByRoleNameLikely, updateUserRole, userList } from '../../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { loggedInData } from '../../../services/Authentication';
import { toast } from 'react-toastify';
import { gettedRoleList, gettedRole } from "../../../services/RoleService";
import { useAuthorz } from '../../contexts/AuthorzContext';
import "./GetAllUser.css";

export const GetAllUserComponent = () => {
  const [user, setUser] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const { userLoggedIn_ } = useAuthorz();
  const [selectedRole, setSelectedRole] = useState('');
  const [chosenUser, setChosenUser] = useState([]);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [findBy, setFindBy] = useState('');
  const [currentPage, setCurrentPage] = useState(0);  
  const [totalPages, setTotalPages] = useState(0);    
  const [pageSize] = useState(5);  
  const [loading, setLoading] = useState(false); /*setLoading(true) vs .finally(() => setLoading(false)); after call API for loading effect */

  const navigator = useNavigate();

  useEffect(() => { getAllUser(); }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);  
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1); 
    }
  };

  const handlePageInputChange = (e) => {
    const page = Number(e.target.value) - 1; 
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    // Check both keyword and findBy are not null or empty
    if (keyword && findBy) 
        {
            if (findBy === "id") 
            {
                
                setUser([]);
                getUserByIdLikely(keyword).then(response => {
                    setUser(response.data);
                  })
                  .catch(error => {
                    console.error(error.response);
                  });
                  
            }
            if (findBy === "email") 
            {
                
                setUser([]);
                getUserByEmailLikely(keyword).then(response => {
                    setUser(response.data);
                    })
                    .catch(error => {
                    console.error(error.response);
                    });
                    
            }
            if (findBy === "role") 
            {
                
                setUser([]);
                getUserByRoleNameLikely(keyword).then(response => {
                    setUser(response.data);
                    })
                    .catch(error => {
                    console.error(error.response);
                    });
                    
            }  
        }

    else getAllUser();
  }, [keyword, findBy]);

  useEffect(() => {
    gettedRoleList(userLoggedIn_.role?.id).then(response => {
      setRoleList(response.data);
    })
    .catch(error => {
      console.error(error.response);
    });
  }, []);

  const getAllUser = () => {
    const pageRequest = {pageNo : currentPage, pageSize} 
    userList(pageRequest).then((response) => {
        setUser(response.data.content);
        setTotalPages(response.data.totalPages);
    }).catch(error => {
      console.log(error.response.data);
    });
  };

  

  const addUser = () => navigator('/admin/addUser');
  const updateUser = (userId) => navigator('/updateUser/' + userId);
  const goBack = () => navigator('/home');

  const deleteUser = (userID) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete user with ID {userID}?</p>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-danger btn-sm me-2"
              onClick={() => {
                deleteUserById(userID).then(() => {
                  getAllUser();
                  toast.success("User deleted successfully!");
                  closeToast();
                }).catch(error => console.error(error));
              }}
            >
              Yes
            </button>
            <button className="btn btn-secondary btn-sm" onClick={closeToast}>
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const openRoleModal = (userID) => {
    getUserById(userID)
      .then((response) => {
        setChosenUser(response.data);
        setSelectedRole(response.data?.role?.name);
        setShowRoleModal(true);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  const closeRoleModal = () => {
    setShowRoleModal(false);
    setChosenUser(null);
    setSelectedRole("");
  };

  const handleRoleChange = async () => {
    try {
      if (!selectedRole || selectedRole === chosenUser?.role?.name) {
        toast.info(
          !selectedRole
            ? "Please select a role!"
            : "No changes detected in role selection."
        );
        return;
      }

      const response = await gettedRole(selectedRole);
      const updatedRole = response?.data;

      const updatedUser = { role: updatedRole };
      await updateUserRole(chosenUser.id, updatedUser);
      getAllUser();
      toast.success("User role updated successfully!");
      closeRoleModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user role.");
    }
  };

  const disableUser = (userID, enable) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure to {enable ? "disable" : "enable"} user with ID {userID}?</p>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-danger btn-sm me-2"
              onClick={() => {
                disableUserById(userID)
                  .then(() => {
                    getAllUser();
                    toast.success(`User ${enable ? "disabled" : "enabled"} successfully!`);
                  })
                  .catch((error) => console.error(error));
                closeToast();
              }}
            >
              Yes
            </button>
            <button className="btn btn-secondary btn-sm" onClick={closeToast}>
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const formatRole = (role) => {
    return role
      .replace(/^ROLE_/, '')
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  function resetFilter()
  {
    setKeyword("");
    setFindBy("");
    getAllUser();
    setCurrentPage(0);
  }

  // If loading is true, render a spinner instead of the table
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center">User List</h1>
      <div className="d-flex mb-3 justify-content-between">
        <button className="btn btn-primary me-2" onClick={goBack}>Back</button>
        <button className="btn btn-primary" onClick={addUser}>Add New User</button>
      </div>

      <div className="d-flex mb-3 justify-content-between align-items-center">
        <div className="d-flex align-items-center">
            <span className="me-2">Search</span>
            <input 
            type="text" 
            className="form-control me-3" 
            placeholder="Search keyword..." 
            onChange={(e) => setKeyword(e.target.value)}
            value = {keyword}
            />
        
            <span className="me-2">By</span>
            <select className="form-select me-3"
                value={findBy} 
                onChange={(e) => setFindBy(e.target.value)
                }
            >
                <option value="">Select...</option>
                <option value="id">ID</option>
                <option value="email">Email</option>
                <option value="role">Role</option>
            </select>
            <span className="me-2"><button className="btn btn-primary me-2" onClick={resetFilter}>Reset</button></span>
        </div>
    </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            user.length > 0 ? 
                (
                    user.map(user => (
                        <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.enable ? "Activated" : "Deactivated"}</td>
                        <td>{formatRole(user.role.name)}</td>
                        <td className={user.id === userLoggedIn_.id ? "text-center" : ""}>
                            {(user.id !== userLoggedIn_.id && userLoggedIn_.role.name === "ROLE_ADMIN") && (
                            <>
                                <button
                                className="btn btn-info me-2"
                                onClick={() => updateUser(user.id)}
                                title="Update User"
                                >
                                <i className="fas fa-edit"></i>
                                </button>
                                <button
                                className="btn btn-danger me-2"
                                onClick={() => deleteUser(user.id)}
                                title="Delete User"
                                >
                                <i className="fas fa-trash-alt"></i>
                                </button>
                            </>
                            )}

                            {(user.id !== userLoggedIn_.id && userLoggedIn_.role.id >= user.role.id) && (
                            <button
                                className="btn btn-warning me-2"
                                onClick={() => openRoleModal(user.id)}
                                title="Change Role"
                            >
                                <i className="fas fa-user-cog"></i>
                            </button>
                            )}

                            {(user.id !== userLoggedIn_.id && userLoggedIn_.role.id > user.role.id) && (
                            <button
                                className="btn btn-secondary"
                                onClick={() => disableUser(user.id, user.enable)}
                                title={user.enable ? "Disable User" : "Enable User"}
                            >
                                <i className={`fas ${user.enable ? "fa-user-slash" : "fa-user-check"}`}></i>
                            </button>
                            )}

                            {(user.id === userLoggedIn_.id) && (<span>Your account</span>)}
                        </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center">
                            No user was found
                        </td>
                    </tr>
                )
            }
        </tbody>
      </table>

        <br></br>
        <br></br>
       {(findBy === "" && keyword === "") &&
        <>
            {/* Pagination Controls */}
            <div className="d-flex justify-content-end align-items-center mt-3">
                <div className="d-flex align-items-center">
                <button
                    className="btn btn-secondary me-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
                <span>
                    Showing page{" "}
                    <input
                    type="number"
                    value={currentPage + 1}
                    onChange={handlePageInputChange}
                    min="1"
                    max={totalPages}
                    className="form-control d-inline w-auto"
                    style={{ width: "60px" }}
                    />
                    {" "} of {totalPages} pages
                </span>
                <button
                    className="btn btn-secondary ms-2"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                >
                    <i className="fas fa-arrow-right"></i>
                </button>
                </div>
            </div>
            <br></br>
            <br></br>
        </>
       }

      {showRoleModal && (
        <div>
          <div className="modal-backdrop fade show"></div>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Role</h5>
                  <button type="button" className="btn-close" onClick={closeRoleModal}></button>
                </div>
                <div className="modal-body">
                  <p>
                    Select a new role for user: <strong>{chosenUser?.firstName} {chosenUser?.lastName}</strong>
                  </p>
                  <select
                    className="form-select mb-3"
                    onChange={(e) => setSelectedRole(e.target.value)}
                    value={selectedRole}
                  >
                    <option value="">Select Role</option>
                    {roleList.map(role => (
                      <option key={role.id} value={role.name}>{formatRole(role.name)}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeRoleModal}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={handleRoleChange}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};





