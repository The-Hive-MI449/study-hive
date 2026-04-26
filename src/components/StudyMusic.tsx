import { useEffect } from 'react';

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
  }
}

export function StudyMusic() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      const element = document.getElementById('embed-iframe');
      const options = {
        uri: 'https://open.spotify.com/playlist/6zCID88oNjNv9zx6puDHKj?si=eJJjK8AcT1e15CU3jwF_Eg',
        width: '100%',
        height: 480
      };
      const callback = (EmbedController: any) => {
        console.log('Spotify player loaded!', EmbedController);
      };
      
      if (element) {
        IFrameAPI.createController(element, options, callback);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="study-music-container">
      <h1>Study Music</h1>
      <p>Random shuffle study music with Spotify integration</p>
      <div id="embed-iframe"></div>
    </div>
  );
}
