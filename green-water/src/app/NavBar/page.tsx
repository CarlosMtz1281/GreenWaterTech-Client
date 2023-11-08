import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="NavContainer">
      <div className="nav-header">
        <h1>
          Green Water <br /> Tech
        </h1>
      </div>

      <div className="nav-divider" />

      <ul className="nav-links">
        <Link href="/home">
          <li className="nav-item">
            <AiFillHome size={25} />
            <p>Home</p>
          </li>
        </Link>
        <Link href="/settings">
          <li className="nav-item">
            <FiSettings size={25} />
            <p>Settings</p>
          </li>
        </Link>
      </ul>

      <div className="nav-divider" />

      <Link href="/">
      <div className="nav-footer">
        <div className="logOut-btn">Log Out</div>
      </div>
      </Link>

    </div>
  );
}
