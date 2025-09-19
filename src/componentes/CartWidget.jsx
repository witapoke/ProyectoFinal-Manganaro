import { CartContext } from '../context/CartContext'
import '../estilos/CartWidget.css'
import { memo, useContext, useEffect } from 'react'

const CartWidget = ({ price }) => {
  const { setCartOn, cartPrice, cart } = useContext(CartContext)

  return (
    <div className='cart-container'>
      <div className='cart-icon' onClick={() => setCartOn(true)}>
        🛒
      </div>

      {cart.length > 0 ? (
        <div className='cart-description'>
          <p>Cart</p>
          <h4>${cartPrice}</h4>
        </div>
      ) : (
        ''
      )}

      {cart.length > 0 ? (
        <div className='cartQty'>
          <p>Productos añadidos:</p>
          <h4> {cart.length}</h4>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default memo(CartWidget)
