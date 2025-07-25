document.addEventListener('DOMContentLoaded', async () => {
  var carrito = []
  var priceVariableContainer = 0

  const dropdowns = document.querySelectorAll('.dropdown')
  const productsList = document.querySelector('.products-list')
  const cartList = document.querySelector('.cart-items-list')
  const carritoSection = document.querySelector('.carrito-section')
  const cartBtn = document.querySelectorAll('.cart-icon')
  const clearBtn = document.querySelector('.clear-cart-btn')
  const inputSearch = document.querySelector('.input-search')
  const searchBtn = document.querySelector('.search-btn')
  const priceInput = document.querySelector('.price-input')
  const price = document.querySelector('.price')
  const cartPrice = document.querySelector('.cart-price')
  const dropdownSelect = document.querySelector('.dropdown-select')
  const paymentLink = document.querySelector('.payment-link')

  const products = await getProducts()

  price.textContent = '$'

  cartBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      carritoSection.classList.toggle('open-carrito')
    })
  })

  function saveToLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }

  function saveCartPrice() {
    localStorage.setItem('cartPrice', JSON.stringify(priceVariableContainer))
  }

  function getFromLocalStorage() {
    const cartFromStorage = localStorage.getItem('carrito')
    if (cartFromStorage) {
      carrito = JSON.parse(cartFromStorage)
    } else {
      carrito = []
    }
  }

  function getCartPrice() {
    const priceFromStorage = localStorage.getItem('cartPrice')
    if (priceFromStorage) {
      priceVariableContainer = JSON.parse(priceFromStorage)
    } else {
      priceVariableContainer = 0
    }
  }

  function renderCart() {
    cartList.innerHTML = ''

    carrito.forEach((item) => {
      const cartItem = document.createElement('li')
      cartItem.classList.add('cart-item')
      cartItem.innerHTML = `
        <img src="${item.thumbnail}" height=100px width=100px  alt="${item.description} class="product-image"/>
      <div class="product-description">
          <h4 class="product-title-cart">${item.title}</h4>
            
        <div class="pricing-div-cart-item">
            <p class="product-price-cart">$${item.price}</p>
            <p> Qty: ${item.quantity}</p>
        </div>

        <div class="btns-div-cart-item" >
            <button class="addQuantityBtn addBtn" data-id="${item.id}">➕</button>
            <button class="removeBtn" data-id="${item.id}">➖</button>
        </div>
      </div>
      `
      cartList.appendChild(cartItem)
    })

    const addQtyBtn = cartList.querySelectorAll('.addQuantityBtn')
    const removeBtn = cartList.querySelectorAll('.removeBtn')

    addQtyBtn.forEach((button) => {
      button.addEventListener('click', () => {
        addToCart(parseInt(button.dataset.id))
        saveToLocalStorage()
      })
    })

    removeBtn.forEach((button) =>
      button.addEventListener('click', () => {
        removeQuantity(parseInt(button.dataset.id))
        saveToLocalStorage()
      })
    )
  }

  function addToCart(id) {
    const productToAdd = products.find((product) => product.id === id)
    if (productToAdd) {
      const existingProduct = carrito.find(
        (product) => product.id === productToAdd.id
      )
      if (existingProduct) {
        existingProduct.quantity++
        priceVariableContainer += parseInt(Math.round(existingProduct.price))
        cartPrice.textContent = '$' + priceVariableContainer
        saveCartPrice()
      } else {
        carrito.push({ ...productToAdd, quantity: 1 })
        priceVariableContainer += parseInt(Math.round(productToAdd.price))
        cartPrice.textContent = '$' + priceVariableContainer
        saveCartPrice()
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'No se pudo encontrar al objeto para añadir al carrito',
        icon: 'error',
        confirmButtonText: 'Cool',
      })
    }
    renderCart()
  }

  function removeQuantity(id) {
    const productToRemove = carrito.find((item) => item.id === id)

    if (productToRemove.quantity > 0) {
      productToRemove.quantity--
      priceVariableContainer -= parseInt(Math.round(productToRemove.price))
      cartPrice.textContent = '$' + priceVariableContainer
      saveCartPrice()
      renderCart()
    }

    if (productToRemove.quantity === 0) {
      carrito = carrito.filter((item) => item.id !== productToRemove.id)
      cartPrice.textContent = '0'
      saveCartPrice()
      renderCart()
    }
  }

  function renderProducts(productsToRender) {
    productsList.innerHTML = ''
    productsToRender.map((product) => {
      const productsListItem = document.createElement('li')
      productsListItem.classList.add('products-list-item')
      productsListItem.innerHTML = `
        <img src="${product.thumbnail}" height=140px width=140px  alt="${product.description} class="product-image"/>
        <div class="product-description">
          <h4 class="product-title">${product.title}</h4>
          <div class="pricing-div">
           <p class="product-price">$${product.price}</p> 
           <button class="addBtn" data-id="${product.id}">🛒</button>
          </div>
        </div>
      `
      productsList.appendChild(productsListItem)
    })

    const addBtns = productsList.querySelectorAll('.addBtn')

    addBtns.forEach((button) => {
      button.addEventListener('click', () => {
        addToCart(parseInt(button.dataset.id))
        saveToLocalStorage()
      })
    })
  }

  function clearCart() {
    cartList.innerHTML = ''
    localStorage.clear()
  }

  getFromLocalStorage()
  getCartPrice()
  renderCart()
  renderProducts(products)

  clearBtn.addEventListener('click', () => {
    clearCart()
    getFromLocalStorage()
  })

  //DROPDOWNSSSSSS

  dropdowns.forEach((dropdown) => {
    const select = dropdown.querySelector('.dropdown-select')
    const list = dropdown.querySelector('.dropdown-list')
    const items = dropdown.querySelectorAll('.dropdown-item')

    select.addEventListener('click', () => {
      list.classList.toggle('open-menu')
    })

    items.forEach((item) => {
      item.addEventListener('click', async () => {
        select.textContent = item.textContent
        list.classList.toggle('open-menu')
        if (item.textContent === 'All') {
          priceInput.value = 0
          price.textContent = '$0'
          inputSearch.value = ''
          renderProducts(products)
        } else {
          inputSearch.value = ''
          priceInput.value = '0'
          price.textContent = '$0'
          const productsFromCategories = await getCategories(item.textContent)
          renderProducts(productsFromCategories)
        }
      })
    })
  })

  //PRICE INPUTTTTTT

  priceInput.addEventListener('input', async () => {
    price.textContent = '$' + priceInput.value
    if (dropdownSelect.textContent === 'All' && inputSearch.value === '') {
      const products = await getProducts()
      const productosFiltrados = products.filter(
        (item) => item.price >= priceInput.value
      )
      renderProducts(productosFiltrados)
    } else if (inputSearch.value !== '') {
      const products = await getProductByTitle(inputSearch.value)
      const productosFiltrados = products.filter(
        (item) => item.price >= priceInput.value
      )
      renderProducts(productosFiltrados)
    } else {
      const productsFromCategories = await getCategories(
        dropdownSelect.textContent
      )
      const productosFiltrados = productsFromCategories.filter(
        (item) => item.price >= priceInput.value
      )
      renderProducts(productosFiltrados)
    }
  })

  searchBtn.addEventListener('click', async () => {
    if (inputSearch.value !== '') {
      const productByTitle = await getProductByTitle(inputSearch.value)
      if (productByTitle.length > 0) {
        renderProducts(productByTitle)
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'No se encontró el producto solicitado',
          icon: 'error',
          confirmButtonText: 'Cool',
        })
        return
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Debes escribir un producto para que pueda ser buscado',
        icon: 'error',
        confirmButtonText: 'Cool',
      })
    }
  })

  cartPrice.textContent = '$' + priceVariableContainer

  paymentLink.addEventListener('click', () => {
    if (carrito.length > 0) {
      window.location = './payment.html'
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Debe añadir productos al carrito para poder ir a pagar',
        icon: 'error',
        confirmButtonText: 'Cool',
      })
    }
  })
})

async function getProducts() {
  const req = await fetch('https://dummyjson.com/products?limit=30')
  const res = await req.json()

  return res.products
}

async function getCategories(search) {
  const req = await fetch(`https://dummyjson.com/products/category/${search}`)
  const res = await req.json()
  return res.products
}

async function getProductByTitle(search) {
  const req = await fetch(`https://dummyjson.com/products/search?q=${search}`)
  const res = await req.json()
  return res.products
}
