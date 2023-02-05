// components/layout.js

import NavbarT from "./Navbar";
import FooterT from "./Footer";
import { Flowbite } from "flowbite-react";

export default function Layout({ children }) {
  return (
    <Flowbite>
      <NavbarT />
      <main className="max-w-4xl mx-auto p-4 sm:p-10 w-full grow">
        {children}
      </main>
      <FooterT />
    </Flowbite>
  );
}
