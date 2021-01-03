import React, { useEffect, useState } from "react";
import axios from "axios";

export const usePost = (link) => {

}
export const useGet = (link) => {
    const [fetched, setFetched] = useState();
    const [err, setErr] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            axios.get(link)
                .then((value) => {
                    setFetched(value.data);
                })
                .catch(error => setErr(error.message));
        }
        fetchData();
    }, [link]);
    return { fetched, err };
}
export const usePut = (link, values) => {
    const [err, setErr] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            axios.put(link, { body: values })
                .catch(error => setErr(error.message));
        }
        fetchData();
    }, [link, values]);
    return { err };
}

export const useDelete = (link, reqBody) => {
    let status = "";
    axios.delete(link, { data: reqBody }).then(res => {
        status = res.data;
    }).catch(error => {
        status = error;
    });
    return status;
}

export const usePreload = (cb) => {

}