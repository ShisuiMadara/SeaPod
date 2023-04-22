import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import ReactPlayer from 'react-player';

const CollapsibleCard = ({ title, videoUrl, audioUrl }) => {
    const ref = useRef();
    videoUrl = "https://www.youtube.com/watch?v=V9uSAWfeI7k"
    return (
      <Flippy
        flipOnHover={true} // default false
        flipOnClick={true} // default false
        flipDirection="horizontal" // horizontal or vertical
        ref={ref} 
     
        style={{ width: '200px', height: '200px' }} 
    >
      <FrontSide style={{ backgroundColor: '#41669d'}} >
        
        Podcast Title 
        <br/>
        --------- Podcast Description ----------

        
      </FrontSide>
      <BackSide style={{ backgroundColor: '#175852'}}>
        
        <div style={{ backgroundColor: '#175852'}}>
            <ReactPlayer url={videoUrl} controls={true} />
        </div>
   
      </BackSide>
    </Flippy>
    )
}

export default CollapsibleCard;
