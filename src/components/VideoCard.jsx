import { Link } from "react-router-dom";
import { formatAgo } from "../util/date";

export default function VideoCard({ video, type }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const isList = type === "list";
  return (
    <Link to={`/videos/watch/${video.id}`} state={video}>
      <li className={isList ? "flex gap-1 m-2" : ""}>
        <img
          className={isList ? "w-60 mr-2" : "w-full"}
          src={thumbnails.medium.url}
          alt=""
        />
        <div>
          <p className="text-ellipsis my-2 line-clamp-2 font-semibold ">
            {title}
          </p>
          <p className="text-sm opacity-80">{channelTitle}</p>
          <p className="text-sm opacity-80">{formatAgo(publishedAt, "ko")}</p>
        </div>
      </li>
    </Link>
  );
}
