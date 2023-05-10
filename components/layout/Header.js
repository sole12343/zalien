import { useState } from "react";
import Link from "next/link";
import ConnectWalletButton from "../buttons/ConnectWalletButton";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="py-4 bg-gray-900 sm:py-6">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <span className="text-rose-500 text-xl font-bold">Z</span>
            <span className="text-white text-xl font-bold">ALIEN</span>
          </div>

          <button
            className="sm:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <nav
            className={`${
              menuOpen ? "block" : "hidden"
            } sm:block absolute sm:relative top-[59px] sm:top-auto w-full sm:w-auto bg-gray-900 sm:bg-transparent`}
          >
            <ul className="sm:flex items-center space-y-4 sm:space-y-0 sm:space-x-8 p-4 sm:p-0">
              <li>
                <Link
                  href="/about"
                  className="text-white font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-white font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-white font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </nav>

          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
