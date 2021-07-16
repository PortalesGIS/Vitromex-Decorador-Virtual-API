const burbuja = (lista) =>{
    let n, i, k, aux;
    n = lista.length;
    for (k = 1; k < n; k++) {
        for (i = 0; i < (n - k); i++) {
            if (lista[i].total < lista[i + 1].total) {
                aux = lista[i].total;
                lista[i].total = lista[i + 1].total;
                lista[i + 1].total = aux;
            }
        }
    }
    return lista; // Mostramos, por consola, la lista ya ordenada
}

module.exports= {
    burbuja
}