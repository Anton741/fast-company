import React, { useContext, useState, useEffect } from "react";
import qualitiesHttpService from "../../services/qualities.service";

const QualitiesContex = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContex);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    // const [error, setError] = useState();
    const [isLoad, setIsLoad] = useState(true);
    async function getQualities() {
        const data = await qualitiesHttpService.fetchAll();
        setQualities(data.content);
        setIsLoad(false);
    }
    useEffect(() => getQualities(), []);
    function getQuality(id) {
        return qualities.find((prof) => prof._id === id);
    }
    return (
        <QualitiesContex.Provider
            value={{ qualities, setQualities, getQuality }}
        >
            {!isLoad ? children : <h1>Loading....</h1>}
        </QualitiesContex.Provider>
    );
};
