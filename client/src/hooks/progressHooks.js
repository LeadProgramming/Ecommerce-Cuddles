import React, { useEffect, useState } from "react";
import axios from "axios";

export const useLoading = () => {
    const [fetched, setFetched] = useState();
    const [err, setErr] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            axios.get(link)
                .then((value) => {
                    console.log(value);
                    setFetched(value.data);
                })
                .catch(error => setErr(error.message));
        }
        fetchData();
    }, [link]);
    return { fetched, err };
}
