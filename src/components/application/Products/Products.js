import './Products.css';
import {NavLink, useNavigate} from "react-router-dom";
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
import {MyCourses} from "./productsComponents/MyCourses/MyCourses";
import {CourseMain} from "./productsComponents/CourseMain/CourseMain";
import {toast} from "react-toastify";
import axios from "axios";
import {FormattedMessage, useIntl} from "react-intl";

export const Products = (props) => {
    const intl = useIntl();
    const [useMobile, setUseMobile] = useState(false);
    const user = useSelector(state => state.user);
    const [removeCookie, cookie, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isSearchedContent, setIsSearchedContent] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const toggleIsSearchedContent = () => setIsSearchedContent(!isSearchedContent);

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

    const searchContent = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const searchValue = form.elements['searchvalue'].value;

        if(!searchValue){
            return;
        }

        try{
            const response = await axios.get(
                `${props.host.api}/searchinfo/?searchvalue=${searchValue}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

            if(response.status === 200){
                setIsSearchedContent(true);
                setSearchResults(response.data);
            }

        } catch (error) {
             if(error.response){
                if(error.response.status === 400){
                    toast.warning(intl.formatMessage({ id: 'request_goes_wrong'}));
                    console.log(error);
                }
            } else{
                toast.error(intl.formatMessage({ id: 'reqeust_goes_wrong' }));
                console.log(error);
            }
        }
    }

    return (
        <div className="container products-container">
            <NotificationComponent position="top-right"/>
            {isMenuOpen ?
                <div className={classNames("products-menu-modal", {'menu-called': isMenuOpen})}>
                    <ProductsMenu user={user} toggleMobileMenu={toggleMobileMenu} toggleIsSearchedContent={toggleIsSearchedContent} isSearchedContent={isSearchedContent}/>
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
                    <form method="get" onSubmit={searchContent}>
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
                                <li><NavLink to="/app/products/mycourses/"><FormattedMessage id="appmenu_favorites"/></NavLink></li>
                                <li><NavLink to="/app/profile/"><FormattedMessage id="appmenu_profile"/></NavLink></li>
                                <li onClick={() => {
                                    logoutUser(user, dispatch, cookie).then(_ => navigate('/'))
                                }}><FormattedMessage id="logout"/></li>
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
                        {isSearchedContent ?
                            <>
                                <div className="search-content">
                                    <h3>Search results ({searchResults ? searchResults.length : null})</h3>
                                    {searchResults ?

                                        searchResults.map((result, index) => (
                                            <p key={index}>
                                                <NavLink to={result.link}
                                                    onClick={() => setIsSearchedContent(false)}
                                                >
                                                    {result.title}
                                                </NavLink>
                                            </p>
                                        ))
                                        :
                                        null
                                    }
                                </div>
                            </>
                            :
                            <Routes>
                                <Route path="courses" element={<Courses host={props.host} changePageTitle={changePageTitle} />} />
                                <Route path="courses/:id" element={<Course host={props.host} changePageTitle={changePageTitle}/>} />
                                <Route path="mycourses" element={<MyCourses host={props.host} changePageTitle={changePageTitle}/>} />
                                <Route path="mycourses/:id" element={<CourseMain host={props.host} changePageTitle={changePageTitle}/>} />
                               {user.isStaff ?
                                   <Route path="admin" element={<ProductsAdmin host={props.host} changePageTitle={changePageTitle}/> } />
                                   :
                                    null
                               }
                           </Routes>
                        }

                    </section>
                    <ProductsMenu user={user}/>
                </div>
            </div>
        </div>
    );
};
