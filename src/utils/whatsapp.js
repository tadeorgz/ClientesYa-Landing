export function createWhatsAppLink(numero, mensaje) {
    const cleanNumber = String(numero || '').replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(mensaje || '')

    return `https://wa.me/${cleanNumber}?text=${encodedMessage}`
}

export function createProductInquiryMessage(companyName, productName) {
    return `Hola ${companyName}, quiero una landing inspirada en ${productName}. ¿Podemos hablar?`
}

export function createLandingInquiryMessage(companyName) {
    return `Hola ${companyName}, quiero una landing para mi negocio y me gustaría ver opciones.`
}