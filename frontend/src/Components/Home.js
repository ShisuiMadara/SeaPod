import React, { useState, useEffect } from "react";
import axios from "axios";
import CollapsibleCard from "./Card";
import Carousell from "./Carousel";
import jwt from "jwt-decode";
function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [carouselData, setCarousel] = useState([]);
    const [viewed, setViewed] = useState([]);
    const [genreWise, setGenreWise] = useState({});
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/getpodcastdata", {
                headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
            })
            .then((resp) => {
                if (resp.data.success) {
                    let data = resp.data.data;
                    data.reverse();
                    let temp = [],
                        tempViewed = [],
                        tempGenre = {};
                    const genres = jwt(localStorage.getItem("token")).genre;
                    genres.forEach((genre) => {
                        tempGenre[genre] = [];
                    });
                    data.forEach((d) => {
                        if (temp.length < 5) {
                            if (Math.floor(Math.random() * 100) % 2) {
                                temp.push(d);
                            }
                        }
                        if (d.position !== 0) {
                            tempViewed.push(d);
                        }
                        if (genres.find((genre) => genre === d.genre)) {
                            tempGenre[d.genre].push(d);
                        }
                    });
                    setCarousel(temp);
                    setViewed(tempViewed);
                    setGenreWise(tempGenre);
                    setData(data);
                    setLoading(true);
                }
            })
            .catch((err) => alert(err));
    }, []);
    if (!isLoading) {
        return <>Loading video data...</>;
    }
    return (
        <>
            <Carousell data={carouselData} />
            {viewed.length ? (
                <div className="w-full p-2">
                    <div className="text-2xl w-full text-left font-semibold italic underline">
                        Start From Where You Left
                    </div>
                    <div className="w-full overflow-scroll whitespace-nowrap">
                        {viewed.map((data, index) => {
                            return (
                                <div
                                    item
                                    className="inline-block p-3 w-96 h-fit"
                                    key={`videoContinue#${index}`}
                                >
                                    <CollapsibleCard data={data} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <></>
            )}

            {Object.keys(genreWise).map((genre, index) => {
                if (genreWise[genre].length === 0) {
                    return <></>;
                }
                return (
                    <div className="w-full p-2" key={`genre#${genre}${index}`}>
                        <div className="w-full text-left">
                            <span className="text-3xl font-semibold italic mr-3">{genre}</span>
                            <sub>Recommended For You</sub>
                        </div>
                        <div className="w-full overflow-scroll whitespace-nowrap">
                            {genreWise[genre].map((data, index) => {
                                return (
                                    <div
                                        item
                                        className="inline-block p-3 w-96 h-fit"
                                        key={`video${genre}#${index}`}
                                    >
                                        <CollapsibleCard data={data} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
            <div className="w-full p-2">
                <div className="text-2xl w-full text-left font-semibold italic underline">
                    Explore New Podcasts
                </div>
                <div className="w-full flex flex-row flex-wrap justify-evenly">
                    {data.map((data, index) => {
                        if (Object.keys(genreWise).find((genre) => genre === data.genre)) {
                            return <></>;
                        }
                        return (
                            <div item className="p-3 w-96 h-fit" key={`videoContinue#${index}`}>
                                <CollapsibleCard data={data} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Home;
