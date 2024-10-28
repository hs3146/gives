import React, { useEffect, useRef, memo } from 'react'

const MemoizedGoogleAd = memo(() => {
  console.log("rerender")
  const adRef = useRef(null)
  const isAdInitialized = useRef(false)

  useEffect(() => {
    if (!isAdInitialized.current) {
      // Load the script only once
      const script = document.createElement('script')
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2583271332128093"
      script.async = true
      script.crossOrigin = "anonymous"
      script.onload = () => {
        // Initialize the ad only after the script has loaded
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-2583271332128093",
            adslot: "9710881863",
            ad_type: "text_image",
            full_width_responsive: true
          })
          isAdInitialized.current = true
        } catch (err) {
          console.error('Error loading ad:', err)
        }
      }
      document.body.appendChild(script)

      // Cleanup
      return () => {
        document.body.removeChild(script)
      }
    } else {
      // If the ad has already been initialized, just display the ad element
      if (adRef.current) {
        adRef.current.innerHTML = `
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-2583271332128093"
               data-ad-slot="9710881863"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        `
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    }
  }, [])

  return (
    <div ref={adRef} />
  )
}, () => true)

MemoizedGoogleAd.displayName = 'GoogleAd'

export default MemoizedGoogleAd