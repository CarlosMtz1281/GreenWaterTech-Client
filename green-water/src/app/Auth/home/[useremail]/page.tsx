"use client";

import React, { useState, useEffect } from "react";

import { firebaseConfig } from "../../../firebase/firebaseconfig";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, DocumentData } from "firebase/firestore";
import TarjetaCampo from "@/app/components/TarjetaCampo";


export default function Home({ params }: any) {
  const [realData, setRealData] = useState<any>([]);
  const [altData, setAltData] = useState<any>([]);
  const userEmail = decodeURIComponent(params.useremail);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [user, setUser] = useState<DocumentData | null>(null);
  const [userKey, setUserKey] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);


  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", userEmail);

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };

    fetchData();
  }, [userEmail]);

  useEffect(() => {
    if (user) {
      setUserKey(user.email);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (userKey) {
        try {
          const response = await fetch(
            `https://gwt-back.uc.r.appspot.com//api/getUser?user=-Nj8Y4gCCGdasz5SxLdp`,
            {
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          const dataArray = Object.values(data);
          const formattedData = dataArray.slice(0, 4); // Get the first 4 items
          const altData = dataArray.slice(4); // Get the remaining items
          setRealData(formattedData);
          setAltData(altData); // Assuming you have a state variable altData

          setIsLoaded(true);
        } catch (error) {
          console.error("Error fetching login data:", error);
        }
      }
    };

    fetchData();
  }, [userKey]);

  console.log(realData);
  console.log(altData);
  console.log(userKey);





  return (
    <div>
      <h1 className="home-tittle">Hello {altData[0]}</h1>
      <div className="home-cardContainer">
        {isLoaded && Array.isArray(realData) &&
          realData.map((item, index) => (
            <TarjetaCampo key={index} data={item} />
          ))}
      </div>
    </div>
  );
}
