document.addEventListener('DOMContentLoaded', () => {
  const productShowList = document.querySelector('.products-show-list')
  const correoInput = document.getElementById('correo')
  const nameInput = document.getElementById('nombre')
  const lastNameInput = document.getElementById('apellido')
  const phoneInput = document.getElementById('telefono')

  correoInput.value = 'ignaciomanganaro22@gmail.com'
  nameInput.value = 'Ignacio'
  lastNameInput.value = 'Manganaro'
  phoneInput.value = '1165237788'

  const carrito = JSON.parse(localStorage.getItem('carrito'))

  function renderCartProducts() {
    productShowList.innerHTML = ''
    carrito.map((product) => {
      const productsShowItem = document.createElement('li')
      productsShowItem.classList = 'products-show-item'
      productsShowItem.innerHTML = `
        <img src="${product.thumbnail}" height=140px width=140px  alt="${product.description} class="product-image"/>
        <div class="product-description">
          <h4 class="product-title">${product.title}</h4>
          <div class="pricing-div">
           <p class="product-price">$${product.price}</p> 
           <p class="" data-id="${product.id}">Qty: ${product.quantity}</p>
          </div>
        </div>
      `
      productShowList.appendChild(productsShowItem)
    })
  }

  renderCartProducts()
})
