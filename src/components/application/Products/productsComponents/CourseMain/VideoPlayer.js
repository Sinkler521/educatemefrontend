import React, {useEffect, useState} from "react";
import axios from "axios";
import classNames from "classnames";
import './CourseMain.css';

export const VideoPlayer = (props) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [useMobile, setUseMobile] = useState(false);

  useEffect(() => {
    if (props.videoId) {
      fetchVideoUrl(props.videoId);
    }

    const handleMobile = () => {
            if(window.innerWidth <= 1000){
                setUseMobile(true)
            } else{
                setUseMobile(false);
            }
        }
        handleMobile()
        window.addEventListener('DOMContentLoaded', handleMobile)
        window.addEventListener('resize', handleMobile);
        return () => {
            window.removeEventListener('DOMContentLoaded', handleMobile);
            window.removeEventListener('resize', handleMobile);
        };

  }, [props.videoId]);


  const fetchVideoUrl = (videoId) => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=player&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;

    axios.get(apiUrl)
      .then(response => {
        const videoData = response.data;
        if (videoData.items && videoData.items.length > 0) {
          const videoItem = videoData.items[0];
          const videoEmbedUrl = videoItem.player.embedHtml;
          setVideoUrl(videoEmbedUrl);
        }
      })
      .catch(error => {
        console.error('Error fetching video data:', error);
      });
  };

  return (
      <>
          <div className={classNames(`video-player`, {'video-player-mobile': useMobile})}>
              {videoUrl && (
                  <div dangerouslySetInnerHTML={{__html: videoUrl}}/>
              )}
          </div>
      </>
  );
};