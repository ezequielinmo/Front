
//funcion transforma números a num dinero
function formatMoney(amount) {
    if (amount == null) {
        return '0.00'; // Valor por defecto si amount es null o undefined
    }
    return amount.toLocaleString('de-DE'/* , { minimumFractionDigits: 2, maximumFractionDigits: 2 } */);
}

//funcion pasa a fecha de argentina
function formatDate(date) {
    if (date == null) {
        return '00/00/0000'; // Valor por defecto si date es null o undefined
    }
    
    // Separar el año, mes y día de la cadena
    const [year, month, day] = date.split('-');
    
    // Formatear manualmente la fecha en formato DD/MM/YYYY
    return `${day}/${month}/${year}`;
}

//funcion 1er letra mayus resto minus
function capitalizar(texto) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}


export {
    formatMoney,
    formatDate,
    capitalizar
}