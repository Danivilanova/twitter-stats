import { Button, DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";
import Image from "next/image";

export default function NavbarT() {
  return (
    <Navbar className="px-0 sm:px-0" fluid={true} rounded={true}>
      <div className="flex justify-between max-w-4xl w-full mx-auto px-4 sm:px-10">
        <Navbar.Brand href="/">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3"
            alt="Flowbite Logo"
            width={30}
            height={30}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Twitter Stats
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <DarkThemeToggle />
        </div>
      </div>
    </Navbar>
  );
}
