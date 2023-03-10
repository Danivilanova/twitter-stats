import NegativeIcon from "./icons/NegativeIcon";
import PositiveIcon from "./icons/PositiveIcon";
import EmbeddingsChart from "./EmbeddingsChart";

export default function Stats({
  sentiments,
  languages,
  embeddings,
  texts,
  clusters,
}: any) {
  const positive = sentiments.filter(
    (s: any) => s.prediction === "positive tweet"
  ).length;
  const negative = sentiments.filter(
    (s: any) => s.prediction === "negative tweet"
  ).length;

  const lang = Array.from(
    new Set(languages.map((l: any) => l.language_name))
  ).map((l) => ({
    name: l,
    count: languages.filter((x: any) => x.language_name === l).length,
  }));
  lang.sort((a, b) => b.count - a.count);

  return (
    <section className="flex flex-col lg:flex-row border border-slate-200 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-row max-lg:justify-center">
        <div className="max-lg:w-1/2 p-4 flex flex-col items-center gap-2">
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
        <div className="max-lg:w-1/2 border-l p-4 flex flex-col items-center gap-2 dark:border-gray-700">
          <span className="font-bold">Languages</span>
          <div className="flex flex-col gap-1 items-end">
            {lang.map((f: any, idx: number) => (
              <div key={idx} className="flex gap-2">
                <span className="font-bold">{f.count}</span>
                <span>{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 grow max-lg:border-t lg:border-l dark:border-gray-700">
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
