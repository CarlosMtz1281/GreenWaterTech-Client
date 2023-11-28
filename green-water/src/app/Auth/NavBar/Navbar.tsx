"use client";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import { get } from "http";
import { useEffect, useRef } from "react";
import Image from "next/image";
import LogoGreenWater from "../../../../public/logoGreenWater.png";


//Definicion de path type
enum PathType {
  Home = "/Auth/home",
  Settings = "/Auth/settings",
}



export default function NavBar() {
  // Initialize state with default values
  const [userMail, setUserMail] = useState("");
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.href.split("/");
      setUserMail(pathSegments[5]); // Update userMail based on URL
      setCurrentPath(pathSegments[5]); // Update currentPath based on URL
    }
  }, []);

  const isPathActive = (path: PathType) => currentPath === path;

  return (

    <div className="NavContainer">
      <div className="nav-header">
        <Image src="/logoGreenWater.png" alt="Logo Green Water"  width={500} height={500}/>
      </div>
      <h1 className="nav-tittle">
          Green Water Tech
        </h1>
      <div className="nav-divider" />

      <ul className="nav-links">
        <div onClick={()=> setCurrentPath("/Auth/home")}>
          <Link href={`/Auth/home/${userMail}`}>
            <li className={`nav-item ${"/Auth/home" == currentPath ? 'active' : ''}`}>
              <AiFillHome size={25} />
              <p>Home</p>
            </li>
          </Link>
        </div>

        <div onClick={()=> setCurrentPath("/Auth/settings")}>
          <Link href="/Auth/settings">
            <li className={`nav-item ${"/Auth/settings" == currentPath ? 'active' : ''}`}>
              <FiSettings size={25} />
              <p>Settings</p>
            </li>
          </Link>
        </div>
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
