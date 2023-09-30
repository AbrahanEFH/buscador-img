const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);

}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        mostrarAlerta('Agrega un termino de busqueda');
        return;
    }

    buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {
    const alertaPrevia = document.querySelector('.alerta')

    if (!alertaPrevia) {
        const alerta = document.createElement('p')
        alerta.classList.add('bg-red-100', 'alerta', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline" >${mensaje}</span>
    `;

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
}

function buscarImagenes(termino) {
    const key = //'tu pai key'
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=50`

    // Consultando la API
    fetch(url)
        .then(response => response.json())
        .then(resultado => {
            mostrarImagenes(resultado.hits)
        })
}

function mostrarImagenes(imagenes) {
    console.log(imagenes)

    // Eliminamos los resultados previos
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    // Iterar sobre el arreglo de imagenes y construir el HTML
    imagenes.forEach(imagen => {
        const { previewURL, largeImageURL, likes, views } = imagen;

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}">

                    <div class="p-4">
                        <p class="font-bold"> ${likes} <spam class="font-light"> Me Gusta</spam> </p>
                        <p class="font-bold"> ${views} <spam class="font-light"> Vistas</spam> </p>
                        <a 
                            class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                            href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                                Ver Imagen</a>
                    </div>
                </div>
            </div>
        `
    })
}
