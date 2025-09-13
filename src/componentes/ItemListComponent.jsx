import '../estilos/ItemListComponent.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext.jsx'
import { ProductsContext } from '../context/ProductsContext.jsx'
import { useContext } from 'react'

const ItemListComponent = ({ product }) => {
  const { addToCartByGemini } = useContext(CartContext)
  const { products } = useContext(ProductsContext)

  return (
    <li className='itemContainer'>
      <Link className='productDetailLink' to={`/product/${product.title}`}>
        <img src={product.thumbnail} className='productImage' />
      </Link>
      <h3 className='productTitle'>{product.title}</h3>
      <div className='productDescription'>
        <p className='productPrice'>Price: ${product.price}</p>
        <p className='productQty'>Qty:1</p>
      </div>
      <button
        className='addToCartBtn'
        onClick={() => addToCartByGemini(products, product.id)}
      >
        ➕
      </button>
    </li>
  )
}

export default ItemListComponent
