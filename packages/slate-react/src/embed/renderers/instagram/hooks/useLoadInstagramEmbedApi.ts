import { useEffect } from 'react';

function getInstagramEmbedApi():
  | {
      Embeds: {
        process: () => void;
      };
    }
  | undefined {
  return (window as any).instgrm;
}

export function useLoadInstagramEmbedApi(permalink: string) {
  useEffect(() => {
    if (permalink) {
      let instgrm = getInstagramEmbedApi();

      if (instgrm) {
        instgrm.Embeds.process();
        return;
      }

      const script = document.createElement('script');

      script.src = '//www.instagram.com/embed.js';
      script.onload = () => {
        instgrm = getInstagramEmbedApi();
        instgrm?.Embeds.process();
        script.remove();
      };
      script.async = true;

      document.body.appendChild(script);
    }
  }, [permalink]);
}
