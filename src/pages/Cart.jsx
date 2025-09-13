import { useContext, useEffect, useState } from 'react'
import '../estilos/Cart.css'
import '../estilos/cartItem.css'
import { CartContext } from '../context/CartContext'

const Cart = () => {
  const { cart, getFromLocalStorage, cartPrice } = useContext(CartContext)

  useEffect(() => {
    getFromLocalStorage()
  }, [])

  const [data, setData] = useState({
    correo: 'ignaciomanganaro22@gmail.com',
    pais: 'Argentina',
    nombre: 'Ignacio',
    apellido: 'Manganaro',
    dni: '44363186',
    calle: 'Larrea 183',
    casa: 'Piso 9c',
    codigo: '1824',
    ciudad: 'Lanús',
    provincia: 'Buenos Aires',
    telefono: '1122557755',
  })

  return (
    <main className='cartContainer'>
      <section className='cartPayment'>
        <div className='inputContainer contact'>
          <label htmlFor='inputContact' className='customLabel'>
            Contacto
          </label>
          <input
            className='inputContact'
            placeholder='Correo electronico'
            value={data.correo}
          />
        </div>
        <div className='inputContainer entrega'>
          <label htmlFor='inputContact' className='customLabel'>
            Entrega
          </label>
          <input
            className='inputContact'
            placeholder='País/Región'
            value={data.pais}
          />
          <div className='inputDivision'>
            <input
              className='inputContact'
              placeholder='Nombre'
              value={data.nombre}
            />
            <input
              className='inputContact'
              placeholder='Apellido'
              value={data.apellido}
            />
          </div>
          <input className='inputContact' placeholder='DNI' value={data.dni} />
          <input
            className='inputContact'
            placeholder='Calle y altura'
            value={data.calle}
          />
          <input
            className='inputContact'
            placeholder='Casa, departamento,etc (opcional)'
            value={data.casa}
          />
          <div className='inputDivision'>
            <input
              className='inputContact'
              placeholder='Código postal'
              value={data.codigo}
            />
            <input
              className='inputContact'
              placeholder='Ciudad'
              value={data.ciudad}
            />
            <input
              className='inputContact'
              placeholder='Provincia'
              value={data.provincia}
            />
          </div>
          <input
            className='inputContact'
            placeholder='Teléfono'
            value={data.telefono}
          />
        </div>
        <button className='finishPurchaseBtn'>Pagar ahora</button>
      </section>
      <section className='cartProducts'>
        <div className='productsDiv'>
          {cart.map((item) => (
            <div class='card'>
              <img src={item.thumbnail} className='cardImage' />
              <div class='card-body'>
                <h2 class='card-title'>{item.title}</h2>
                <p class='card-text'>${item.price} </p>
                <p class='card-text'>Qty:{item.qty}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='descriptionDiv'>
          <p>Subtotal- {cart.length} articulos </p>
          <div style={{ display: 'flex', gap: '10px', fontSize: '20px' }}>
            <h3>Total</h3>
            <h3>ARS ${cartPrice} </h3>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Cart
