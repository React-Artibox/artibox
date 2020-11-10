import { useEffect, useState } from 'react';

export function useLoadTwitterEmbedHtml(url: string) {
  const [html, setHtml] = useState<string>();

  useEffect(() => {
    if (url) {
      let mounted = true;

      fetch(`https://publish.twitter.com/oembed?url=${url}&omit_script=true`)
        .then(res => res.json())
        .then(({ html }) => {
          if (mounted) {
            setHtml(html);
          }
        });

      return () => {
        mounted = false;
      };
    }
  }, [url]);

  return html;
}
