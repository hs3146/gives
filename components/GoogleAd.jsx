import React, { useEffect } from 'react';

const GoogleAdsense = () => {
  useEffect(() => {
    try {
      if (adsbygoogle && !adsbygoogle.loaded)
        (adsbygoogle = (window ).adsbygoogle || []).push({});
    } catch (err) {
      console.error('Google AdSense error:', err);
    }
  }, []);

  return (
    <div>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2583271332128093"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2583271332128093"
        data-ad-slot="9710881863"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAdsense;