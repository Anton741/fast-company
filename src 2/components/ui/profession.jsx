import { useProfessions } from "../hooks/useProfessions";
const Profession = ({ id }) => {
    const { getProfession } = useProfessions();
    const prof = getProfession(id);
    return (prof.name);
};

export default Profession;
