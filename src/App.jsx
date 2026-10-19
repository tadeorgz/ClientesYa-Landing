import { handleTrackedClick } from './utils/analytics'
import { createWhatsAppLink } from './utils/whatsapp'
import { siteConfig } from './config/siteConfig'
import Navbar from './components/PremiumNavbar'
import ContactForm from './components/ContactForm'
import MenuDemos from './components/MenuDemos'
import DraftIcon from './components/DraftIcon'
import PrivacyNotice from './components/PrivacyNotice'
import ConsentControls from './components/ConsentControls'

export default function App() {
  return <>
    <a href="#inicio" className="skip-link">Ir al contenido</a>
<div id="page" onClick={handleTrackedClick} className="antialiased min-h-screen bg-cy-dark text-cy-white overflow-x-hidden relative w-full">


    <Navbar />


    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute inset-x-0 top-0 h-[800px] bg-cy-glow"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cy-dark/80 to-cy-dark"></div>
    </div>

    <main>

      <section id="inicio" className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="flex flex-col items-start text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cy-line bg-cy-panel/50 px-3 py-1 mb-8">
                <span className="h-2 w-2 rounded-full bg-cy-lime animate-pulse"></span>
                <span className="text-xs font-mono text-cy-text-sec uppercase tracking-wider">Estudio Boutique Web</span>
              </div>
              <h1 className="text-[46px] sm:text-[60px] lg:text-[80px] xl:text-[104px] font-extrabold leading-[1.05] tracking-tight text-cy-white">
                Tu próximo cliente está a un <span className="text-cy-lime">clic.</span>
              </h1>
              <p className="mt-8 text-[16px] sm:text-[18px] leading-relaxed text-cy-text-sec max-w-lg">
                Webs a medida para empresas uruguayas que reciben consultas por WhatsApp. Transformamos tu información en una experiencia clara, rápida y enfocada en vender.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a id="hero-cta-primary" href={createWhatsAppLink(siteConfig.whatsappNumber, "Hola ClientesYa, quiero una landing para mi negocio.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-cy-lime px-8 py-4 text-base font-bold text-cy-dark transition-all hover:brightness-95 hover:-translate-y-1 w-full sm:w-auto">
                  <DraftIcon name="lucide:message-circle" width="20" />
                  <span>Quiero mi web</span>
                </a>
                <a id="hero-cta-secondary" href="#proyectos" className="inline-flex items-center justify-center gap-2 rounded-[12px] border border-cy-line bg-transparent px-8 py-4 text-base font-bold text-cy-white transition-all hover:bg-cy-panel hover:border-cy-text-sec w-full sm:w-auto">
                  <span>Ver proyectos</span>
                  <DraftIcon name="lucide:arrow-right" width="18" />
                </a>
              </div>
            </div>
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-[24px] border border-cy-line bg-cy-panel-light/30 shadow-2xl overflow-hidden flex items-center justify-center backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-cy-lime/5 to-transparent"></div>
                <div className="relative w-full max-w-[85%] h-full max-h-[85%]">
                    <div className="absolute top-0 right-0 w-3/4 h-[80%] rounded-[16px] border border-cy-line bg-cy-panel shadow-xl overflow-hidden translate-x-4 -translate-y-4">
                        <div className="h-8 border-b border-cy-line bg-cy-panel-light flex items-center px-4 gap-1.5">
                             <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="p-6 opacity-30">
                            <div className="w-1/2 h-6 bg-cy-line rounded mb-4"></div>
                            <div className="w-full h-3 bg-cy-line rounded mb-2"></div>
                            <div className="w-5/6 h-3 bg-cy-line rounded mb-2"></div>
                            <div className="w-3/4 h-3 bg-cy-line rounded"></div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-[55%] h-[90%] rounded-[24px] border border-cy-line bg-[#1c2117] shadow-2xl overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-6 flex justify-center pt-2">
                            <div className="w-1/3 h-4 bg-cy-dark rounded-full"></div>
                        </div>
                        <div className="mt-12 p-4 flex flex-col gap-3 h-full">
                            <div className="self-start bg-cy-panel-light border border-cy-line rounded-2xl rounded-tl-none p-3 max-w-[85%]">
                                <div className="w-20 h-2 bg-cy-line rounded mb-2 opacity-50"></div>
                                <div className="w-24 h-2 bg-cy-line rounded opacity-50"></div>
                            </div>
                            <div className="self-end bg-cy-lime text-cy-dark rounded-2xl rounded-tr-none p-3 max-w-[85%]">
                                <div className="text-[10px] font-bold mb-1 opacity-90">¡Hola! Me encanta el diseño.</div>
                                <div className="text-[9px] opacity-70">Quiero empezar mi proyecto.</div>
                            </div>
                            <div className="self-start bg-cy-panel-light border border-cy-line rounded-2xl rounded-tl-none p-3 max-w-[85%]">
                                <div className="w-24 h-2 bg-cy-line rounded mb-2 opacity-50"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>


      <section id="servicios" className="py-24 bg-cy-dark relative">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
            <div className="mb-16">
                <h2 className="text-[42px] sm:text-[56px] font-extrabold tracking-tight text-cy-white">Soluciones directas.</h2>
                <p className="mt-4 text-lg text-cy-text-sec max-w-2xl">Tres formatos pensados para negocios que no quieren perder tiempo y buscan concretar ventas.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="rounded-[24px] border border-cy-line bg-cy-panel p-8 flex flex-col transition-colors hover:border-cy-lime/30">
                    <div className="h-12 w-12 rounded-xl bg-cy-panel-light border border-cy-line flex items-center justify-center mb-6">
                        <DraftIcon name="lucide:layout-template" className="text-cy-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-cy-white">Landing Pages</h3>
                    <p className="text-cy-text-sec text-base mb-8 flex-grow">Una página enfocada en tu propuesta de valor, rápida y sin distracciones, diseñada para que te escriban.</p>
                    <a id="cta-service-landing" href={createWhatsAppLink(siteConfig.whatsappNumber, "Me interesa una Landing Page")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cy-lime font-bold text-sm hover:underline">
                        Consultar por landing <DraftIcon name="lucide:arrow-up-right" />
                    </a>
                </div>
                <div className="rounded-[24px] border border-cy-line bg-cy-panel p-8 flex flex-col transition-colors hover:border-cy-lime/30">
                    <div className="h-12 w-12 rounded-xl bg-cy-panel-light border border-cy-line flex items-center justify-center mb-6">
                        <DraftIcon name="lucide:shopping-bag" className="text-cy-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-cy-white">Catálogos Visuales</h3>
                    <p className="text-cy-text-sec text-base mb-8 flex-grow">Mostrá tus productos con fotos, descripciones y un botón de WhatsApp por cada artículo para pedidos exactos.</p>
                    <a id="cta-service-catalog" href={createWhatsAppLink(siteConfig.whatsappNumber, "Me interesa un Catálogo Visual")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cy-lime font-bold text-sm hover:underline">
                        Consultar por catálogo <DraftIcon name="lucide:arrow-up-right" />
                    </a>
                </div>
                <div className="rounded-[24px] border border-cy-line bg-cy-panel p-8 flex flex-col transition-colors hover:border-cy-lime/30">
                    <div className="h-12 w-12 rounded-xl bg-cy-panel-light border border-cy-line flex items-center justify-center mb-6">
                        <DraftIcon name="lucide:utensils" className="text-cy-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-cy-white">Menús Digitales QR</h3>
                    <p className="text-cy-text-sec text-base mb-8 flex-grow">La carta de tu restaurante en el celular de tus clientes. Fácil de leer, siempre actualizada y sin descargar apps.</p>
                    <a id="cta-service-menu" href={createWhatsAppLink(siteConfig.whatsappNumber, "Me interesa un Menú Digital")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cy-lime font-bold text-sm hover:underline">
                        Quiero mi menú digital <DraftIcon name="lucide:arrow-up-right" />
                    </a>
                </div>
            </div>
        </div>
      </section>


      <section id="caso-estudio" className="py-24 bg-cy-panel-light/30 border-t border-cy-line relative">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 relative rounded-[24px] border border-cy-line bg-cy-panel shadow-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[600px] flex items-start justify-center">
                    <img src="/zonamuebles-preview.webp" loading="lazy" decoding="async" alt="ZonaMuebles website preview" className="w-full h-auto object-cover object-top" />
                </div>
                <div className="order-1 lg:order-2 flex flex-col items-start">
                    <div className="inline-flex items-center gap-2 rounded-full border border-cy-line bg-cy-panel/50 px-3 py-1 mb-6">
                        <span className="text-xs font-mono text-cy-lime uppercase tracking-wider">Caso de Estudio Real</span>
                    </div>
                    <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight text-cy-white mb-6">
                        Catálogo con WhatsApp para ZonaMuebles
                    </h2>
                    <p className="text-lg text-cy-text-sec mb-8">
                        Desarrollamos una landing page enfocada en conversión que permite a los clientes navegar el catálogo completo y consultar directamente por el mueble de su interés mediante WhatsApp.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <a id="btn-zonamuebles-visit" href="https://zonamueblesuy.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-cy-panel border border-cy-line px-6 py-3 text-sm font-bold text-cy-white transition-all hover:border-cy-lime w-full sm:w-auto">
                            <span>Visitar sitio en vivo</span>
                            <DraftIcon name="lucide:external-link" width="16" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </section>


      <section id="proyectos" className="py-24 bg-cy-dark relative border-t border-cy-line">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
            <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="max-w-2xl">
                    <h2 className="text-[42px] sm:text-[56px] font-extrabold tracking-tight text-cy-white">Diseño web en Uruguay.</h2>
                    <p className="mt-4 text-lg text-cy-text-sec">Explorá nuestros demos interactivos diseñados específicamente para cada rubro. Todos incluyen integración directa con WhatsApp.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="rounded-[20px] border border-cy-line bg-cy-panel p-6 flex flex-col transition-all hover:border-cy-lime/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">🏠</span>
                        <span className="text-[10px] font-mono text-cy-text-sec uppercase tracking-wider bg-cy-panel-light px-2 py-1 rounded">Inmobiliaria</span>
                    </div>
                    <h3 className="text-lg font-bold text-cy-white mb-2">Inmobiliaria Demo</h3>
                    <p className="text-sm text-cy-text-sec mb-6 flex-grow">Redefinimos la experiencia de venta de inmuebles con elegancia, mostrando propiedades de forma moderna y clara.</p>
                    <a id="demo-link-8" href="https://inmobiliaria-landing-uy.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cy-lime font-bold text-xs hover:underline mt-auto">
                        Ver demo interactivo <DraftIcon name="lucide:arrow-right" />
                    </a>
<a id="demo-inquiry-8" href={createWhatsAppLink(siteConfig.whatsappNumber, "Hola ClientesYa, vi la demo Inmobiliaria Demo y quiero una web a medida para mi negocio. ¿Podemos hablar?")} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cy-white hover:text-cy-lime">Quiero una así <DraftIcon name="lucide:message-circle" width="15" /></a>
                </div>

                <div className="rounded-[20px] border border-cy-line bg-cy-panel p-6 flex flex-col transition-all hover:border-cy-lime/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">🚘</span>
                        <span className="text-[10px] font-mono text-cy-text-sec uppercase tracking-wider bg-cy-panel-light px-2 py-1 rounded">Automotriz</span>
                    </div>
                    <h3 className="text-lg font-bold text-cy-white mb-2">Automotora Demo</h3>
                    <p className="text-sm text-cy-text-sec mb-6 flex-grow">Modernizamos la presentación de vehículos con diseño premium, catálogo interactivo y experiencia fluida.</p>
                    <a id="demo-link-7" href="https://automotoras-landing.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cy-lime font-bold text-xs hover:underline mt-auto">
                        Ver demo interactivo <DraftIcon name="lucide:arrow-right" />
                    </a>
<a id="demo-inquiry-7" href={createWhatsAppLink(siteConfig.whatsappNumber, "Hola ClientesYa, vi la demo Automotora Demo y quiero una web a medida para mi negocio. ¿Podemos hablar?")} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cy-white hover:text-cy-lime">Quiero una así <DraftIcon name="lucide:message-circle" width="15" /></a>
                </div>

                <div className="rounded-[20px] border border-cy-line bg-cy-panel p-6 flex flex-col transition-all hover:border-cy-lime/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">🛋️</span>
                        <span className="text-[10px] font-mono text-cy-text-sec uppercase tracking-wider bg-cy-panel-light px-2 py-1 rounded">Hogar</span>
                    </div>
                    <h3 className="text-lg font-bold text-cy-white mb-2">Muebles/Sillones Demo</h3>
                    <p className="text-sm text-cy-text-sec mb-6 flex-grow">Catálogo de muebles y sillones presentado con calidez, mostrando diseños y transmitiendo comodidad.</p>
                    <a id="demo-link-6" href="https://sillones-landing.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cy-lime font-bold text-xs hover:underline mt-auto">
                        Ver demo interactivo <DraftIcon name="lucide:arrow-right" />
                    </a>
<a id="demo-inquiry-6" href={createWhatsAppLink(siteConfig.whatsappNumber, "Hola ClientesYa, vi la demo Muebles/Sillones Demo y quiero una web a medida para mi negocio. ¿Podemos hablar?")} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cy-white hover:text-cy-lime">Quiero una así <DraftIcon name="lucide:message-circle" width="15" /></a>
                </div>

                <div className="rounded-[20px] border border-cy-line bg-cy-panel p-6 flex flex-col transition-all hover:border-cy-lime/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">📚</span>
                        <span className="text-[10px] font-mono text-cy-text-sec uppercase tracking-wider bg-cy-panel-light px-2 py-1 rounded">Educación</span>
                    </div>
                    <h3 className="text-lg font-bold text-cy-white mb-2">Academia Demo</h3>
                    <p className="text-sm text-cy-text-sec mb-6 flex-grow">Cursos claros y organizados para todos los niveles, con información de fácil acceso y consultas directas.</p>
                    <a id="demo-link-5" href="https://academia-demo-uy.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cy-lime font-bold text-xs hover:underline mt-auto">
                        Ver demo interactivo <DraftIcon name="lucide:arrow-right" />
                    </a>
<a id="demo-inquiry-5" href={createWhatsAppLink(siteConfig.whatsappNumber, "Hola ClientesYa, vi la demo Academia Demo y quiero una web a medida para mi negocio. ¿Podemos hablar?")} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cy-white hover:text-cy-lime">Quiero una así <DraftIcon name="lucide:message-circle" width="15" /></a>
                </div>

                <div className="rounded-[20px] border border-cy-line bg-cy-panel p-6 flex flex-col transition-all hover:border-cy-lime/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">🧠</span>
                        <span className="text-[10px] font-mono text-cy-text-sec uppercase tracking-wider bg-cy-panel-light px-2 py-1 rounded">Salud</span>
                    </div>
                    <h3 className="text-lg font-bold text-cy-white mb-2">Psicología Demo</h3>
                    <p className="text-sm text-cy-text-sec mb-6 flex-grow">Servicios psicológicos presentados de forma cálida y profesional, facilitando la primera consulta.</p>
                    <a id="demo-link-4" href="https://psicologa-demo-five.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cy-lime font-bold text-xs hover:underline mt-auto">
                        Ver demo interactivo <DraftIcon name="lucide:arrow-right" />
                    </a>
<a id="demo-inquiry-4" href={createWhatsAppLink(siteConfig.whatsappNumber, "Hola ClientesYa, vi la demo Psicología Demo y quiero una web a medida para mi negocio. ¿Podemos hablar?")} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cy-white hover:text-cy-lime">Quiero una así <DraftIcon name="lucide:message-circle" width="15" /></a>
                </div>

                <div className="rounded-[20px] border border-cy-line bg-cy-panel p-6 flex flex-col transition-all hover:border-cy-lime/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">🔧</span>
                        <span className="text-[10px] font-mono text-cy-text-sec uppercase tracking-wider bg-cy-panel-light px-2 py-1 rounded">Comercio</span>
                    </div>
                    <h3 className="text-lg font-bold text-cy-white mb-2">Ferretería Demo</h3>
                    <p className="text-sm text-cy-text-sec mb-6 flex-grow">Catálogo de herramientas y productos organizados por categorías, con contacto directo por WhatsApp.</p>
                    <a id="demo-link-3" href="https://ferreteria-landing-one.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cy-lime font-bold text-xs hover:underline mt-auto">
                        Ver demo interactivo <DraftIcon name="lucide:arrow-right" />
                    </a>
<a id="demo-inquiry-3" href={createWhatsAppLink(siteConfig.whatsappNumber, "Hola ClientesYa, vi la demo Ferretería Demo y quiero una web a medida para mi negocio. ¿Podemos hablar?")} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cy-white hover:text-cy-lime">Quiero una así <DraftIcon name="lucide:message-circle" width="15" /></a>
                </div>

                <div className="rounded-[20px] border border-cy-line bg-cy-panel p-6 flex flex-col transition-all hover:border-cy-lime/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">🚗</span>
                        <span className="text-[10px] font-mono text-cy-text-sec uppercase tracking-wider bg-cy-panel-light px-2 py-1 rounded">Automotriz</span>
                    </div>
                    <h3 className="text-lg font-bold text-cy-white mb-2">RentaCar Demo</h3>
                    <p className="text-sm text-cy-text-sec mb-6 flex-grow">Alquiler de vehículos con catálogo moderno, búsqueda intuitiva y contacto inmediato para reservas.</p>
                    <a id="demo-link-2" href="https://renta-car-landing.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cy-lime font-bold text-xs hover:underline mt-auto">
                        Ver demo interactivo <DraftIcon name="lucide:arrow-right" />
                    </a>
<a id="demo-inquiry-2" href={createWhatsAppLink(siteConfig.whatsappNumber, "Hola ClientesYa, vi la demo RentaCar Demo y quiero una web a medida para mi negocio. ¿Podemos hablar?")} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cy-white hover:text-cy-lime">Quiero una así <DraftIcon name="lucide:message-circle" width="15" /></a>
                </div>

                <div className="rounded-[20px] border border-cy-line bg-cy-panel p-6 flex flex-col transition-all hover:border-cy-lime/50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">🦷</span>
                        <span className="text-[10px] font-mono text-cy-text-sec uppercase tracking-wider bg-cy-panel-light px-2 py-1 rounded">Salud</span>
                    </div>
                    <h3 className="text-lg font-bold text-cy-white mb-2">Odontología Demo</h3>
                    <p className="text-sm text-cy-text-sec mb-6 flex-grow">Servicios dentales presentados de forma profesional, con agenda clara y consultas organizadas.</p>
                    <a id="demo-link-1" href="https://dcoop.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cy-lime font-bold text-xs hover:underline mt-auto">
                        Ver demo interactivo <DraftIcon name="lucide:arrow-right" />
                    </a>
<a id="demo-inquiry-1" href={createWhatsAppLink(siteConfig.whatsappNumber, "Hola ClientesYa, vi la demo Odontología Demo y quiero una web a medida para mi negocio. ¿Podemos hablar?")} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cy-white hover:text-cy-lime">Quiero una así <DraftIcon name="lucide:message-circle" width="15" /></a>
                </div>
            </div>
        </div>
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 pt-8"><a className="text-cy-lime font-bold" href="#contacto">¿Tu rubro es diferente? Contanos tu idea <span aria-hidden="true">↗</span></a></div></section>


      <section id="menu-digital" className="py-24 bg-cy-panel-light/30 border-t border-cy-line relative">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight text-cy-white mb-4">Menú digital QR para restaurantes</h2>
                <p className="text-lg text-cy-text-sec">
                    Ofrecé a tus comensales un menú visual y fácil de leer escaneando un QR. Sin aplicaciones molestas.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="rounded-[24px] border border-cy-line bg-cy-panel p-8 text-center">
                    <h3 className="text-2xl font-bold text-cy-white mb-4">Gestión a Demanda</h3>
                    <p className="text-cy-text-sec mb-6">Nos encargamos de las actualizaciones. Nos enviás los cambios y mantenemos tu carta al día.</p>
                    <div className="text-xl font-mono text-cy-lime mb-6">A cotizar</div>
                    <a id="cta-menu-demanda" href={createWhatsAppLink(siteConfig.whatsappNumber, "Presupuesto Menú Gestión Demanda")} target="_blank" rel="noopener noreferrer" className="inline-block w-full rounded-[12px] border border-cy-line py-3 font-bold hover:bg-cy-panel-light transition-colors">Pedí tu presupuesto</a>
                </div>
                <div className="rounded-[24px] border border-cy-lime bg-cy-panel p-8 text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cy-lime text-cy-dark px-3 py-1 rounded-full text-xs font-bold">Recomendado</div>
                    <h3 className="text-2xl font-bold text-cy-white mb-4">Panel Autogestionable</h3>
                    <p className="text-cy-text-sec mb-6">Control total sobre tus platos y precios desde un panel de control fácil de usar cuando lo necesites.</p>
                    <div className="text-xl font-mono text-cy-lime mb-6">A cotizar</div>
                    <a id="cta-menu-auto" href={createWhatsAppLink(siteConfig.whatsappNumber, "Presupuesto Menú Autogestionable")} target="_blank" rel="noopener noreferrer" className="inline-block w-full rounded-[12px] bg-cy-lime text-cy-dark py-3 font-bold hover:brightness-95 transition-colors">Pedí tu presupuesto</a>
                </div>
            </div>
        </div>
      <MenuDemos /></section>


      <section id="planes" className="py-24 bg-cy-dark border-t border-cy-line relative">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-[42px] font-extrabold tracking-tight text-cy-white mb-4">Inversión clara.</h2>
                <p className="text-lg text-cy-text-sec">Páginas web para empresas uruguayas sin sorpresas ocultas.</p>
            </div>
            <div className="max-w-3xl mx-auto rounded-[24px] border border-cy-line bg-cy-panel p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cy-line pb-8 mb-8">
                    <div>
                        <h3 className="text-3xl font-bold text-cy-white mb-2">Landing a medida</h3>
                        <p className="text-cy-text-sec">Diseño y desarrollo inicial.</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                        <div className="text-[42px] font-extrabold text-cy-lime leading-none">USD 149</div>
                        <div className="text-sm text-cy-text-sec mt-1">desde · pago inicial</div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-cy-text-sec">
                            <DraftIcon name="lucide:check" className="text-cy-lime mt-1" />
                            <span>Mantenimiento y hosting: <strong>USD 15/mes</strong></span>
                        </li>
                        <li className="flex items-start gap-3 text-cy-text-sec">
                            <DraftIcon name="lucide:check" className="text-cy-lime mt-1" />
                            <span>Dominio por un año incluido</span>
                        </li>
                    </ul>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-cy-text-sec">
                            <DraftIcon name="lucide:info" className="text-cy-text-sec mt-1" />
                            <span className="text-sm">Renovación de dominio sujeta a cotización anual.</span>
                        </li>
                        <li className="flex items-start gap-3 text-cy-text-sec">
                            <DraftIcon name="lucide:info" className="text-cy-text-sec mt-1" />
                            <span className="text-sm">Impuestos no incluidos. Alcance de mantenimiento a acordar.</span>
                        </li>
                    </ul>
                </div>
                <div className="text-center">
                    <a id="pricing-landing-whatsapp" href={createWhatsAppLink(siteConfig.whatsappNumber, 'Hola ClientesYa, me interesa la landing desde USD 149 y el mantenimiento de USD 15 por mes. Quiero contarles sobre mi negocio.')} target="_blank" rel="noopener noreferrer" className="primary-button mb-6">Empezar mi web <DraftIcon name="lucide:arrow-up-right" width="18" /></a>
                    <p className="text-sm text-cy-text-sec mb-4">¿Integraciones de pagos o funciones personalizadas?</p>
                    <a id="btn-pricing-custom" href={createWhatsAppLink(siteConfig.whatsappNumber, "Quiero una cotización a medida")} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 rounded-[12px] border border-cy-line font-bold text-cy-white hover:bg-cy-panel-light transition-colors">
                        Solicitar cotización personalizada
                    </a>
                </div>
            </div>
        </div>
      </section>


      <section id="proceso" className="py-24 bg-cy-panel-light/30 border-t border-cy-line relative">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
            <div className="mb-16 text-center">
                <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight text-cy-white">Cómo trabajamos</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative">
                <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px bg-cy-line -z-10"></div>
                <div className="bg-cy-panel border border-cy-line rounded-[20px] p-6 text-center">
                    <div className="w-16 h-16 bg-cy-dark border border-cy-line rounded-full flex items-center justify-center text-2xl font-bold text-cy-lime mx-auto mb-6">1</div>
                    <h3 className="text-xl font-bold text-cy-white mb-3">Contacto inicial</h3>
                    <p className="text-cy-text-sec text-sm">Nos contás tu idea por WhatsApp o formulario y definimos el enfoque para tu negocio uruguayo.</p>
                </div>
                <div className="bg-cy-panel border border-cy-line rounded-[20px] p-6 text-center">
                    <div className="w-16 h-16 bg-cy-dark border border-cy-line rounded-full flex items-center justify-center text-2xl font-bold text-cy-lime mx-auto mb-6">2</div>
                    <h3 className="text-xl font-bold text-cy-white mb-3">Diseño y feedback</h3>
                    <p className="text-cy-text-sec text-sm">Armamos el boceto de tu sitio web a medida y lo ajustamos basándonos en tus comentarios.</p>
                </div>
                <div className="bg-cy-panel border border-cy-line rounded-[20px] p-6 text-center">
                    <div className="w-16 h-16 bg-cy-dark border border-cy-line rounded-full flex items-center justify-center text-2xl font-bold text-cy-lime mx-auto mb-6">3</div>
                    <h3 className="text-xl font-bold text-cy-white mb-3">Lanzamiento</h3>
                    <p className="text-cy-text-sec text-sm">Publicamos tu sitio para que empieces a recibir consultas y ventas directamente en tu celular.</p>
                </div>
            </div>
        </div>
      </section>


      <section id="nosotros" className="py-24 bg-cy-dark border-t border-cy-line relative">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
            <div className="max-w-3xl mx-auto text-center">
                <div className="inline-block p-4 rounded-full bg-cy-panel border border-cy-line mb-6">
                    <DraftIcon name="lucide:user" className="text-3xl text-cy-lime" />
                </div>
                <h2 className="text-2xl font-bold text-cy-white mb-6">Detrás de ClientesYa</h2>
                <p className="text-lg text-cy-text-sec leading-relaxed">
                    Soy Tadeo, desarrollador enfocado en crear herramientas que resuelvan problemas reales de los negocios. Mi objetivo es que las empresas uruguayas tengan presencia digital profesional, rápida y enfocada en lo que importa: conseguir clientes y facilitar ventas sin complicaciones técnicas.
                </p>
            </div>
        </div>
      </section>


      <section id="faq" className="py-24 bg-cy-panel-light/30 border-t border-cy-line relative">
        <div className="mx-auto max-w-[800px] px-5 sm:px-10">
            <div className="text-center mb-16">
                <h2 className="text-[36px] sm:text-[48px] font-extrabold tracking-tight text-cy-white">Preguntas Frecuentes</h2>
            </div>
            <div className="space-y-4">
                <details className="group rounded-[16px] border border-cy-line bg-cy-panel p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                        <h2 className="text-lg font-bold text-cy-white">¿Cuánto demora en estar lista mi web?</h2>
                        <span className="shrink-0 rounded-full bg-cy-panel-light p-1.5 text-cy-white sm:p-3">
                            <DraftIcon name="lucide:plus" className="group-open:-rotate-45 transition-transform" />
                        </span>
                    </summary>
                    <p className="mt-4 leading-relaxed text-cy-text-sec">
                        Acordamos el plazo en tu presupuesto según el alcance del proyecto y los materiales disponibles. Antes de empezar vas a saber qué necesitamos y cuándo estará lista.
                    </p>
                </details>
                <details className="group rounded-[16px] border border-cy-line bg-cy-panel p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                        <h2 className="text-lg font-bold text-cy-white">¿Qué necesito para empezar?</h2>
                        <span className="shrink-0 rounded-full bg-cy-panel-light p-1.5 text-cy-white sm:p-3">
                            <DraftIcon name="lucide:plus" className="group-open:-rotate-45 transition-transform" />
                        </span>
                    </summary>
                    <p className="mt-4 leading-relaxed text-cy-text-sec">
                        Necesitamos el logo de tu empresa, textos básicos sobre tus servicios, fotos de buena calidad e información de contacto (como el número de WhatsApp al que querés recibir consultas).
                    </p>
                </details>
                <details className="group rounded-[16px] border border-cy-line bg-cy-panel p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                        <h2 className="text-lg font-bold text-cy-white">¿El dominio está incluido?</h2>
                        <span className="shrink-0 rounded-full bg-cy-panel-light p-1.5 text-cy-white sm:p-3">
                            <DraftIcon name="lucide:plus" className="group-open:-rotate-45 transition-transform" />
                        </span>
                    </summary>
                    <p className="mt-4 leading-relaxed text-cy-text-sec">
                        Sí, el primer año del dominio acordado está incluido en el plan inicial. La renovación se cotiza y abona anualmente de forma separada.
                    </p>
                </details>
                <details className="group rounded-[16px] border border-cy-line bg-cy-panel p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                        <h2 className="text-lg font-bold text-cy-white">¿Puedo modificar la web después?</h2>
                        <span className="shrink-0 rounded-full bg-cy-panel-light p-1.5 text-cy-white sm:p-3">
                            <DraftIcon name="lucide:plus" className="group-open:-rotate-45 transition-transform" />
                        </span>
                    </summary>
                    <p className="mt-4 leading-relaxed text-cy-text-sec">
                        Sí. Definimos en tu presupuesto qué cambios incluye el mantenimiento. Las nuevas secciones, funciones o integraciones se cotizan por separado.
                    </p>
                </details>
                <details className="group rounded-[16px] border border-cy-line bg-cy-panel p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                        <h2 className="text-lg font-bold text-cy-white">¿Las consultas van a mi WhatsApp personal?</h2>
                        <span className="shrink-0 rounded-full bg-cy-panel-light p-1.5 text-cy-white sm:p-3">
                            <DraftIcon name="lucide:plus" className="group-open:-rotate-45 transition-transform" />
                        </span>
                    </summary>
                    <p className="mt-4 leading-relaxed text-cy-text-sec">
                        Podemos vincular el botón al número que prefieras. Recomendamos usar un número de WhatsApp Business para separar la comunicación personal de la comercial.
                    </p>
                </details>
                <details className="group rounded-[16px] border border-cy-line bg-cy-panel p-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5">
                        <h2 className="text-lg font-bold text-cy-white">¿Hacen tiendas con carrito y pago online?</h2>
                        <span className="shrink-0 rounded-full bg-cy-panel-light p-1.5 text-cy-white sm:p-3">
                            <DraftIcon name="lucide:plus" className="group-open:-rotate-45 transition-transform" />
                        </span>
                    </summary>
                    <p className="mt-4 leading-relaxed text-cy-text-sec">
                        Nuestro enfoque principal son catálogos y landings que dirigen a WhatsApp para cerrar la venta directamente. Integraciones de pago completas se realizan únicamente bajo presupuesto personalizado.
                    </p>
                </details>
            </div>
        </div>
      </section>


      <section id="contacto" className="py-24 bg-cy-dark border-t border-cy-line relative">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
            <div className="grid lg:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-[42px] font-extrabold tracking-tight text-cy-white mb-4">Empecemos hoy.</h2>
                    <p className="text-lg text-cy-text-sec mb-8">
                        Escribinos directo por WhatsApp o contanos tu proyecto en el formulario para preparar tu consulta personalizada por WhatsApp.
                    </p>
                    <div className="space-y-4">
                        <a id="contact-direct-wa" href={createWhatsAppLink(siteConfig.whatsappNumber, "Hola ClientesYa, quiero conocer las opciones para mi negocio en Uruguay.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg font-bold text-cy-white hover:text-cy-lime transition-colors">
                            <div className="w-12 h-12 rounded-full bg-cy-panel border border-cy-line flex items-center justify-center">
                                <DraftIcon name="lucide:message-circle" className="text-xl" />
                            </div>
                            +598 94 984 842
                        </a>
                        <a id="contact-direct-email" href="mailto:clientesya.uy@gmail.com" className="flex items-center gap-3 text-lg font-bold text-cy-white hover:text-cy-lime transition-colors">
                            <div className="w-12 h-12 rounded-full bg-cy-panel border border-cy-line flex items-center justify-center">
                                <DraftIcon name="lucide:mail" className="text-xl" />
                            </div>
                            clientesya.uy@gmail.com
                        </a>
                    </div>
                </div>
                <div className="bg-cy-panel border border-cy-line rounded-[24px] p-8">
                    <ContactForm />
                </div>
            </div>
        </div>
      </section>

    </main>


    <footer className="py-12 border-t border-cy-line bg-cy-panel">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
                <img src="/clientesya-logo.webp" alt="ClientesYa Logo" className="h-8 w-8 object-contain" />
                <span className="font-extrabold text-cy-white tracking-tight">ClientesYa</span>
            </div>
            <div className="text-sm text-cy-text-sec text-center md:text-right">
                © 2026 ClientesYa. Todos los derechos reservados.<br />
                Webs a medida para empresas uruguayas.
            </div>
        </div>
        <div className="mx-auto max-w-[1280px] px-5 sm:px-10 mt-6 flex flex-wrap justify-center md:justify-start gap-5 text-sm text-cy-text-sec">
          {siteConfig.socialLinks.map(social => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-cy-lime">{social.name} ↗</a>)}
        </div>
    <PrivacyNotice /></footer>
</div>
<ConsentControls />
<a href={createWhatsAppLink(siteConfig.whatsappNumber, siteConfig.defaultWhatsAppMessage)} id="floating-whatsapp" aria-label="Consultar por WhatsApp" className="floating-whatsapp" onClick={handleTrackedClick}><DraftIcon name="lucide:message-circle" width="25" /><span>Hablemos</span></a>
</>
}
