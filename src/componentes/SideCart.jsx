import { useContext } from 'react'
import SideCartItem from './SideCartItem'
import { CartContext } from '../context/CartContext'
import '../estilos/SideCart.css'
import { Link } from 'react-router-dom'
const SideCart = () => {
  const { cart, setCartOn } = useContext(CartContext)

  return (
    <div className='sideCart'>
      <p onClick={() => setCartOn(false)} className='sideCartCloseBtn'>
        ❌
      </p>
      <ul className='sideCartList'>
        {cart.map((item) => (
          <SideCartItem item={item} key={item.id} />
        ))}
      </ul>
      {cart.length > 0 && (
        <Link to={'/cart'}>
          <button className='sideCartFinishBtn'>Continuar compra</button>
        </Link>
      )}
    </div>
  )
}

export default SideCart
