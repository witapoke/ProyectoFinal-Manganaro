import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase-config'
import { collection, query, getDocs, where } from 'firebase/firestore'
import '../estilos/ProductDetail.css'

const ProductDetail = () => {
  const [product, setProduct] = useState([])

  const params = useParams()
  const productsCollectionRef = collection(db, 'products')

  const nameQuery = query(
    productsCollectionRef,
    where('title', '==', params.detail)
  )

  useEffect(() => {
    const fetchByName = async () => {
      const data = await getDocs(nameQuery)
      setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    fetchByName()
  }, [])

  return (
    <div>
      {product.map((product) => (
        <div className='mainProductDetailContainer' key={product.id}>
          <li className='productDetailContainer' key={product.id}>
            <img src={product.thumbnail} className='productDetailImage' />
            <h3 className='productDetailTitle'>{product.title}</h3>
            <div className='ProductDetailDescrption'>
              <p className='product-price'>${product.price}</p>
              <p className='product-description'>{product.description}</p>
              <button className='addBtn'>Add To Cart</button>
            </div>
          </li>
          <li className='productInfoContainer'>
            <p>AvailabilityStatus: {product.availabilityStatus}</p>
            <p>Brand: {product.brand}</p>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Warranty Information: {product.warrantyInformation}</p>
          </li>
        </div>
      ))}
    </div>
  )
}

export default ProductDetail
