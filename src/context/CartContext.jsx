/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [cartOn, setCartOn] = useState(false)
  const [cartPrice, setCartPrice] = useState(0)

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart))
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)
    setCartPrice(Math.round(total))
    localStorage.setItem('cartPrice', JSON.stringify(Math.round(total)))
  }, [cart])

  const getFromLocalStorage = () => {
    const cartFromStorage = JSON.parse(localStorage.getItem('carrito')) || []
    setCart(cartFromStorage)
  }

  const getPriceFromLocalStorage = () => {
    const priceFromStorage = JSON.parse(localStorage.getItem('cartPrice')) || 0
    setCartPrice(priceFromStorage)
  }

  const RemoveQty = (id) => {
    const productToRemoveQty = cart.find((product) => product.id === id)
    if (productToRemoveQty) {
      if (productToRemoveQty.qty > 1) {
        productToRemoveQty.qty--
        localStorage.setItem('carrito', JSON.stringify(cart))
        localStorage.setItem('cartPrice', JSON.stringify(cartPrice))
        setCart([...cart])
      } else if (productToRemoveQty.qty === 1) {
        const carritoFiltrado = cart.filter((item) => item.id !== id)
        localStorage.setItem('carrito', JSON.stringify(carritoFiltrado))
        localStorage.setItem('cartPrice', JSON.stringify(cartPrice))
        setCart(carritoFiltrado)
      }
    }
  }

  const addToCart = (products, id) => {
    const productToAdd = products.find((product) => product.id === id)

    if (productToAdd) {
      const productInCart = cart.find(
        (product) => product.id === productToAdd.id
      )

      if (productInCart) {
        const updatedCart = cart.map((item) =>
          item.id === productToAdd.id ? { ...item, qty: item.qty + 1 } : item
        )

        setCart(updatedCart)
      } else {
        const newProduct = { ...productToAdd, qty: 1 }
        const newCart = [...cart, newProduct]
        setCart(newCart)
      }
    } else {
      alert('No encontramos el producto requerido para añadir')
    }
  }

  const contextValue = {
    getFromLocalStorage,
    addToCart,
    RemoveQty,
    cart,
    setCart,
    cartOn,
    setCartOn,
    getPriceFromLocalStorage,
    cartPrice,
  }

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}
