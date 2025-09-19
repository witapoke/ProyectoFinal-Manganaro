import { memo, useEffect, useState } from 'react'
import CartWidget from './CartWidget'
import '../estilos/Navbar.css'
import BrandLogo from '../assets/brand-logo.jpg'
import { Link } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'
import { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import UseDebounce from '../Hooks/UseDebounce'
import { CartContext } from '../context/CartContext'
import Swal from 'sweetalert2'

const NavBar = () => {
  const [input, setInput] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchMessage, setSearchMessage] = useState('')
  const { setProducts } = useContext(ProductsContext)
  const { getPriceFromLocalStorage, cartOn } = useContext(CartContext)

  const productsCollectionRef = collection(db, 'products')

  const searchProducts = async (db, searchQuery) => {
    try {
      const productsRef = collection(db, 'products')
      const data = await getDocs(productsRef)
      const results = data.docs
        .map((doc) => ({ ...doc.data() }))
        .filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      if (results.length > 0) {
        setProducts(results)
        setSearchMessage('')
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'No encontramos el producto requerido, lo sentimos',
          icon: 'error',
          confirmButtonText: 'Cool',
        })
        setInput('')
        setProducts([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const debouncedQuery = UseDebounce(input, 500)

  useEffect(() => {
    getPriceFromLocalStorage()
  }, [])

  useEffect(() => {
    searchProducts(db, debouncedQuery)
  }, [debouncedQuery])

  const openMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  return (
    <nav className='navbar'>
      <div className='categories-logo-container'>
        <Link to={'/'} className='brand-logo'>
          <img src={BrandLogo} alt='' height='70px' width='150px' />
        </Link>

        <ul className='dropdown' onClick={openMenu}>
          <li className='ham-menu'>
            <span className='ham-menu-span'></span>
            <span className='ham-menu-span'></span>
            <span className='ham-menu-span'></span>
          </li>
          <li>
            <h3>Categories</h3>
            {menuOpen && (
              <ul className='category-list'>
                <Link to='/' className='category-item'>
                  <p>All</p>
                </Link>
                <Link to='/products/furniture' className='category-item'>
                  <p>Furniture</p>
                </Link>
                <Link to='/products/fragrances' className='category-item'>
                  <p>Fragrances</p>
                </Link>
                <Link to='/products/groceries' className='category-item'>
                  <p>Groceries</p>
                </Link>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div className='search-div'>
        <input
          type='text'
          className='search-input'
          placeholder='Search items...'
          value={input}
          onChange={handleChange}
        />
      </div>
      {cartOn ? '' : <CartWidget />}
    </nav>
  )
}

export default memo(NavBar)
