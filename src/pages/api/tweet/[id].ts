import { tweetIsValid } from "@/lib/twitter";

export default function handler(req, res) {
  const { id } = req.query;
  tweetIsValid(id).then((response) => {
    res.status(200).json({ exists: response });
  });
}
