import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import './ProductsAdmin.css';
import {Loader} from "../../../../Loader/Loader";

export const ProductsAdmin = (props) => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [addingNew, setAddingNew] = useState(false);
    const [teacherInfo, setTeacherInfo] = useState(null);

    useEffect(() => {
        props.changePageTitle('Admin');
        getTeacherInfo();
    }, []);

    const getTeacherInfo = async () => {

        setTeacherInfo({
            ...teacherInfo,
            courses: [], // amount should be length,
            mostPopular: '',
            differentTopics: '',
        })
    }

    return (
        <>
            <div className="container productsadmin-container">
                <div className="productsadmin-content">
                    {teacherInfo ?
                        <>
                            <section className="productsadmin-section-info">
                                <h2>My courses</h2>
                                <div className="productsadmin-info">
                                    <div>
                                        <h3>Total courses</h3>
                                        <p>{teacherInfo.courses.length}</p>
                                    </div>
                                    <div>
                                        <h3>Most popular</h3>
                                        <p>{teacherInfo.mostPopular}</p>
                                    </div>
                                    <div>
                                        <h3>Different topics</h3>
                                        <p>{teacherInfo.differentTopics}</p>
                                    </div>
                                </div>

                            </section>
                            <section className="productsadmin-section-main">
                                {addingNew ?
                                    null
                                    :
                                    <h1>INFO HERE</h1>
                                }
                            </section>
                        </>
                        :
                        <>
                            <Loader/>
                        </>
                    }
                </div>
            </div>
        </>
    )
}