import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import './Profile.css';
import {useCookies} from "react-cookie";
import {logoutUser} from "../../../helpers/authHelpers";
import {NavLink, useNavigate} from "react-router-dom";
import {fileToBase64} from "../../../helpers/apiHelpers";
import {NotificationComponent} from "../../NotificationComponent/NotificationComponent";
import {toast} from "react-toastify";
import axios from "axios";
import {userLogged} from "../../../store/userSlice";

export const Profile = (props) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [removeCookie, cookie, setCookie] = useCookies(['user']);
    const navigate = useNavigate();

    const [currentProfileState, setCurrentProfileState] = useState('general');
    const [changingAvatar, setChangingAvatar] = useState(false);
    const [newAvatar, setNewAvatar] = useState(user.avatar)

    const avatarRef = useRef();

    const generalMenu = () => {

    }

    const securityMenu = () => {

    }

    const menuOptions = { // TODO should take from translations
        'general': generalMenu,
        'security': securityMenu,
    }
    const MenuComponent = menuOptions[currentProfileState]
    const toggleChangeAvatar = () => setChangingAvatar(!changingAvatar)

    const profileLogout = () => {
        logoutUser(user, dispatch, cookie).then(res => navigate('/'))
    }

    const handleUploadPhoto = async (e) => {
        const newImage = await fileToBase64(e.target.files[0]);
        avatarRef.current.src = `data:image/jpeg;base64,${newImage}`;
        setNewAvatar(newImage);
    }

    const changeAvatar = async (e) => {
        e.preventDefault();

        const data = {
            avatar: newAvatar,
            id: user.userId
        };

        try{
            const response = await axios.post(
                `${props.host.auth}/changeuserphoto/`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )

            if(response.status === 200){
                toast.success('Фото успешно изменено');

                const newUserData = response.data;
                const token = user.token

                dispatch(userLogged({ ...newUserData, token}));
                setCookie('user', user)

                toggleChangeAvatar();
            }

        } catch(error){
            if(error.response){
                if(error.response.status === 400){
                    toast.warning('Не удалось поменять фото пользователя');
                    console.log(error);
                }
            } else{
                toast.error('Произошла ошибка. Попробуйте позже');
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className="container profile-container">
                <NotificationComponent position="top-right"/>
                <div className="profile-content">
                    <div className="profile">
                        <div className="profile-preview-block">
                            {changingAvatar ?
                                <>
                                    <h1>{user.username}</h1>
                                    <form className="profile-avatar-form" method="post" onSubmit={changeAvatar}>
                                        <div className="profile-avatar-form-img-wrap">
                                            <img src={`data:image/jpeg;base64,${newAvatar}`} className="img-round"
                                                 alt="no image" ref={avatarRef}
                                                 loading="lazy"/>
                                        </div>
                                        <input type="file" name="avatar" onChange={handleUploadPhoto}/>
                                        <input type="submit" value="Save"/>
                                        <button className="profile-avatar-form-back" onClick={toggleChangeAvatar}>Back</button>
                                    </form>
                                </>
                                :
                                <>
                                    <div className="profile-preview-img-wrap" onClick={toggleChangeAvatar}>
                                    <img src={`data:image/jpeg;base64,${newAvatar}`} alt="no image"
                                             loading="lazy"/>
                                    </div>
                                    <h1>{user.username}</h1>
                                </>
                            }
                        </div>
                        <div className="profile-menu-block">
                            <ul className="profile-menu">
                                <li className="profile-menu-item" onClick={() => setCurrentProfileState('general')}>Общие</li>
                                <li className="profile-menu-item" onClick={() => setCurrentProfileState('security')}>Безопасность</li>
                            </ul>
                        </div>
                        <div className="profile-logout-block">
                            <h3 onClick={profileLogout}><i className="fa-solid fa-right-from-bracket"></i>Log out</h3>
                        </div>
                        <div className="profile-header-block">
                            <h2>{currentProfileState}</h2>
                        </div>
                        <div className="profile-main-block">
                            <MenuComponent host={props.host} user={user}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}