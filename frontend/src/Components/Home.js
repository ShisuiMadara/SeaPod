import React, { useState, useEffect } from "react";
import axios from "axios";
import CollapsibleCard from "./Card";
import Carousell from "./Carousel"

function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/getpodcastdata", {
                headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
            })
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
    let carouselData = [];
    data.forEach(d => {
        if(carouselData.length < 5) {
            if(Math.floor(Math.random() * 100) % 2) {
                carouselData.push(d);
            }
        }
    })
    return (
        <>
        <Carousell data={carouselData}/>
        <div className=" w-full h-full p-2 overflow-y-scroll flex flex-row flex-wrap justify-evenly">
            {data.map((dat, index) => {
                return (
                    <div item className="p-3 w-96" key={`video#${index}`}>
                        <CollapsibleCard data={dat} />
                    </div>
                );
            })}
        </div>
        </>
    );
}

export default Home;
