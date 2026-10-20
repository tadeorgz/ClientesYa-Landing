export const siteConfig = {
    companyName: 'ClientesYa',
    contactEmail: 'clientesya.uy@gmail.com',
    tagline: 'Landings que ordenan, venden y hacen crecer tu negocio.',
    heroTitle: 'Tu negocio merece una web que',
    heroTitleAccent: 'convierta visitas en clientes.',
    heroDescription:
        'Diseñamos landings claras, rápidas y centradas en venta para que tus mensajes, servicios y demos vivan en un solo lugar, con WhatsApp siempre a mano.',
    heroPrimaryCta: 'Quiero mi landing',
    heroSecondaryCta: 'Ver demos',
    whatsappNumber: import.meta.env.VITE_PUBLIC_WHATSAPP_NUMBER || '59894984842',
    defaultWhatsAppMessage: 'Hola ClientesYa, quiero contarles sobre mi proyecto y pedir un presupuesto a medida.',
    demoWhatsAppMessage: 'Hola ClientesYa, quiero una landing inspirada en sus demos.',
    ctaLabel: 'Hablar por WhatsApp',
    sectionTag: 'Diseño enfocado en ventas',
    colors: {
        brand: '#c6fa5f',
        brandDark: '#9acb43',
        accent: '#c6fa5f',
        bgSoft: '#090b09',
        text: '#f2f3ed',
    },
    socialLinks: [
        { name: 'Instagram', url: 'https://instagram.com/clientesya_' },
        // { name: 'Facebook', url: 'https://facebook.com' },
        { name: 'TikTok', url: 'https://tiktok.com/@clientesya' },
    ],
}