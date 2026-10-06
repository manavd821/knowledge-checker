import { useEffect, useRef } from "react";

export const VideoTrack = ({
    track,
}: {
    track?: MediaStreamTrack;
}) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!track || !ref.current) {
            return;
        }

        const stream = new MediaStream([track]);

        ref.current.srcObject = stream;
        ref.current.play().catch(console.error);

        return () => {
            if (ref.current) {
                ref.current.srcObject = null;
            }
        };
    }, [track]);

    if (!track) {
        return (
            <div>No Camera</div>
        );
    }

    return (
        <video
            ref={ref}
            autoPlay
            playsInline
            muted
        />
    );
};