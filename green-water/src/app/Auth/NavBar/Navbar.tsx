"use client";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";
import { get } from "http";
import { useEffect } from "react";
import Image from "next/image";
import LogoGreenWater from "../../../../public/logoGreenWater.png";


//Definicion de path type
enum PathType {
  Home = "/Auth/home",
  Settings = "/Auth/settings",
}



export default function NavBar() {
  const [userMail, setUserMail] = useState(window.location.href.split("/")[5])

  function getUserMail() {
    if (typeof window !== 'undefined') {
      setUserMail(window.location.href.split("/")[5])
    }
  }
  //lector y manejo de current path
  const [currentPath, setCurrentPath] = useState("");
  var URL;
  useEffect(() => {
    URL = window.location.href.split("/")[5];
    setCurrentPath(URL);
  }, []);
  console.log(currentPath);

  const isPathActive = (path: PathType) => {
    return currentPath === path ? true : false;
  };

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
