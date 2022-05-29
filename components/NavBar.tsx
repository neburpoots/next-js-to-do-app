import Link from 'next/link';
import React from 'react';

const NavBar: React.FC = () => {

  return (
    <nav className="px-2 py-1">
      <ul className="flex gap-2">
        <li className="customfont text-2xl ">
          <Link href="/">
            <a className="text-white">
              To do App Ruben Stoop
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
