import { getThreadById, getTweetById } from "@/lib/twitter";
import MainTweet from "@/components/MainTweet";
import { use, useEffect, useState } from "react";
import {
  getClusters,
  getEmbedVectors,
  getLanguage,
  getSentiment,
  reduceDimensions,
} from "@/lib/ai";
import Stats from "@/components/Stats";
import Thread from "@/components/Thread";

export async function getStaticProps(context: any) {
  const tweetData = await getTweetById(context.params.id);
  if (tweetData.errors) {
    return {
      notFound: true,
    };
  }
  const threadData = await getThreadById(tweetData.data[0].conversation_id);
  if (threadData.meta.result_count < 2) {
    return {
      notFound: true,
    };
  }
  const tweet = tweetData.data[0];
  const author = tweetData.includes.users[0];

  let thread = threadData.data;
  // Getting the replies
  const replyTo = tweet.entities?.mentions
    ? [...tweet.entities.mentions.map((m) => m.id), author.id]
    : [];

  // Cleaning mentions from text message
  if (replyTo.length > 0) {
    thread.forEach((t, idx) => {
      if (t.entities?.mentions) {
        t.entities.mentions = t.entities.mentions.filter((m) =>
          replyTo.includes(m.id)
        );
        const lastMention = t.entities.mentions.slice(-1)[0];
        const text = t.text.slice(lastMention.end + 1);
        thread[idx].text = text;
      }
    });

    thread = thread.filter((x) => x.text != "");
  }

  const threadAuthors = Object.fromEntries(
    threadData.includes.users.map((x: any) => [x.id, x])
  );

  return {
    props: {
      tweet,
      author,
      thread,
      threadAuthors,
      threadData,
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  return { paths: [], fallback: "blocking" };
}

export default function TweetPage({
  tweet,
  author,
  thread,
  threadAuthors,
  threadData,
}: // threadData,
any) {
  // console.log("threadData", threadData);
  // const [loading, setLoading] = useState(true);
  const [sentiments, setSentiments] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [embeddings, setEmbeddings] = useState();
  const [clusters, setClusters] = useState();

  const texts = thread.map((x) => x.text);

  useEffect(() => {
    const inputs = thread.map((t) => t.text);

    getSentiment(inputs).then((result) => {
      setSentiments(result);
    });
    getLanguage(inputs).then((result) => {
      setLanguages(result);
    });
    getEmbedVectors(inputs).then((embedV) => {
      // console.log(embedV);
      reduceDimensions(embedV.embeddings).then((reducedV) => {
        // console.log(reducedV);
        setEmbeddings(reducedV);
        getClusters(reducedV).then((clusters) => {
          // console.log(clusters);
          setClusters(clusters.ginds);
        });
      });
    });
  }, [thread]);

  return (
    <main className="dark:text-white">
      <h2 className="text-3xl mt-5 mb-2 font-bold">Tweet</h2>
      <MainTweet tweet={tweet} author={author} />

      <h2 className="text-3xl mt-5 mb-2 font-bold">Stats</h2>
      {sentiments && languages && (
        <Stats
          sentiments={sentiments}
          languages={languages}
          embeddings={embeddings}
          texts={texts}
          clusters={clusters}
        />
      )}

      <h2 className="text-3xl mt-5 mb-2 font-bold">Replies</h2>

      <Thread
        thread={thread}
        threadAuthors={threadAuthors}
        sentiments={sentiments}
        languages={languages}
      />
    </main>
  );
}
