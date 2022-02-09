import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import "./UploadNewProduct.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const UploadNewProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [color, setColor] = useState("");
  const [productImg, setProductImg] = useState(null);

  const uploadFiles = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProductImg(downloadURL);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Products"), {
        productName,
        category,
        price: Number(price),
        productImg,
        description,
        material,
        dimensions,
        color,
        created: serverTimestamp(),
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="add-product">
      <h2>Upload New Product</h2>
      <div className="form-container">
        <form className="upload-form" onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label>
            Material:
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              required
            />
          </label>
          <label>
            Color:
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </label>
          <label>
            Dimensions (W x D x H):
            <input
              type="text"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Upload image:
            <input type="file" onChange={uploadFiles} />
          </label>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNewProduct;
