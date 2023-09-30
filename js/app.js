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
    const key = '39747926-dd78a22f07dfb931847a676ec'
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}`

    // Consultando la API
    fetch(url)
        .then(response => response.json())
        .then(resultado => {
            mostrarImagenes(resultado.hits)
        })
}

function mostrarImagenes(imagenes) {
    console.log(imagenes)
}
