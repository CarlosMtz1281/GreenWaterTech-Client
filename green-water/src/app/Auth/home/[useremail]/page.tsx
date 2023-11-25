"use client";

import React, { useState, useEffect, use } from "react";

import { firebaseConfig } from "../../../firebase/firebaseconfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, DocumentData } from "firebase/firestore";
import NavBar from "../../NavBar/Navbar";

import TarjetaCampo from "@/app/components/TarjetaCampo";
import { set } from "firebase/database";

type HomeProps = {
  params: any; // replace 'any' with the actual type of 'params'
};

export default function Home({ params }) {
  const [realData, setRealData] = useState<any>([]);
  const userEmail = decodeURIComponent(params.useremail);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [user, setUser] = useState<DocumentData | null>(null);
  const [userKey, setUserKey] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", userEmail); // Use the correct collection name and document id
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser(docSnap.data());
        if (user) {
          setUserKey(user.email);
        }
      } else {
        // Handle the case where the document does not exist
        setUser(null);
      }
    };

    fetchData();
  }, [userEmail]);

  // Deconstruct document data
  useEffect(() => {
    if (user) {
      setUserKey(user.email);
    }
  }, [user]);

  // Retrieve user data from Realtime Database
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://greenwatertech-572bc-default-rtdb.firebaseio.com/Users/${userKey}/.json`
      );

      const data = await response.json();
      // Make data into an array
      const dataArray = [];
      for (const key in data) {
        dataArray.push(data[key]);
      }
      setRealData(dataArray);

      setIsLoaded(true);
    };

    if (userKey) {
      fetchData();
    }

  }, [userKey]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://gwt-back.uc.r.appspot.com/api/login?user=${userKey}`);
      console.log(response)
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
    }

  };

  fetchData();

  return (
    <div>
      <h1 className="home-tittle">Hello {userEmail}</h1>
      <div className="home-cardContainer">
        {isLoaded && Array.isArray(realData) &&
          realData.map((item, index) => (
            <TarjetaCampo key={index} data={item} />
          ))}
      </div>
    </div>
  );
}
