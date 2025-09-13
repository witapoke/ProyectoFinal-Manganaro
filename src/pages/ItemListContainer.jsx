import { useEffect, useContext } from 'react'
import { db } from '../firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import '../estilos/ItemListContainer.css'
import ItemListComponent from '../componentes/ItemListComponent'
import { ProductsContext } from '../context/ProductsContext'
import { CartContext } from '../context/CartContext'
import SideCart from '../componentes/SideCart'

const ItemListContainer = () => {
  const { products, setProducts } = useContext(ProductsContext)
  const { getFromLocalStorage, cartOn } = useContext(CartContext)

  const productsCollectionRef = collection(db, 'products')

  useEffect(() => {
    getFromLocalStorage()
  }, [])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getDocs(productsCollectionRef)
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      } catch (error) {
        console.error('Ha ocurrido un error', error)
      }
    }
    getProducts()
  }, [])

  return (
    <div className='itemListContainerFather'>
      {products.length > 0 ? (
        <ul className='itemListContainer'>
          {products.map((product) => (
            <ItemListComponent key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <h1>Cargando...</h1>
      )}
      {cartOn && <SideCart />}
    </div>
  )
}

export default ItemListContainer
