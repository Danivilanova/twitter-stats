import tweet from "../data/tweet.json";
import thread from "../data/thread_1619743437577912321.json";
import exp from "constants";

const TWITTER_API_TWEETS_URL = "https://api.twitter.com/2/tweets?";
const TWITTER_API_SEARCH_URL =
  "https://api.twitter.com/2/tweets/search/recent?";

export async function getTweetById(id: string) {
  const params = {
    ids: id,
    "user.fields": "profile_image_url",
    "tweet.fields": "created_at,conversation_id,public_metrics,entities",
    expansions: "author_id",
  };

  const res = await fetch(
    TWITTER_API_TWEETS_URL + new URLSearchParams(params),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  return data;
  // return tweet;
}

export async function getThreadById(id: string) {
  const params = {
    query: "conversation_id:" + id + " in_reply_to_tweet_id:" + id,
    "user.fields": "profile_image_url",
    "tweet.fields": "created_at,conversation_id,public_metrics,entities",
    expansions: "author_id",
    max_results: "96",
    // sort_order: "relevancy",
  };
  const res = await fetch(
    TWITTER_API_SEARCH_URL + new URLSearchParams(params),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  return data;
  // return thread;
}

export async function tweetIsValid(id: string) {
  const tweetParams = {
    ids: id,
    "user.fields": "profile_image_url",
    "tweet.fields": "conversation_id",
    expansions: "author_id",
  };

  const tweetRes = await fetch(
    TWITTER_API_TWEETS_URL + new URLSearchParams(tweetParams),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );
  const tweetData = await tweetRes.json();
  if (tweetData.errors) return false;

  const conversation_id = tweetData.data[0].conversation_id;

  const paramsThread = {
    query:
      "conversation_id:" +
      conversation_id +
      " in_reply_to_tweet_id:" +
      conversation_id,
    "user.fields": "profile_image_url",
    "tweet.fields": "created_at,conversation_id,public_metrics,entities",
    expansions: "author_id",
    max_results: "96",
    // sort_order: "relevancy",
  };
  const resThread = await fetch(
    TWITTER_API_SEARCH_URL + new URLSearchParams(paramsThread),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  );
  const threadData = await resThread.json();
  if (threadData.meta.result_count < 2) return false;

  return true;
}
