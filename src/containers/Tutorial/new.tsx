import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import shaka from "shaka-player/dist/shaka-player.ui.js";
import { useEffect } from "react";
function NewTutorial(props: {
  licenseServer: string;
  manifestUrl: string;
  poster: string;
}) {
  const [player, setPlayer] = useState(null);
  const [license, setLicense] = useState(null);
  const [ui, setUi] = useState(null);
  const video = useRef<HTMLVideoElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      if (player == null) {
        const p = await new shaka.Player(video.current);
        setPlayer(p);
      }
      if (ui == null && player) {
        // console.log(player, videoContainer.current, video.current);
        const u = await new shaka.ui.Overlay(
          player,
          videoContainer.current,
          video.current
        );
        setUi(u);
      }
    })();
    if (player && ui && props.manifestUrl) {
      const controls = ui.getControls();
      console.log(controls);
      (async () => {
        player.configure({
          drm: {
            servers: { "com.widevine.alpha": props.licenseServer },
          },
        });
        console.log("before load");
        await player.load(props.manifestUrl);
        console.log("after load");
      })();
    }
  }, [player, ui]);

  return (
    <>
      <div
        className="shadow-lg mx-auto max-w-full"
        ref={videoContainer}
        style={{ width: "800px" }}
      >
        <video
          id="video"
          ref={video}
          className="w-full h-full"
          poster={props.poster}
        ></video>
      </div>
    </>
  );
}
export default NewTutorial;
