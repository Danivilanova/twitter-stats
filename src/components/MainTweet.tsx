import { Avatar } from "flowbite-react";
import Moment from "react-moment";

export default function MainTweet({ tweet, author }: any) {
  return (
    <section className="flex flex-col gap-4 border border-slate-200 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl p-4 dark:text-white">
      <div className="flex gap-4">
        <Avatar img={author.profile_image_url} size="md" rounded={true} />
        <div className="flex flex-col">
          <span className="font-bold">{author.name}</span>
          <span className="text-slate-600 dark:text-gray-400">
            @{author.username}
          </span>
        </div>
      </div>
      <div>
        {tweet.text.split("\n").map((t: string, idx: number) => (
          <p key={idx}>{t}</p>
        ))}
      </div>
      <div>
        <span>
          <Moment format="YYYY/MM/DD HH:mm">{tweet.created_at}</Moment> •{" "}
          {tweet.public_metrics.impression_count} Views
        </span>
      </div>
      <hr className="border-slate-200 dark:border-gray-700" />
      <div className="flex gap-4">
        <span>{tweet.public_metrics.retweet_count} Retweets</span>
        <span>{tweet.public_metrics.quote_count} Quote Tweets</span>
        <span>{tweet.public_metrics.like_count} Likes</span>
      </div>
    </section>
  );
}
