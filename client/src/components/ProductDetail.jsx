import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ProductDetail = () => {

  const [ product, setProduct ] = useState("")
  const navigate = useNavigate()

  const { id } = useParams()
  const getSingleProduct = async() =>{
    const { data } = await axios.get(`http://localhost:8000/api/${id}`)
    console.log(data)
    setProduct(data)
  }

  useEffect(() => {
    getSingleProduct()
  }, [])

  //Delete Products

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:8000/api/${id}/`)
    navigate('/');
  }

  return (
    <div>
        <h1>ProductDetail</h1>
        <div className='single-product-info'>
          <img src={product.image} height="200" width="300"/>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.description}</p>
          <p>{product.category}</p>

          <Link className='btn btn-primary m-2' to={`/${product.id}/update`}> Update </Link>
          <Link className='btn btn-danger m-2'onClick={() => deleteProduct(product.id)}> Delete </Link>

        </div>
    </div>
  )
}

export default ProductDetail