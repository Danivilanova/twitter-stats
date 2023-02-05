import { useEffect, useState } from "react";

export default function VercelFancyTitle() {
  const [titleColorId, setTitleColorId] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleColorId((oldTitleColorId) => (oldTitleColorId + 1) % 3);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1 className="text-7xl font-black mb-10 text-center">
      <span
        className={
          "bg-gradient-to-r from-[#007CF0] to-[#00DFD8] bg-clip-text transition-all duration-[1500ms] " +
          (titleColorId === 0
            ? "text-transparent"
            : "text-black dark:text-white")
        }
      >
        Scan.{" "}
      </span>
      <span
        className={
          "bg-gradient-to-r from-[#7928CA] to-[#FF0080] bg-clip-text transition-all duration-[1500ms] " +
          (titleColorId === 1
            ? "text-transparent"
            : "text-black dark:text-white")
        }
      >
        Analize.{" "}
      </span>
      <span
        className={
          "bg-gradient-to-r from-[#FF4D4D] to-[#F9CB28] bg-clip-text transition-all duration-[1500ms] " +
          (titleColorId === 2
            ? "text-transparent"
            : "text-black dark:text-white")
        }
      >
        Grow.
      </span>
    </h1>
  );
}
