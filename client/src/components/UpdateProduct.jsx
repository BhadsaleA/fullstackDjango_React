import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/${id}/`);
      console.log(data);
      setImage(data.image);
      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
      setCategory(data.category);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const updateProductInfo = async () => {
    let formField = new FormData();
    formField.append('name', name);
    formField.append('price', price);
    formField.append('description', description);
    formField.append('category', category);

    if (image !== null) {
      formField.append('image', image);
    }

    try {
      await axios.put(`http://localhost:8000/api/${id}/`, formField);
      navigate('/');
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1>Update Product</h1>
      <div className='form-group'>
        {image && <img src={image} alt="Product" height='300' width='150' />}
        <div className='form-group mb-3'>
          <label>Select Image To Upload</label>
          <input
            type='file'
            className='form-control form-control-lg'
            name='image'
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className='form-group mb-3'>
          <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Enter Product Name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='form-group mb-3'>
          <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Enter Product Price'
            name='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className='form-group mb-3'>
          <textarea
            className='form-control form-control-lg'
            placeholder='Enter Product Description'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='form-group mb-3'>
          <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Enter Product Category'
            name='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button className='btn btn-success' onClick={updateProductInfo}>Update Product</button>
      </div>
    </div>
  );
};

export default UpdateProduct;
