
const listarCarrito = async (carrito) => {
    let acumulador = 0
    let div_carrito = ""
    carrito.forEach((p) => {
        let pString = JSON.stringify(p).replace(/'/g, "\\'").replace(/"/g, '&quot;')
        acumulador += p.price
        div_carrito += `
            <div class="row border shadow-sm mx-1 mb-2">
                <div class="col-4">
                    <img class="m-1 mw-100 shadow" src="${p.image}" alt="${p.title}" style="width: 250px; height:150px; "/>
                </div>
                <div class="col-8 mw-100">
                    <h4 class="card-title">${p.title}</h4>
                    <p class="card-text">$${p.price}</p>
                    <div class="mx-auto btn btn-danger bottom" onclick="eliminarProducto(${pString})">¡¡¡¡SACAMEEE!!!!</div>
                </div> 

            </div> 
            `
    })
    let div_checkout =
        `<div >
        <h3 class="flex-grow">
            TOTAL: $${acumulador}
        </h3>
        <div class="mx-auto mb-2 btn btn-success bottom" onclick="checkout()">¡¡¡¡COMPRAARRRR!!!!</div>
    </div>
    `
    document.getElementById("div_carrito").innerHTML = div_carrito;
    document.getElementById("div_checkout").innerHTML = div_checkout;
}

const eliminarProducto = (p) => {
    let carritostorage = JSON.parse(localStorage.getItem('carrito'))
    const filtrado = carritostorage.filter(pc => pc.id !== p.id )
    localStorage.setItem('carrito', JSON.stringify(filtrado))
    listarCarrito(filtrado)
}

const limpiarCarrito = () => {
    const carroVacio = []
    localStorage.setItem('carrito', JSON.stringify(carroVacio))
    listarCarrito(carroVacio)
}

const checkout = () => {
    let carritostorage = JSON.parse(localStorage.getItem('carrito'))
    if(carritostorage.length > 0){
        const div_checkout =document.getElementById("div_checkout")
        limpiarCarrito()
        div_checkout.innerHTML.includes("Gracias") ? "" :  div_checkout.innerHTML+="<p>¡¡ Gracias por su compra !! :) </p>" 
    }else{
        document.getElementById("div_checkout").innerHTML += `<p>¡Carrito vacío! Ve a home y agrega productos.</p>`;
    }
}


const main = async () => {
    try {
        let carritostorage = localStorage.getItem('carrito')
        let carrito;
        if (carritostorage) {
            carrito = JSON.parse(carritostorage)
        } else {
            carrito = []
            localStorage.setItem('carrito', JSON.stringify(carrito))
        }
        await listarCarrito(carrito)

    } catch (e) {
        console.error("error agarrado: ",e)
    }

}

main()