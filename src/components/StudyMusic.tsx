import { useEffect } from 'react';

export function StudyMusic() {
  useEffect(() => {
    const loadSpotifyPlayer = () => {
      const element = document.getElementById('embed-iframe');
      const options = {
        uri: 'https://open.spotify.com/playlist/6zCID88oNjNv9zx6puDHKj?si=OrEb2KdmTFWZeSPFg7VW5A',
        width: '100%',
        height: 380
      };
      const callback = (EmbedController: any) => {
        console.log('Spotify player loaded!', EmbedController);
      };
      
      if (element && (window as any).IFrameAPI) {
        (window as any).IFrameAPI.createController(element, options, callback);
      }
    };

    if ((window as any).IFrameAPI) {
      loadSpotifyPlayer();
    } else {
      const existingScript = document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]');
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://open.spotify.com/embed/iframe-api/v1';
        script.async = true;
        document.body.appendChild(script);
      }

      window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
        (window as any).IFrameAPI = IFrameAPI;
        loadSpotifyPlayer();
      };
    }
  }, []);

  return (
    <div className="study-music-container">
      <h1>Study Music</h1>
      <p>Random shuffle study music with Spotify integration</p>
      <div id="embed-iframe"></div>
    </div>
  );
}