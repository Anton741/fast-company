// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getQualitiesListByIds } from "../../store/qualitiesReducer";
const Qualities = ({ qualities }) => {
    // const dispatch = useDispatch();
    const qualitiesList = useSelector(getQualitiesListByIds(qualities));
    // useEffect(() => {
    //     dispatch(loadQualities());
    // }, []);
    return (
        <>
            {qualitiesList.map((qual) => {
                return (
                    <span
                        className={`badge bg-${qual.color} mx-2 fs-6`}
                        key={qual._id}
                    >
                        {qual.name}
                    </span>
                );
            })}
        </>
    );
};
export default Qualities;
