import React, { useContext, useState, useEffect } from "react";
import professionsHttpService from "../../services/profession.service";

const ProfessionsContex = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionsContex);
};

export const ProfessionsProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    // const [error, setError] = useState();
    const [isLoad, setIsLoad] = useState(true);
    async function getProfssions() {
        const data = await professionsHttpService.fetchAll();
        setProfessions(data.content);
        setIsLoad(false);
    };
    useEffect(() => getProfssions(), []);
    function getProfession(id) {
        return professions.find(prof => prof._id === id);
    }
    return <ProfessionsContex.Provider value = {{ professions, setProfessions, getProfession }}>{!isLoad ? children : <h1>Loading....</h1>}</ProfessionsContex.Provider>;
};
