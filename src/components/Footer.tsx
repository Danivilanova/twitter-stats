import { Footer } from "flowbite-react";
import GithubIcon from "./icons/GithubIcon";

export default function FooterT() {
  return (
    <Footer className="px-0 sm:px-0" container={true}>
      <div className="flex justify-between max-w-4xl w-full mx-auto px-4 sm:px-10">
        <Footer.Copyright
          href="https://github.com/Danivilanova"
          by="Dani Vilanova"
          year={2023}
        />
        <Footer.Icon className="" href="" icon={GithubIcon} />
      </div>
    </Footer>
  );
}
