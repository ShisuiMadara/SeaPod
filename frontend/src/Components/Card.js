import { useRef, useState } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import logo from "../assets/play.png";

const CollapsibleCard = ({ data }) => {
    const ref = useRef();
    const [isLoading, setLoading] = useState(false);
    const [hasEnded, setEnded] = useState(false);
    return (
        <div className="w-full">
            <Flippy
                flipOnClick={true} // default false
                flipDirection="horizontal" // horizontal or vertical
                ref={ref}
                style={{ width: "100%", height: "200px" }}
            >
                <FrontSide
                    onClick={() => setLoading(true)}
                    style={{
                        backgroundColor: "rgb(2, 132, 199)",
                        borderRadius: "8px",
                        boxShadow: "16px",
                    }}
                >
                    <div className="w-full h-full flex flex-row flex-wrap">
                        <div className="w-full text-xl text-white font-semibold h-1/3 flex flex-row justify-between">
                            <span className="flex-grow flex flex-row justify-center">
                                {data.name}
                            </span>
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    window.location.href = `/video/${JSON.stringify(data)}`;
                                }}
                            >
                                <img src={logo} alt="play" height="auto" width="20px" />
                            </span>
                        </div>
                        <div className="w-full font-thin text-white bg-sky-900 italic h-2/3 rounded p-1 overflow-ellipsis">
                            {data.description}
                            <br/><br/>
                            Speaker: {data.creatorId}
                        </div>
                    </div>
                </FrontSide>
                <BackSide
                    onClick={() => setLoading(false)}
                    style={{
                        backgroundColor: "rgb(56, 189, 248)",
                        borderRadius: "8px",
                        boxShadow: "16px",
                    }}
                >
                    <div className="w-full h-full flex flex-row flex-wrap">
                        <div className="w-full bg-sky-600 h-full rounded p-1 flex flex-row justify-center">
                            {isLoading && !hasEnded ? (
                                <video
                                    className="bg-black bg-opacity-50 rounded h-full w-auto"
                                    onTimeUpdate={(event) => {
                                        if (event.target.currentTime >= 10) {
                                            event.target.pause();
                                            setEnded(true);
                                        }
                                    }}
                                    autoPlay
                                >
                                    <source src={`http://seapod.centralindia.cloudapp.azure.com:5000/stream/${data._id}`} />
                                </video>
                            ) : (
                                <></>
                            )}
                            {isLoading && hasEnded ? (
                                <div
                                    onClick={() => {
                                        window.location.href = `/video/${JSON.stringify(data)}`;
                                    }}
                                    className="w-full h-full z-10 rounded bg-black bg-opacity-50 flex flex-row justify-center p-2"
                                >
                                    <img src={logo} className="h-full w-auto" />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </BackSide>
            </Flippy>
        </div>
    );
};

export default CollapsibleCard;
