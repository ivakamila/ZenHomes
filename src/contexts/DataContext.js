import { collection, getDocs, query } from "firebase/firestore";
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";

export const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const value = productsData;

  useEffect(() => {
    const getData = async () => {
      try {
        const q = query(collection(db, "Products"));
        const documentSnapshots = await getDocs(q);
        const products = [];
        documentSnapshots.forEach((doc) => {
          products.push(doc.data());
        });
        setProductsData(products);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
