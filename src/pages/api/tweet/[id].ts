import { tweetIsValid } from "@/lib/twitter";

export default function handler(req: any, res: any) {
  const { id } = req.query;
  tweetIsValid(id).then((response) => {
    res.status(200).json({ exists: response });
  });
}
