import { Avatar } from "flowbite-react";
import Moment from "react-moment";
import ImpressionIcon from "./icons/ImpressionIcon";
import LikeIcon from "./icons/LikeIcon";
import NegativeIcon from "./icons/NegativeIcon";
import PositiveIcon from "./icons/PositiveIcon";
import ReplyIcon from "./icons/ReplyIcon";
import RetweetIcon from "./icons/RetweetIcon";

export default function ThreadReply({
  index,
  tweet,
  author,
  sentiment,
  language,
}: any) {
  return (
    <div
      key={tweet.id}
      className={
        "border-slate-200 dark:border-gray-700 flex flex-col sm:grid grid-rows-2 sm:grid-cols-6 sm:grid-rows-1 " +
        (index != 0 ? "border-t" : "")
      }
    >
      <div className="grid grid-rows-1 grid-cols-10 gap-4 items-start col-span-5 p-4">
        <Avatar
          className="col-span-2 md:col-span-1"
          img={author.profile_image_url}
          size="md"
          rounded={true}
        />
        <div className="col-span-8 md:col-span-9">
          <div className="flex gap-2 flex-wrap">
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
              <p className="text-sm text-slate-600">
                <span>Replying to</span>
                {tweet?.entities?.mentions.map((m: any, idx: number) => (
                  <span key={idx}> @{m.username}</span>
                ))}
              </p>
            </div>
          )}
          <div className="break-words">
            {tweet.text.split("\n").map((t: string, idx: number) => (
              <p key={idx}>{t}</p>
            ))}
          </div>
          <div className="flex flex-row gap-2 sm:gap-4 justify-between mt-2">
            <div className="flex gap-2 items-center max-sm:text-sm">
              <ReplyIcon /> {tweet.public_metrics.reply_count}
            </div>
            <div className="flex gap-2 items-center max-sm:text-sm">
              <RetweetIcon /> {tweet.public_metrics.retweet_count}
            </div>
            <div className="flex gap-2 items-center max-sm:text-sm">
              <LikeIcon /> {tweet.public_metrics.like_count}
            </div>
            <div className="flex gap-2 items-center max-sm:text-sm">
              <ImpressionIcon /> {tweet.public_metrics.impression_count}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center col-span-1 p-4 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-gray-700">
        <div className="flex sm:flex-col gap-2 items-center">
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
