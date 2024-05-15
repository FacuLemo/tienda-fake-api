const obtenerCategorias = async () => {
    try {
        let respuesta = await fetch('https://fakestoreapi.com/products/categories')
        let json = await respuesta.json();
        let categorias_html = ""
        json.forEach((c) => {
            categorias_html += `
            <a class="dropdown-item" href="#">${c}</a>
            `
        })
        document.getElementById("dropdown_categorias").innerHTML = categorias_html;
    } catch (e) {
        console.error("error: ", e)
    }
}

const obtenerProductosHome = async () => {
    try {
        let respuesta = await fetch('https://fakestoreapi.com/products')
        let json = await respuesta.json();
        let productos_html = ""
        json.forEach((p) => {
            productos_html += `
            <div class="card m-3" style="width: 300px;">
                <img class="card-img-top" src="holder.js/100x180/" alt="${p.title}" />
                <div class="card-body">
                    <h4 class="card-title">${p.title}</h4>
                    <p class="card-text">$${p.price}</p>
                </div>
            </div> 
            `
        })
        document.getElementById("productos_html").innerHTML = productos_html;
    } catch (e) {
        console.error("error: ", e)
    }
}


const main = async () => {
    await obtenerCategorias()
    console.log('categorías agregadas')
    await obtenerProductosHome()
    console.log("productos agregados")
}

main()