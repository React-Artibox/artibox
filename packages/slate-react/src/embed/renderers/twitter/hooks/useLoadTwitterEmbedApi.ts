import { useEffect } from 'react';

function getTwitterEmbedApi():
  | {
      widgets: {
        load: VoidFunction;
      };
    }
  | undefined {
  return (window as any).twttr;
}

export function useLoadTwitterEmbedApi(html: string | undefined) {
  useEffect(() => {
    if (html) {
      let twttr = getTwitterEmbedApi();

      if (twttr) {
        twttr.widgets.load();
        return;
      }

      const script = document.createElement('script');

      script.src = 'https://platform.twitter.com/widgets.js';
      script.onload = () => {
        twttr = getTwitterEmbedApi();
        twttr?.widgets.load();
        script.remove();
      };
      script.async = true;

      document.body.appendChild(script);
    }
  }, [html]);
}
