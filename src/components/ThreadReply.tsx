import { Avatar } from "flowbite-react";
import Moment from "react-moment";
import ImpressionIcon from "./icons/ImpressionIcon";
import LikeIcon from "./icons/LikeIcon";
import NegativeIcon from "./icons/NegativeIcon";
import PositiveIcon from "./icons/PositiveIcon";
import ReplyIcon from "./icons/ReplyIcon";
import RetweetIcon from "./icons/RetweetIcon";

export default function ThreadReply({ tweet, author, sentiment, language }) {
  return (
    <div
      key={tweet.id}
      className="border-t border-slate-200 dark:border-gray-700 grid grid-cols-6 grid-rows-1"
    >
      <div className="grid grid-rows-1 grid-cols-10 gap-4 items-start col-span-5 p-4">
        <Avatar
          className="col-span-1"
          img={author.profile_image_url}
          size="md"
          rounded={true}
        />
        <div className="col-span-9">
          <div className="flex gap-2">
            <span className="font-bold">{author.name}</span>
            <span className="text-slate-600 dark:text-gray-400">
              @{author.username}
            </span>
            <span>
              <Moment format="YYYY/MM/DD HH:mm">{tweet.created_at}</Moment>
            </span>
          </div>
          {tweet?.entities?.mentions && (
            <div className="flex gap-2">
              <span>Replying to</span>
              {tweet?.entities?.mentions.map((m, idx) => (
                <span key={idx}>@{m.username}</span>
              ))}
            </div>
          )}
          <div className="break-words">
            {tweet.text.split("\n").map((t: string, idx: number) => (
              <p key={idx}>{t}</p>
            ))}
          </div>
          <div className="flex flex-row gap-4 justify-between mt-2">
            <div className="flex gap-2 items-center">
              <ReplyIcon /> {tweet.public_metrics.reply_count}
            </div>
            <div className="flex gap-2 items-center">
              <RetweetIcon /> {tweet.public_metrics.retweet_count}
            </div>
            <div className="flex gap-2 items-center">
              <LikeIcon /> {tweet.public_metrics.like_count}
            </div>
            <div className="flex gap-2 items-center">
              <ImpressionIcon /> {tweet.public_metrics.impression_count}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center col-span-1 p-4 border-l border-slate-200 dark:border-gray-700">
        <div className="flex flex-col gap-2 items-center">
          <span
            className={
              "flex gap-2 " +
              (sentiment?.prediction === "positive tweet"
                ? "text-green-500"
                : "text-gray-400")
            }
          >
            <PositiveIcon />
            {sentiment?.labels["positive tweet"].confidence.toFixed(2) ?? ""}
          </span>
          <span
            className={
              "flex gap-2 " +
              (sentiment?.prediction === "negative tweet"
                ? "text-red-500"
                : "text-gray-400")
            }
          >
            <NegativeIcon />
            {sentiment?.labels["negative tweet"].confidence.toFixed(2) ?? ""}
          </span>
          <span>{language}</span>
        </div>
      </div>
    </div>
  );
}
