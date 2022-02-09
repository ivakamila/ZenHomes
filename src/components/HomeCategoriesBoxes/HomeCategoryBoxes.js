import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { CategoriesList } from "../../assets/CategoriesList";
import { Link } from "react-router-dom";
import "./HomeCategoryBoxes.css";

const HomeCategoryBoxes = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const q = query(collection(db, "Products"));

        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push(doc.data());
        });

        function getCategories() {
          const arr = CategoriesList.map((item) => {
            return item.split(" ").join("");
          });

          const newArr = [];
          CategoriesList.forEach(async function (category, index) {
            arr[index] = products.filter(
              (product) => product.category === category
            );
            newArr.push(arr[index][0]);
          });
          setCategoryData(newArr);
        }
        getCategories();
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="categories-home">
      <h2>Explore Our Categories</h2>
      <div className="category-cards">
        {categoryData.map((item, index) => (
          <div className="category-card" key={index}>
            <Link
              to={`/category/${item.category.split(" ").join("-")}`}
              key={index}
            >
              <img
                src={item.productImg}
                alt={item.category}
                className="category-img"
              />
              <h3 className="category-title">{item.category}s</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategoryBoxes;
