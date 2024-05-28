
const listarCarrito = async (carrito) => {
    console.log(carrito)
    let acumulador = 0
    let div_carrito = ""
    carrito.forEach((p) => {
        // let pString = JSON.stringify(p).replace(/'/g,"\\'").replace(/"/g,'&quot;')
        acumulador += p.price
        div_carrito += `
            <div class="row border shadow-sm mx-1 mb-2">
                <div class="col-4">
                    <img class="m-1 mw-100 shadow" src="${p.image}" alt="soy la imagen" style="width: 250px; height:150px; "/>
                </div>
                <div class="col-8 mw-100">
                    <h4 class="card-title">${p.title}</h4>
                    <p class="card-text">$${p.price}</p>
                    <div class="mx-auto btn btn-danger bottom">¡¡¡¡SACAMEEE!!!!</div>
                </div> 


            </div> 
            `
    })
    let div_checkout = 
    `<div >
        <p>
            TOTAL: $${acumulador}
        </p>
        <div class="mx-auto btn btn-success bottom">¡¡¡¡COMPRAAAAAAAARRRRRRRRRRRRRRR!!!!</div>

    </div>
    `
    document.getElementById("div_carrito").innerHTML = div_carrito;
    document.getElementById("div_checkout").innerHTML = div_checkout;
}


const main = async () => {
    let carritostorage = localStorage.getItem('carrito')
    let carrito;
    if (carritostorage) {
        carrito = JSON.parse(carritostorage)
    } else {
        carrito = []
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }
    await listarCarrito(carrito)

}

main()