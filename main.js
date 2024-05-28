const obtenerCategorias = async () => {
    try {
        let respuesta = await fetch('https://fakestoreapi.com/products/categories')
        let json = await respuesta.json();
        let categorias_html = '<a class="dropdown-item" href="">Ver todo</a>'
        json.forEach((c) => {
            if (!c.includes("'")){
                categorias_html += `
                <a class="dropdown-item" onclick="obtenerProductosCategoria('${c}')">Ver ${c}</a>
                ` 
            } else {
                let param = c.replace("'","___")
                console.log(param)
                categorias_html += `
                <a class="dropdown-item" onclick="obtenerProductosCategoria('${param}')">Ver ${c}</a>
                ` 
            }
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
            let pString = JSON.stringify(p).replace(/'/g,"\\'").replace(/"/g,'&quot;')
            productos_html += `
            <div class="card d-flex align-center p-2 m-4 shadow" style="width: 300px;">
                <img class="card-img-top m-1 shadow" src="${p.image}" alt="${p.title}" style="width: 250px; height:150px; />
                <div class="card-body">
                    <h4 class="card-title">${p.title}</h4>
                    <p class="card-text">$${p.price}</p>
                    <div class="d-flex flex-column justify-content-end">
                        <a class="btn btn-primary bottom mb-2"  onclick="verProducto(${pString})" >Ver producto</a>
                        <div class="btn btn-danger bottom" onclick="agregarCarrito(${pString})" >¡¡¡COMPRAR AHORA!!!</div>
                    </div>
                </div>                
            </div> 
            `
        })
        document.getElementById("productos_html").innerHTML = productos_html;
    } catch (e) {
        console.error("error: ", e)
    }
}

const obtenerProductosCategoria = async (c) => {
    try{
        if(c.includes("___")){
            c = c.replace("___","'")
        }
        let respuesta = await fetch(`https://fakestoreapi.com/products/category/${c}`)
        let json = await respuesta.json();
        let productos_html = ""
        json.forEach((p) => {
            let pString = JSON.stringify(p).replace(/'/g,"\\'").replace(/"/g,'&quot;')
            productos_html += `
            <div class="card d-flex align-center p-2 m-4 shadow" style="width: 300px;">
                <img class="card-img-top m-1 shadow" src="${p.image}" alt="${p.title}" style="width: 250px; height:150px; />
                <div class="card-body">
                    <h4 class="card-title">${p.title}</h4>
                    <p class="card-text">$${p.price}</p>
                    <div class="d-flex flex-column justify-content-end">
                        <a class="btn btn-primary bottom mb-2"  onclick="verProducto(${pString})" >Ver producto</a>
                        <div class="btn btn-danger bottom" onclick="agregarCarrito(${pString})" >¡¡¡COMPRAR AHORA!!!</div>
                    </div>
                </div>                
            </div> 
            `
        })
        document.getElementById("productos_html").innerHTML = productos_html;
    } catch (e) {
        console.error("error: ", e)
}
}

const verProducto = async (p) => {
    let productos_html =`
    <div class="row container justify-content-around mt-5">
    <a onclick="obtenerProductosHome()" class="cursor-pointer">VOLVER A HOME</a>
    <div class="col-7 border text-center">
        <img class="text-center my-5" src="${p.image}" style="width: 50%; height: auto;" alt="${p.title}"/>
    </div>
    <div class="col-4 border text-center">
        <h1>${p.title}</h1>
        <div>${p.category}</div>
        <hr>
        <div>${p.description}</div>
        <hr>
        <h3>$${p.price}</h3>
        <div class="btn btn-danger bottom mb-3" onclick="agregarCarrito(pString)" >¡¡¡COMPRAR AHORA!!!</div>
    </div>
</div>
    `
    document.getElementById("productos_html").innerHTML = productos_html;
    console.log(p.title)
    
}

const main = async () => {
    await obtenerCategorias()
    console.log('categorías agregadas')
    await obtenerProductosHome()
    console.log("productos agregados")
}

main()