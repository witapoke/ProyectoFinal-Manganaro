import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { ProductsContext } from '../context/ProductsContext'

const SideCartItem = ({ item }) => {
  const { addToCart, RemoveQty, cart } = useContext(CartContext)
  const { products } = useContext(ProductsContext)
  return (
    <li key={item.id} className='sideCartItem'>
      <img src={item.thumbnail} className='sideCartImage' />
      <h4>{item.title}</h4>
      <div className='pricenqty'>
        <p>${item.price}</p>
        <p>Qty:{item.qty}</p>
      </div>
      <div className='remove-add-btns'>
        <i
          className='fa-solid fa-plus fa-lg sideCartAddBtn'
          onClick={() => addToCart(cart, item.id)}
        ></i>
        <i
          className='fa-solid fa-minus fa-lg sideCartRemoveBtn'
          onClick={() => RemoveQty(item.id)}
        ></i>
      </div>
    </li>
  )
}

export default SideCartItem
