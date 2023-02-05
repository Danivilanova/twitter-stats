import NegativeIcon from "./icons/NegativeIcon";
import PositiveIcon from "./icons/PositiveIcon";
import EmbeddingsChart from "./EmbeddingsChart";

export default function Stats({
  sentiments,
  languages,
  embeddings,
  texts,
  clusters,
}) {
  const positive = sentiments.filter(
    (s) => s.prediction === "positive tweet"
  ).length;
  const negative = sentiments.filter(
    (s) => s.prediction === "negative tweet"
  ).length;

  const lang = Array.from(new Set(languages.map((l) => l.language_name))).map(
    (l) => ({
      name: l,
      count: languages.filter((x) => x.language_name === l).length,
    })
  );
  lang.sort((a, b) => b.count - a.count);

  return (
    <section className="flex border border-slate-200 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className=" p-4 flex flex-col items-center gap-2">
        <span className="font-bold">Sentiment</span>
        <div className="flex flex-col gap-1 items-end">
          <span className="flex gap-2 text-green-500 font-bold">
            {positive} <PositiveIcon />
          </span>
          <span className="flex gap-2 text-red-500 font-bold">
            {negative} <NegativeIcon />
          </span>
        </div>
      </div>
      <div className="border-l p-4 flex flex-col items-center gap-2 dark:border-gray-700">
        <span className="font-bold">Languages</span>
        <div className="flex flex-col gap-1 items-end">
          {lang.map((f, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="font-bold">{f.count}</span>
              <span>{f.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 grow border-l dark:border-gray-700">
        <span className="font-bold">Tweet Clusters</span>
        {embeddings && clusters && (
          <EmbeddingsChart
            embeddings={embeddings}
            texts={texts}
            clusters={clusters}
          />
        )}
      </div>
    </section>
  );
}
