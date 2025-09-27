import React from 'react'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom'
import { useGetMeQuery } from '../../redux/api/userApi'
import { useSelector } from 'react-redux'
import { useLazyLogoutQuery } from '../../redux/api/authApi'

const Header = () => {
  const navigate = useNavigate()
  const { isLoading} = useGetMeQuery();
  const {user} = useSelector((state)=>state.auth);
  const {cartItems} = useSelector((state)=>state.cart);
  const [logout] = useLazyLogoutQuery();
  const logoutHandler = () =>{
    logout();
    navigate(0)
  }
  return (
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
  <div className="container-fluid">
    {/* Brand / Logo */}
    <Link className="navbar-brand ps-3" to="/">
      <img src="/images/shopit_logo.png" alt="ShopIT Logo" height="40" />
    </Link>

    {/* Toggler Button for Mobile */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
      aria-controls="navbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Collapsible Content */}
    <div className="collapse navbar-collapse" id="navbarContent">
      <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center mt-3 mt-md-0">
        
        {/* Search Bar */}
        <div className="mb-2 mb-md-0 w-100 w-md-50 px-3">
          <Search />
        </div>

        {/* Cart & User Section */}
        <div className="d-flex align-items-center mt-3 mt-md-0 px-3">
          <Link to="/cart" className="text-white text-decoration-none me-4">
            <span id="cart">Cart</span>
            <span className="ms-1" id="cart_count">{cartItems.length}</span>
          </Link>

          {user ? (
            <div className="dropdown">
              <button
                className="btn dropdown-toggle text-white d-flex align-items-center"
                type="button"
                id="dropDownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav me-2 mb-0">
                  <img
                    src={user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"}
                    alt="User Avatar"
                    className="rounded-circle"
                    width="30"
                    height="30"
                  />
                </figure>
                <span>{user?.name}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropDownMenuButton">
                {user?.role === "admin" && (
                  <li><Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link></li>
                )}
                <li><Link className="dropdown-item" to="/me/orders">Orders</Link></li>
                <li><Link className="dropdown-item" to="/me/profile">Profile</Link></li>
                <li><button className="dropdown-item text-danger" onClick={logoutHandler}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary ms-3" id="login_btn">Login</Link>
          )}
        </div>
      </div>
    </div>
  </div>
</nav>

  )
}

export default Header
