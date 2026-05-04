import { useRef } from 'react'
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react'
import ProductCard from './ProductCard'
import { createProductInquiryMessage, createWhatsAppLink } from '../utils/whatsapp'
import WhatsAppButton from './WhatsAppButton'

function ProductsCarousel({ demos = [], companyName, whatsappNumber, variant = 'carousel' }) {
    const carouselRef = useRef(null)
    const isCarousel = variant === 'carousel'

    const scrollCarousel = (direction) => {
        if (!carouselRef.current) return

        const amount = carouselRef.current.clientWidth * 0.92
        carouselRef.current.scrollBy({
            left: direction * amount,
            behavior: 'smooth',
        })
    }

    return (
        <section id="demos" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm backdrop-blur">
                    <LayoutGrid size={11} className="text-[var(--brand-color)]" />
                    Demos reales
                </p>
                <h2 className="mt-5 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                    Distintas landings, mismas formas de vender mejor.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    Estas demos muestran cómo adaptamos la estructura, los mensajes y el foco visual según el tipo de negocio.
                </p>
            </div>

            <div className="mt-10 flex flex-col items-center">
                <div className="flex-1">
                    {isCarousel ? (
                        <div className="mb-4 flex  gap-2  ">
                            <button
                                type="button"
                                onClick={() => scrollCarousel(-1)}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all md:hover:-translate-y-0.5 md:hover:border-[var(--brand-color)]/30 md:hover:text-[var(--brand-color)]"
                                aria-label="Ver demos anteriores"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollCarousel(1)}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all md:hover:-translate-y-0.5 md:hover:border-[var(--brand-color)]/30 md:hover:text-[var(--brand-color)]"
                                aria-label="Ver más demos"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    ) : null}
                </div>

                {isCarousel ? (
                    <div className="mx-auto w-full max-w-6xl">

                        <div
                            ref={carouselRef}
                            className="flex gap-5 overflow-x-auto scroll-smooth pb-4 pr-8 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {demos.map((demo) => {
                                const inquiryMessage = createProductInquiryMessage(companyName, demo.nombre)
                                const whatsappHref = createWhatsAppLink(whatsappNumber, inquiryMessage)

                                return (
                                    <div key={demo.id} className="min-w-[86%] snap-start sm:min-w-[48%] lg:min-w-[31.5%]">
                                        <ProductCard demo={demo} whatsappHref={whatsappHref} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {demos.map((demo) => {
                            const inquiryMessage = createProductInquiryMessage(companyName, demo.nombre)
                            const whatsappHref = createWhatsAppLink(whatsappNumber, inquiryMessage)

                            return <ProductCard key={demo.id} demo={demo} whatsappHref={whatsappHref} />
                        })}
                    </div>
                )}

                <p className="text-sm font-medium text-slate-500">Desliza para ver más demos.</p>



                {isCarousel && (
                    <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">
                        <WhatsAppButton
                            href={createWhatsAppLink(whatsappNumber, createProductInquiryMessage(companyName, 'varias demos'))}
                            label="No ves demo de tu negocio? Pedí una personalizada"
                            size="lg"
                        // className=''
                        />

                    </div>
                )}
            </div>
        </section>
    )
}


export default ProductsCarousel
