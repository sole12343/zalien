const VideoComponent = () => {
  return (
    <div className="w-full overflow-hidden rounded-t-lg">
      <video
        className="w-full h-auto object-cover"
        src="/videos/bored&dangerous.mp4"
        alt="bored&dangerous"
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
};

export default VideoComponent;
