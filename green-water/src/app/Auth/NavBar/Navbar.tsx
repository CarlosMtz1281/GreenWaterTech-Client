"use client";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import { get } from "http";
import logo from "../../assets/logoGreenWater.png";



export default function NavBar() {
  const [userMail, setUserMail] = useState(window.location.href.split("/")[5])

  function getUserMail() {
    if (typeof window !== 'undefined') {
      setUserMail(window.location.href.split("/")[5])
    }
  }

  return (

    <div className="NavContainer">
      <div className="nav-header">
        <img src="./assets/logoGreenWater.png" alt="Logo"/>
      </div>
      <h1>
          Green Water <br /> Tech
        </h1>
      <div className="nav-divider" />

      <ul className="nav-links">
        <Link href={`/Auth/home/${userMail}`}>
          <li className="nav-item">
            <AiFillHome size={25} />
            <p>Home</p>
          </li>
        </Link>
        <Link href="/Auth/settings">
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
