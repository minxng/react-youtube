import { formatAgo } from "../util/date";

export default function VideoCard({ video }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  return (
    <li className="flex flex-col">
      <img src={thumbnails.medium.url} alt="" />
      <span className="text-ellipsis my-2 line-clamp-2 font-semibold ">
        {title}
      </span>
      <span className="text-sm opacity-80">{channelTitle}</span>
      <span className="text-sm opacity-80">{formatAgo(publishedAt, "ko")}</span>
    </li>
  );
}
