import { useContext, useEffect, useState } from 'react'
import '../estilos/Cart.css'
import '../estilos/CartItem.css'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { db } from '../firebase-config'
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  limit,
  writeBatch,
} from 'firebase/firestore'

const Cart = () => {
  const { cart, getFromLocalStorage, cartPrice, setCart, setCartOn } =
    useContext(CartContext)

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
      setCartOn(false)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteCollection = async (collectionName, docsToDelete) => {
    try {
      const collectionRef = collection(db, collectionName)
      const q = query(collectionRef, limit(docsToDelete))

      let data = await getDocs(q)

      while (data.docs.length > 0) {
        const batch = writeBatch(db)

        data.docs.forEach((doc) => {
          batch.delete(doc.ref)
        })

        await batch.commit()
      }
    } catch (error) {
      console.error('Error al borrar la colección:', error)
    }
  }

  const closeToast = async () => {
    setCart([])
    setFinishedPurchase(false)
    setComprobantes([])
    await deleteCollection('comprobantes', 500)
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
          Realizar pago
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
          <h2 style={{ fontSize: '30px' }}>Compra realizada con exito</h2>
          <p
            style={{
              fontSize: '20px',
              marginBottom: '35px',
              marginTop: '20px',
              textDecoration: 'underline',
            }}
          >
            Resumen de la compra
          </p>
          {comprobantes.map((comprobante) => (
            <li key={comprobante.id} className='comprobantesList'>
              <p>
                ID de la compra: <strong>{comprobante.userID}</strong>
              </p>
              <p>
                Compra realizada por:{' '}
                <strong>
                  {data.nombre} {data.apellido}
                </strong>
              </p>
              <p>
                Total de productos comprados: <strong> {cart.length} </strong>{' '}
              </p>
              <p>
                Precio final <strong>: ${cartPrice}</strong>{' '}
              </p>
              <p>
                Metodo de envio: <strong>Entrega a domicilio</strong>
              </p>
            </li>
          ))}
          <p style={{ marginTop: '20px' }}>
            Se te enviará una notificación al mail para informarte acerca del
            estado de tus productos
          </p>
          <Link to='/'>
            {' '}
            <button className='closeToastBtn' onClick={() => closeToast()}>
              Realizar otra compra
            </button>
          </Link>
        </section>
      ) : (
        ''
      )}
    </main>
  )
}

export default Cart
