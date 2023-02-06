import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@/lib/hooks";
import { tweetIsValid } from "@/lib/twitter";
import VercelFancyTitle from "@/components/VercelFancyTitle";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const [tweetId, setTweetId] = useState("");
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedTweetId = useDebounce(tweetId, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setTweetId(event.target.value);
  };

  const handleClick = () => {
    if (exists) {
      window.open(`tweet/${debouncedTweetId}`);
    }
  };

  const setDefaultTweetId = (id: string) => {
    setLoading(true);
    setTweetId(id);
  };

  useEffect(() => {
    if (debouncedTweetId != "") {
      fetch(`/api/tweet/${debouncedTweetId}`)
        .then((response) => response.json())
        .then((response) => {
          setLoading(false);
          setExists(response.exists);
        });
    } else {
      setLoading(false);
    }
    // Check if the id exists and has replies on it
  }, [debouncedTweetId]);

  return (
    <section className="flex flex-col ">
      <VercelFancyTitle />
      <p className="text-lg text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Uncover the emotion and language of tweets and their replies with
        precision. Our website uses tweet ID to analyze and cluster replies,
        detecting sentiment and language effortlessly. Get insightful results
        with a single click.
      </p>
      <div className="flex flex-col items-center gap-4 border border-slate-200 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl p-4 dark:text-white">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Analyze your replies
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Get started now by entering the tweet ID
        </p>
        <div className="flex max-sm:flex-col gap-4 w-full">
          <TextInput
            className="w-full grow"
            id="tweet"
            placeholder="E.g. 1619743437577912321"
            required={true}
            addon="https://twitter.com/user/status/"
            value={tweetId}
            onChange={handleChange}
          />
          <Button
            onClick={handleClick}
            disabled={loading || !exists}
            gradientDuoTone="cyanToBlue"
          >
            {loading && (
              <div className="mr-3">
                <Spinner size="sm" light={true} />
              </div>
            )}
            Analyze
          </Button>
        </div>
        <div className="w-full">
          <p className="mb-4">Examples:</p>
          <div className="flex gap-4 flex-wrap">
            <Button
              onClick={() => setDefaultTweetId("1620466730572349442")}
              color="light"
            >
              Jeff Bezos
            </Button>
            <Button
              onClick={() => setDefaultTweetId("1621653950947799042")}
              color="light"
            >
              Elon Musk
            </Button>
            <Button
              onClick={() => setDefaultTweetId("1621588220914941955")}
              color="light"
            >
              Steven Tey
            </Button>
            <Button
              onClick={() => setDefaultTweetId("1620073039131213824")}
              color="light"
            >
              Lee Rob
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
