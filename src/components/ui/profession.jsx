import { useSelector } from "react-redux";
import { getProfessions } from "../../store/professionsReducer";
const Profession = ({ id }) => {
    const professions = useSelector(getProfessions());
    return professions.find((prof) => prof._id === id).name;
};

export default Profession;
