async function getData() {
    const url = "http://localhost:3000/products";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);
      return result
    } catch (error) {
      console.error(error.message);
    }
  }

async function prepareProductData(){
    if ("content" in document.createElement("template")) {
    // Находим элемент tbody таблицы
    // и шаблон строки
    const products = document.querySelector(".products");
    const template = document.querySelector("#product-card-tmp");
  
    // Клонируем новую строку и вставляем её в таблицу

    const productsData = await getData();
        console.log(typeof productsData)

    if (!productsData) {
        return
    }

    if(productsData.length === 0) {
        return
    }

    for (let i = 0; i < productsData.length; i++) { 

        const clone = template.content.cloneNode(true);
        const productItem = productsData[i];
        const link = clone.querySelector(".product-link")
        const image = clone.querySelector(".product-image")
        const title = clone.querySelector(".product-title")
        const price = clone.querySelector(".product-price")

        image.src = productItem.img_src 
        title.textContent = productItem.title
        price.textContent = productItem.price
        


        products.appendChild(clone);
    }
  

    // tbody.appendChild(clone);
  
    // // Клонируем новую строку ещё раз и вставляем её в таблицу
    // const clone2 = template.content.cloneNode(true);
    // td = clone2.querySelectorAll("td");
    // td[0].textContent = "0384928528";
    // td[1].textContent = "Acme Kidney Beans 2";
  
    // tbody.appendChild(clone2);
  } else {
    // Иной способ заполнить таблицу, потому что
    // HTML-элемент template не поддерживается.
  }

}

// const product = document.querySelector('.product');
// product.addEventListener('click', () => {
//   sessionStorage.setItem("selectedProduct", JSON.stringify(product));
//   window.location.href = "product.html";
// })

const openModal = document.querySelector('.product-cart-button')
const modal = document.querySelector('.product-modal')
const closeModal = document.querySelector('.product-close-modal')

openModal.addEventListener("click", () =>{
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener('click', (event)=> {
  if(event.target == modal) {
    modal.close()
  }  
});

prepareProductData()
