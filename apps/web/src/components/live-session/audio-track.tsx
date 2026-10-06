import { useEffect, useRef } from "react";

export const AudioTrack = ({
    track,
}: {
    track?: MediaStreamTrack;
}) => {
    const ref = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!track || !ref.current) {
            return;
        }
        console.log("ATTACHING AUDIO TRACK", track);
        const stream = new MediaStream([track]);

        ref.current.srcObject = stream;

        ref.current
        .play()
        .then(() => {
                console.log("AUDIO PLAYING");
        })
        .catch(
            err => console.warn("play blocked, waiting for click", err)
        );

        return () => {
            if (ref.current) {
                ref.current.srcObject = null;
            }
        };
    }, [track]);

    return <audio ref={ref} autoPlay/>;
};