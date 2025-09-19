import '../estilos/ItemListComponent.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext.jsx'
import { ProductsContext } from '../context/ProductsContext.jsx'
import { useContext, useState } from 'react'

const ItemListComponent = ({ product }) => {
  const { addToCart } = useContext(CartContext)
  const { products } = useContext(ProductsContext)

  const [isAnimated, setIsAnimated] = useState(false)

  const handleAnimation = () => {
    if (isAnimated) return

    setIsAnimated(true)

    setTimeout(() => {
      setIsAnimated(false)
    }, 500)
  }

  return (
    <li className='itemContainer'>
      <Link className='productDetailLink' to={`/product/${product.title}`}>
        <img src={product.thumbnail} className='productImage' />
      </Link>
      <h3 className='productTitle'>{product.title}</h3>
      <div className='productDescription'>
        <p className='productPrice'>Price: ${product.price}</p>
      </div>
      <button
        className={
          isAnimated ? 'addToCartBtn addToCartBtnAnimation' : 'addToCartBtn'
        }
        onClick={() => {
          addToCart(products, product.id)
          handleAnimation()
        }}
      >
        ➕
      </button>
    </li>
  )
}

export default ItemListComponent
