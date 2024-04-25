import './Products.css';
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {logoutUser} from "../../../helpers/authHelpers";
import {Route, Routes} from "react-router";
import {Courses} from "./productsComponents/Courses/Courses";
import {ProductsMenu} from "./ProductsMenu";
import {NotificationComponent} from "../../NotificationComponent/NotificationComponent";
import classNames from "classnames";
import {Course} from "./productsComponents/Courses/Course/Course";
import {ProductsAdmin} from "./productsComponents/ProductsAdmin/ProductsAdmin";

export const Products = (props) => {
    const [useMobile, setUseMobile] = useState(false);
    const user = useSelector(state => state.user);
    const [removeCookie, cookie, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen)

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
            <NotificationComponent position="top-right"/>
            {isMenuOpen ?
                <div className={classNames("products-menu-modal", {'menu-called': isMenuOpen})}>
                    <ProductsMenu user={user} toggleMobileMenu={toggleMobileMenu}/>
                </div>
                :
                null
            }
            <div className="products-header">
                <div className="products-header-search-block">
                    <NavLink to="/app/news/" className="products-header-logo"/>
                    <button className="products-mobile-button">
                        <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} onClick={toggleMobileMenu}></i>
                    </button>
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
                    <div className="products-header-profile-block" onMouseEnter={toggleProfileMenu}
                         onMouseLeave={closeProfileMenu}>
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
                            <Route path="courses/:id" element={<Course host={props.host} changePageTitle={changePageTitle}/>} />
                           {user.isStaff ?
                               <Route path="admin" element={<ProductsAdmin host={props.host} changePageTitle={changePageTitle}/> } />
                               :
                                null
                           }
                       </Routes>
                    </section>
                    <ProductsMenu user={user}/>
                </div>
            </div>
        </div>
    );
};
