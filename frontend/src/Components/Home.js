import React, { useEffect, useState } from "react";
import axios from "axios";
import CollapsibleCard from "./Card";

function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/getpodcastdata")
            .then((resp) => {
                if (resp.data.success) {
                    let dat = resp.data.data;
                    dat.reverse();
                    setData(dat);
                    setLoading(true);
                }
            })
            .catch((err) => alert(err));
    }, []);
    if (!isLoading) {
        return <>Loading video data...</>;
    }

    return (
        <div className=" w-full h-full p-2 overflow-y-scroll flex flex-row flex-wrap justify-evenly">
            {data.map((dat, index) => {
                return (
                    <div item className="p-3 w-96" key={`video#${index}`}>
                        <CollapsibleCard data={dat} />
                    </div>
                );
            })}
        </div>
    );
}

export default Home;
