import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'
import { useParams } from 'react-router-dom'
import ItemListComponent from '../componentes/ItemListComponent'
import { ProductsContext } from '../context/ProductsContext'
import { CartContext } from '../context/CartContext'
import SideCartItem from '../componentes/SideCartItem'

const FilteredProducts = () => {
  const { products, setProducts } = useContext(ProductsContext)
  const { cartOn, cart, setCartOn } = useContext(CartContext)

  const params = useParams()

  const productsCollectionRef = collection(db, 'products')

  const categoryQuery = query(
    productsCollectionRef,
    where('category', '==', params.category)
  )

  const getProductsByCategory = async () => {
    const data = await getDocs(categoryQuery)
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  useEffect(() => {
    getProductsByCategory()
  }, [params.category])

  return (
    <>
      {products.length > 0 ? (
        <ul className='itemListContainer'>
          {products.map((product) => (
            <ItemListComponent key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <h1>Cargando...</h1>
      )}
      {cartOn && (
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
            <button className='sideCartFinishBtn'>Finalizar compra</button>
          )}
        </div>
      )}
    </>
  )
}

export default FilteredProducts
