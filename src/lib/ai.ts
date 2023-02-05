import WCluster from "w-cluster";

const COHERE_API_EMBED_URL = "https://api.cohere.ai/embed";
const COHERE_API_DETECT_LANGUAGE_URL = "https://api.cohere.ai/detect-language";
const COHERE_API_CLASSIFY_URL = "https://api.cohere.ai/classify";

export async function getLanguage(input: string[]) {
  const data = {
    texts: input,
  };

  const { results } = await fetch(COHERE_API_DETECT_LANGUAGE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `BEARER ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
      "Content-Type": "application/json",
      "Cohere-Version": "2022-12-06",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return results;
}

export async function getSentiment(input: string[]) {
  // console.log(input);
  const data = {
    inputs: input,
    examples: [
      {
        text: "is upset that he can't update his Facebook by texting it... and might cry as a result School today ...",
        label: "negative tweet",
      },
      {
        text: "I dived many times for the ball. Managed to save 50% The rest go out of bounds",
        label: "negative tweet",
      },
      {
        text: "my whole body feels itchy and like its on fire",
        label: "negative tweet",
      },
      {
        text: "no, it's not behaving at all. i'm mad. why am i here? because I can't see you all o...",
        label: "negative tweet",
      },
      {
        text: "not the whole crew",
        label: "negative tweet",
      },
      {
        text: "Need a hug",
        label: "negative tweet",
      },
      {
        text: "I couldn't bear to watch it. And I thought the UA loss was embarrassing . . . . .",
        label: "negative tweet",
      },
      {
        text: "I LOVE @Health4UandPets u guys r the best!!",
        label: "positive tweet",
      },
      {
        text: "im meeting up with one of my besties tonight! Cant wait!! - GIRL TALK!!",
        label: "positive tweet",
      },
      {
        text: "ah, congrats mr fletcher for finally joining twitter.",
        label: "positive tweet",
      },
      {
        text: "HOW DID I FORGET ABOUT TWO AND A HALF MEN?!?!? I LOVE THAT SHOW!!!",
        label: "positive tweet",
      },
      {
        text: "Haha, don't worry! You'll get the hang of it!",
        label: "positive tweet",
      },
      { text: "Just added tweetie to my new iPhone", label: "positive tweet" },
      { text: "your picture is very sweet", label: "positive tweet" },
      {
        text: "Dancing around the room in Pjs, jamming to my ipod. Getting dizzy. Well twitter, you asked!",
        label: "positive tweet",
      },
    ],
    truncate: "END",
    model: "large",
    outputIndicator: "Classify this tweets",
    taskDescription: "Classify these tweets as positive, negative, or neutral",
  };

  const { classifications } = await fetch(COHERE_API_CLASSIFY_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `BEARER ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return classifications;
}

export async function getEmbedVectors(inputs: string[]) {
  const data = {
    texts: inputs,
    model: "large",
    truncate: "END",
  };

  const response = await fetch(COHERE_API_EMBED_URL, {
    method: "POST",
    headers: {
      Authorization: `BEARER ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
      "Content-Type": "application/json",
      "Cohere-Version": "2022-12-06",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

  return response;
}

export async function reduceDimensions(embeddings: number[]) {
  const res = await WCluster.PCA(embeddings, { nCompNIPALS: 2 });
  return res;
}

export async function getClusters(embeddings: number[]) {
  const res = await WCluster.cluster(embeddings, {
    mode: "k-means",
    kNumber: Math.min(embeddings.length, 4),
    nCompNIPALS: 2,
  });
  return res;
}
