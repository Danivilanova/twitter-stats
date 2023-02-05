import ThreadReply from "./ThreadReply";

export default function Thread({
  thread,
  threadAuthors,
  sentiments,
  languages,
}) {
  return (
    <section className="bg-white border border-slate-200 rounded-xl dark:bg-gray-800 dark:border-gray-700">
      {thread.map((c: any, idx: number) => {
        return (
          <ThreadReply
            key={idx}
            tweet={c}
            author={threadAuthors[c.author_id]}
            sentiment={sentiments && sentiments[idx]}
            language={languages && languages[idx]?.language_name}
          />
        );
      })}
    </section>
  );
}
