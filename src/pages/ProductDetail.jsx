import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase-config'
import { collection, query, getDocs, where } from 'firebase/firestore'
import '../estilos/ProductDetail.css'
import { ProductsContext } from '../context/ProductsContext'
import { CartContext } from '../context/CartContext'
import SideCart from '../componentes/SideCart'

const ProductDetail = () => {
  const [product, setProduct] = useState([])
  const { products } = useContext(ProductsContext)
  const { addToCart, cartOn } = useContext(CartContext)
  const [isAnimated, setIsAnimated] = useState(false)

  const handleAnimation = () => {
    if (isAnimated) return

    setIsAnimated(true)

    setTimeout(() => {
      setIsAnimated(false)
    }, 500)
  }

  const params = useParams()
  const productsCollectionRef = collection(db, 'products')

  const nameQuery = query(
    productsCollectionRef,
    where('title', '==', params.detail)
  )

  const fetchByName = async () => {
    const data = await getDocs(nameQuery)
    setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  useEffect(() => {
    fetchByName()
  }, [fetchByName])

  return (
    <div style={{ minHeight: '100vh' }}>
      {product.map((product) => (
        <div className='mainProductDetailContainer' key={product.id}>
          <li className='productDetailContainer' key={product.id}>
            <img src={product.thumbnail} className='productDetailImage' />
            <h3 className='productDetailTitle'>{product.title}</h3>
            <div className='ProductDetailDescrption'>
              <p className='product-price'>${product.price}</p>
              <p className='product-description'>{product.description}</p>
              <button
                className={
                  isAnimated ? 'addToCartBtnAnimation addBtn' : 'addBtn'
                }
                onClick={() => {
                  addToCart(products, product.id)
                  handleAnimation()
                }}
              >
                Add To Cart
              </button>
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
      {cartOn && <SideCart />}
    </div>
  )
}

export default ProductDetail
