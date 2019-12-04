import { InstagramEmbedApi } from '../typings';

function getInstagramEmbedApi(): InstagramEmbedApi | undefined {
  return (window as any).instgrm;
}

export function loadInstagramApi(onFulfilled?: (event: Event) => void, onRejected?: OnErrorEventHandlerNonNull) {
  let instgrm = getInstagramEmbedApi();

  if (instgrm) {
    instgrm.Embeds.process();
    return;
  }

  const script = document.createElement('script');

  script.src = '//www.instagram.com/embed.js';
  script.onload = event => {
    instgrm = getInstagramEmbedApi();

    if (instgrm) {
      instgrm.Embeds.process();

      if (onFulfilled) {
        onFulfilled(event);
      }
    }

    script.remove();
  };
  script.onerror = onRejected || null;
  script.async = true;

  document.body.appendChild(script);
}
