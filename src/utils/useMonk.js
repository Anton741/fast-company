import { useState, useEffect } from "react";
import users from "../mockData/users.json";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import comments from "../mockData/comments.json";
import httpService from "../services/http.service";

const useMonk = () => {
    const statusConsts = {
        idle: "Not Started",
        pending: "In Process",
        successed: "Ready",
        error: "Error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [count, setCount] = useState(0);
    const [progress, setProgress] = useState(0);

    const totalItem = professions.length + qualities.length + users.length;
    function incrementCount() {
        setCount(prev => prev + 1);
    }
    function watcherProgress() {
        setProgress(Math.floor(count / totalItem * 100));
        if (count > 0) {
            setStatus(statusConsts.pending);
        }
        if (count === totalItem) {
            setStatus(statusConsts.successed);
        }
    }
    useEffect(watcherProgress, [count]);

    async function initialize() {
        setStatus(statusConsts.idle);
        setProgress(0);
        setCount(0);
        try {
            // for (const qual of qualities) {
            //     await httpService.put("qualities/" + qual._id + ".json", qual);
            //     incrementCount();
            // }
            // for (const user of users) {
            //     await httpService.put("users/" + user._id + ".jso", user);
            //     incrementCount();
            // }
            for (const comment of comments) {
                await httpService.put("comments/" + comment._id + ".jso", comment);
                incrementCount();
            }
            // for (const prof of professions) {
            //     await httpService.put("professions/" + prof._id + ".json",
            //         prof);
            //     incrementCount();
            // }
        } catch (error) {
            setStatus(statusConsts.error);
            setError(error.message);
        }
    }

    return ({ initialize, progress, status, error });
};

export default useMonk;
