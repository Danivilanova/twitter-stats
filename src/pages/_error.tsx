import { Button } from "flowbite-react";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <section className="flex items-center justify-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-400 dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn&apos;t find this page.
          </p>
          <p className="mt-4 mb-8 text-gray-600 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Button href="/" gradientDuoTone="cyanToBlue">
            Back to homepage
          </Button>
        </div>
      </div>
    </section>
  );
}
