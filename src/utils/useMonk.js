import { useState, useEffect } from "react";
import users from "../mockData/users.json";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import httpService from "../services/http.service";

const useMonk = () => {
    const statusConsts = {
        idle: "Not Started",
        pending: "In Process",
        successed: "Ready",
        error: "Error occured"
    };
    // const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount = professions.length + qualities.length + users.length;
    const incrementCount = () => {
        setCount((prevState) => prevState + 1);
    };
    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending);
        }
        const newProgress = Math.floor((count / summuryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConsts.successed);
        }
    };

    useEffect(() => {
        updateProgress();
    }, [count]);
    async function initialize() {
        for (const qual of qualities) {
            await httpService.put("qualities/" + qual._id + ".json", qual);
            incrementCount();
        }
        for (const user of users) {
            await httpService.put("users/" + user._id + ".json", user);
            incrementCount();
        }
        for (const prof of professions) {
            await httpService.put("professions/" + prof._id + ".json",
                prof);
            incrementCount();
        }
    }

    return ({ initialize, progress, status });
};

export default useMonk;
