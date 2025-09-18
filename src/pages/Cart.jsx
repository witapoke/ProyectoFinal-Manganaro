import { useContext, useEffect, useState } from 'react'
import '../estilos/Cart.css'
import '../estilos/cartItem.css'
import { CartContext } from '../context/CartContext'
import { useParams } from 'react-router-dom'
import { db } from '../firebase-config'
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore'

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
  const [comprobantes, setComprobantes] = useState([])
  const [finishedPurchase, setFinishedPurchase] = useState(false)

  const finishPurchase = async () => {
    const purchaseData = {
      userID: crypto.randomUUID(),
      purchaseID: crypto.randomUUID(),
      productsDetails: cart,
    }
    try {
      const purchaseDoc = await addDoc(collection(db, 'comprobantes'), {
        ...purchaseData,
        creationDate: serverTimestamp(),
      })
      const getPurchaseDocs = await getDocs(collection(db, 'comprobantes'))
      const newComprobantes = getPurchaseDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      setComprobantes(newComprobantes)
      setFinishedPurchase(true)
    } catch (error) {
      console.error(error)
    }
  }

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
        <button
          onClick={() => finishPurchase()}
          disabled={finishedPurchase}
          className={
            finishedPurchase === true ? 'disabledBtn' : 'finishPurchaseBtn'
          }
        >
          Pagar ahora
        </button>
      </section>
      <section className='cartProducts'>
        <div className='productsDiv'>
          {cart.map((item) => (
            <div className='card' key={item.id}>
              <img src={item.thumbnail} className='cardImage' />
              <div className='card-body'>
                <h2 className='card-title'>{item.title}</h2>
                <p className='card-text'>${item.price} </p>
                <p className='card-text'>Qty:{item.qty}</p>
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
      {finishedPurchase ? (
        <section className='finishPurchaseToast'>
          <h2>Compra realizada con exito</h2>
          <p>Resumen de la compra</p>
          {comprobantes.map((comprobante) => (
            <li key={comprobante.id}>ID de la compra:{comprobante.userID}</li>
          ))}
        </section>
      ) : (
        ''
      )}
    </main>
  )
}

export default Cart
