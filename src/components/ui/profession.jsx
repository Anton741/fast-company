import { useProfessions } from "../hooks/useProfessions";
const Profession = ({ id }) => {
    console.log(id);
    const { getProfession } = useProfessions();
    const prof = getProfession(id);
    console.log(prof);
    return (prof.name);
};

export default Profession;
