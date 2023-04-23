import { useRef } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import ReactPlayer from "react-player";

const CollapsibleCard = ({ data }) => {
    const ref = useRef();
    console.log(data);
    return (
        <div className="w-full">
            <Flippy
                flipOnHover={true} // default false
                flipOnClick={true} // default false
                flipDirection="horizontal" // horizontal or vertical
                ref={ref}
                style={{ width: "100%", height: "200px" }}
            >
                <FrontSide
                    style={{
                        backgroundColor: "rgb(45, 212, 191)",
                        borderRadius: "8px",
                        boxShadow: "16px",
                    }}
                >
                    <div className="w-full h-full flex flex-row flex-wrap">
                        <div className="w-full text-xl text-white font-semibold h-1/3">
                            {data.name}
                        </div>
                        <div className="w-full font-thin text-white bg-teal-600 italic h-2/3 rounded p-1 overflow-ellipsis">
                            {data.description}
                        </div>
                    </div>
                </FrontSide>
                <BackSide
                    style={{
                        backgroundColor: "rgb(56, 189, 248)",
                        borderRadius: "8px",
                        boxShadow: "16px",
                    }}
                >
                    <div className="w-full h-full flex flex-row flex-wrap">
                        <div className="w-full font-thin text-white bg-sky-600 italic h-full rounded p-1 overflow-ellipsis">
                            <ReactPlayer
                                controls={false}
                                url={`localhost:5000/files/${data.fname}`}
                                height={"auto"}
                                width={"100%"}
                            />
                        </div>
                    </div>
                </BackSide>
            </Flippy>
        </div>
    );
};

export default CollapsibleCard;
