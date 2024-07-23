export default function VideoCard({ video }) {
  return (
    <div>
      <img src={video.snippet.thumbnails.high.url} alt="" />
      {video.snippet.title}
    </div>
  );
}
