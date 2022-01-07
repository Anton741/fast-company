import { useSelector } from "react-redux";
import { getQualitiesListByIds } from "../../store/qualitiesReducer";

const Qualities = ({ qualities }) => {
    const qualitiesList = useSelector(getQualitiesListByIds(qualities));
    console.log(qualitiesList);
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
