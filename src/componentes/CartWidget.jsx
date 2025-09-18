import { CartContext } from '../context/CartContext'
import '../estilos/CartWidget.css'
import { memo, useContext, useEffect } from 'react'

const CartWidget = ({ price }) => {
  const { setCartOn, cartOn, cartPrice } = useContext(CartContext)

  return (
    <div className='cart-container'>
      <div className='cart-icon' onClick={() => setCartOn(true)}>
        🛒
      </div>
      <div className='cart-description'>
        <p>Cart</p>
        <h4>${cartPrice}</h4>
      </div>
    </div>
  )
}

export default memo(CartWidget)
