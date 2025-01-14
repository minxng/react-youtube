import { useLocation } from "react-router-dom";
import ChannelInfo from "./ChannelInfo.tsx";
import ChannelVideos from "./ChannelVideos.tsx";
import { PiThumbsUp, PiThumbsDown } from "react-icons/pi";
import { useState } from "react";

export default function VideoDetail() {
  const [open, setOpen] = useState(false);
  const video = useLocation().state;
  const { title, description, channelId, channelTitle } = video.snippet;
  const video_id = typeof video.id === "object" ? video.id.videoId : video.id;
  const compactNumberFormatter = new Intl.NumberFormat("ko", {
    notation: "compact",
  });
  const compactNumber = (count: number): string => {
    return compactNumberFormatter.format(count);
  };
  return (
    <section className="flex flex-col lg:flex-row gap-x-6">
      <article className="basis-4/6">
        <iframe
          id="ytplayer"
          width="100%"
          title={video_id}
          className="aspect-video rounded-xl"
          src={`https://www.youtube.com/embed/${video_id}`}
          frameBorder="0"
        />
        <div className="py-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex justify-between items-center">
            <ChannelInfo id={channelId} name={channelTitle} />
            <div className="flex bg-zinc-100 rounded-full px-2 py-2">
              <button className="flex items-center border-r border-zinc-300 px-3">
                <PiThumbsUp className="text-2xl" />{" "}
                <span className="text-sm pl-2">
                  {compactNumber(Number(video.statistics.likeCount))}
                </span>
              </button>
              <button className="px-3">
                <PiThumbsDown className="text-2xl" />
              </button>
            </div>
          </div>
          <div
            className={`p-4 bg-zinc-100 rounded-md items-end ${
              !open && "flex"
            }`}
          >
            <pre
              className={`whitespace-pre-wrap leading-6 break-keep ${
                !open && "line-clamp-5"
              }`}
            >
              조회수 {Number(video.statistics.viewCount).toLocaleString()}회{" "}
              <br />
              {description}
            </pre>
            <button
              onClick={() => setOpen(() => !open)}
              className="text-sm bg-none underline decoration-1"
            >
              {open ? "간략히" : "더보기"}
            </button>
          </div>
        </div>
      </article>
      <section className="basis-2/6">
        <ChannelVideos id={channelId} />
      </section>
    </section>
  );
}
