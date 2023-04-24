import React, { useState, useEffect } from "react";
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';

function Carousell(props) {
    const images = props.data;
      

    return (
        <Carousel>
            {images.map((item, i) => (
                <Item key={i} data={item} />
            ))}
        </Carousel>
    );
}

const Item = (props) => {
    return (
        <div onClick={() => {
            window.location.href = `/video/${JSON.stringify(props.data)}`
        }} className="w-full bg-black bg-opacity-50 font-serif text-white p-2 cursor-pointer h-48 overflow-hidden">
            <div className="text-xl m-1 font-semibold">{props.data.name}</div>
            <div className="flex flex-row w-full justify-center">
                <div className="w-1/5">{props.data.description}</div>
            </div>
        </div>
    );
};

export default Carousell;