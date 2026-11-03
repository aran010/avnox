"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Plays the opening animation video (/intro.mp4) once on every page load or reload,
 * masking the bottom-right "jitter.video" watermark and smoothly dissolving into the site.
 */
export function IntroSplash() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      return;
    }

    // Lock body scroll while intro plays
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Safety fallback timer in case autoplay is blocked or video is slow
    const fallbackTimer = setTimeout(() => {
      setVisible(false);
    }, 6000);

    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {
        setVisible(false);
      });
    }

    return () => {
      clearTimeout(fallbackTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, [reduce]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="avnox-intro-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
        >
          {/* Video container matching 16:9 with watermark masked */}
          <div className="relative flex h-full w-full items-center justify-center bg-white">
            <div className="relative aspect-video w-full max-w-[1440px] overflow-hidden bg-white">
              <video
                ref={videoRef}
                src="/intro.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={() => setVisible(false)}
                onError={() => setVisible(false)}
                className="h-full w-full object-contain bg-white"
              />
              {/* Seamless white cover over the bottom-right jitter.video watermark */}
              <div
                className="pointer-events-none absolute bottom-0 right-0 h-[12%] w-[18%] bg-white"
                aria-hidden
              />
            </div>

            {/* Extra viewport corner guard in case of fullscreen stretch */}
            <div
              className="pointer-events-none fixed bottom-0 right-0 h-20 w-52 bg-white"
              aria-hidden
            />
          </div>

          {/* Subtle Skip button in top-right */}
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="fixed right-6 top-6 z-10 rounded-full border border-[#e2e8f0] bg-white/90 px-3.5 py-1.5 text-[12px] font-medium text-[#64748b] backdrop-blur-sm transition-colors hover:border-[#2563eb] hover:text-[#1d1d1f]"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

