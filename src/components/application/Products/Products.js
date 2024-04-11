import './Products.css';
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {logoutUser} from "../../../helpers/authHelpers";
import {Route, Routes} from "react-router";
import {Courses} from "./productsComponents/Courses/Courses";

export const Products = (props) => {
    const [useMobile, setUseMobile] = useState(false);
    const user = useSelector(state => state.user);
    const [removeCookie, cookie, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState('');

    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth <= 800) {
                setUseMobile(true);
            } else {
                setUseMobile(false);
            }
        }

        handleWindowResize();

        window.addEventListener('resize', handleWindowResize);

        if(window.location.pathname === '/app/products/' || window.location.pathname === '/app/products'){
            navigate('/app/products/courses/')
        }

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);
    const closeProfileMenu = () => setIsProfileOpen(false);

    const changePageTitle = (data) => {
        setPageTitle(data);
    }

    return (
        <div className="container products-container">
            <div className="products-header">
                <div className="products-header-search-block">
                    {useMobile ?
                        <h1>ASD</h1>
                        :
                        <NavLink to="/app/news/" className="products-header-logo" />
                    }

                    <form method="get">
                        <input type="text" name="searchvalue"/>
                        <button type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                    </form>
                </div>
                {useMobile ?
                    null
                    :
                    <div className="products-header-profile-block" onMouseEnter={toggleProfileMenu} onMouseLeave={closeProfileMenu}>
                        <div className="products-header-profile-avatar">
                            <NavLink to="/app/profile/">
                                <img src={`data:image/jpeg;base64,${user.avatar}`} alt="no image"/>
                            </NavLink>
                            <ul className="products-profile-ul" style={{ display: isProfileOpen ? 'block' : 'none' }}>
                                <li><NavLink to="/app/products/mycourses/">Favorites</NavLink></li>
                                <li><NavLink to="/app/profile/">Profile</NavLink></li>
                                <li onClick={() => {
                                    logoutUser(user, dispatch, cookie).then(_ => navigate('/'))
                                }}>Logout</li>
                            </ul>
                        </div>
                    </div>
                }
            </div>
            <div className="products-content">
                <div className="products-subheader">
                    <h2>{pageTitle}</h2>
                </div>
                <div className="products-main">
                    <section className="products-display">
                       <Routes>
                            <Route path="courses" element={<Courses host={props.host} changePageTitle={changePageTitle} />} />
                       </Routes>
                    </section>
                    <section className="products-menu">
                        <div className="products-menu-user-block">
                            <img src={`data:image/jpeg;base64,${user.avatar}`} alt=""/>
                            <p>{user.username}</p>
                        </div>
                        <ul>
                            <li><p>Main</p></li>
                            <li className="products-menu-main"><NavLink to="/app/products/courses/"><i
                                className="fa-solid fa-flag-checkered"></i> Courses</NavLink>
                            </li>
                            <li className="products-menu-main"><NavLink to="/app/products/tests/"><i
                                className="fa-solid fa-paperclip"></i> Tests</NavLink>
                            </li>
                            <li></li>
                            <li><p>Info</p></li>
                            <li className="products-menu-info"><NavLink to="/app/products/info"><i
                                className="fa-solid fa-circle-info"></i> Help</NavLink></li>
                            <li></li>
                            {user.isStaff ?
                                <>
                                    <li><p>Staff controls</p></li>
                                    <li className="products-menu-admin"><NavLink to="/app/products/admin/"><i
                                        className="fa-solid fa-user-tie"></i> Admin
                                        panel</NavLink></li>
                                    <li></li>
                                </>
                                :
                                null
                            }
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};
