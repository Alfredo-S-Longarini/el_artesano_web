import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- HOOK PARA MANEJAR MONEDAS Y TASAS ---
const useCurrencyRates = () => {
    const [currency, setCurrency] = useState('USD');
    const [rates, setRates] = useState({ ARS: 0, CRC: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedCurrency = localStorage.getItem('selectedCurrency');
        if (savedCurrency) {
            setCurrency(savedCurrency);
        }

        const fetchRates = async () => {
            try {
                const resArs = await fetch('https://dolarapi.com/v1/dolares/blue');
                const dataArs = await resArs.json();

                const resCrc = await fetch('https://open.er-api.com/v6/latest/USD');
                const dataCrc = await resCrc.json();

                setRates({
                    ARS: dataArs.venta,
                    CRC: dataCrc.rates.CRC
                });
                
            } catch (error) {
                console.error("Error al obtener tasas:", error);
                setRates({ ARS: 1500, CRC: 515 });
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    useEffect(() => {
        if (currency) {
            localStorage.setItem('selectedCurrency', currency);
        }
    }, [currency]);

    return { currency, setCurrency, rates, loading };
};

const Services = () => {
    const [activeTab, setActiveTab] = useState('development');
    const { currency, setCurrency, rates, loading } = useCurrencyRates();

    const formatPrice = (priceInUsd) => {
        if (!priceInUsd) return null;

        let finalPrice = priceInUsd;
        let locale = 'en-US';
        let currencyCode = 'USD';

        if (currency === 'ARS') {
            finalPrice = Math.round(priceInUsd * rates.ARS/1000)*1000;
            locale = 'es-AR';
            currencyCode = 'ARS';
        } else if (currency === 'CRC') {
            finalPrice = Math.round(priceInUsd * rates.CRC/1000)*1000;
            locale = 'es-CR';
            currencyCode = 'CRC';
        }

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
            maximumFractionDigits: 0,
        }).format(finalPrice);
    };

    // Función para mostrar rango de precios (para servicios con precio "desde")
    const formatPriceRange = (minUsd, maxUsd) => {
        return `${formatPrice(minUsd)} – ${formatPrice(maxUsd)}`;
    };

    const services = [
        {
            id: 1,
            icon: "/img/engranaje.webp",
            price: 350,
            isPopular: false,
            title: "Engranaje Esencial",
            desc: "Tu primera presencia online, construida con cuidado. Ideal si estás empezando o tu negocio todavía no tiene presencia en internet. Obtenés un sitio profesional, rápido y optimizado para que Google empiece a encontrarte.",
            content: [
                "Sitio web One Page o hasta 3 páginas (Ej: Inicio, Sobre Mí/Nosotros, Contacto).",
                "Diseño 100% responsive (Móvil/PC).",
                "Formulario de contacto funcional.",
                "SEO Básico: títulos, descripciones y conexión con Google Search Console.",
                "Conexión con redes sociales.",
            ],
            time: "2–3 semanas",
            featured: false,
        },
        {
            id: 2,
            icon: "/img/mecanismo_completo.webp",
            price: 650,
            isPopular: true,
            title: "Mecanismo Completo",
            desc: "La web que tu negocio necesita para crecer. Para restaurantes, cafeterías, estudios, startups o cualquier negocio que necesite mostrar más de lo básico, con optimización SEO para que te encuentren quienes te están buscando.",
            content: [
                "Todo lo del Paquete Engranaje.",
                "Sitio web de hasta 6 páginas (Ej: Inicio, Servicios, Portfolio/Galería, Blog, Nosotros, Contacto).",
                "Una funcionalidad clave a elección: Blog, Galería/Portfolio avanzada o sistema de reservas/turnos.",
                "SEO Intermedio: investigación de palabras clave, optimización de imágenes y estructura de URLs.",
                "Optimización de velocidad y Core Web Vitals.",
                "Integración con Google Maps.",
            ],
            time: "4–6 semanas",
            featured: true,
        },
        {
            id: 3,
            icon: "/img/cronografo_a_medida.webp",
            price: 1500,
            isPopular: false,
            pricePrefix: "desde",
            title: "Cronógrafo a Medida",
            desc: "Una solución digital completa para empresas que piensan en grande. Para negocios que requieren arquitecturas complejas, catálogos, reservas o sitios en múltiples idiomas. Incluye capacitación para que tu equipo gestione el sitio de forma autónoma.",
            content: [
                "Todo lo del Paquete Mecanismo.",
                "Arquitectura web ampliada (+10 páginas).",
                "Funcionalidad a medida: Catálogo Vidriera, Reservas o Multi-idioma.",
                "Diseño premium y micro-interacciones.",
                "Formularios inteligentes con lógica condicional.",
                "SEO Técnico Avanzado y optimización de velocidad.",
                "Capacitación personalizada de gestión.",
            ],
            time: "8–14 semanas según alcance",
            featured: false,
        },
    ];

    const maintenanceServices = [
        {
            id: 4,
            icon: "/img/sm-1.webp",
            price: 60,
            isPopular: false,
            title: "Puesta a Punto Esencial",
            desc: "Para quienes necesitan que todo funcione, sin sorpresas. Tu web siempre protegida, sin que tengas que pensar en ello.",
            content: [
                "Actualizaciones mensuales del sistema, plugins y temas.",
                "Copias de seguridad semanales (backups).",
                "Escaneos de seguridad para prevenir malware.",
                "Monitorización de uptime (verificar que la web no se caiga).",
                "Reporte mensual con las acciones realizadas.",
            ],
        },
        {
            id: 5,
            icon: "/img/sm-2.webp",
            price: 90,
            isPopular: false,
            title: "Soporte Prioritario",
            desc: "Para quienes además de seguridad, necesitan hacer cambios de vez en cuando. Actualizá contenidos sin depender de nadie.",
            content: [
                "Todo lo del plan Esencial.",
                "1 a 2 horas mensuales para actualizar textos, fotos, entradas de blog u otros contenidos menores (no acumulables).",
                "Soporte prioritario por email o WhatsApp.",
            ],
        },
        {
            id: 6,
            icon: "/img/sm-3.webp",
            price: 180,
            isPopular: true,
            title: "Mantenimiento Taller Completo",
            desc: "Para empresas que necesitan un desarrollador de confianza, sin contratar uno de planta. Como tener un desarrollador en tu equipo, a una fracción del costo.",
            content: [
                "Todo lo del plan Soporte Prioritario.",
                "4 a 6 horas mensuales de desarrollo real: nuevas funcionalidades, mejoras de diseño o ajustes técnicos.",
                "Revisión SEO mensual incluida.",
                "Informe detallado mensual con métricas y acciones realizadas.",
                "Prioridad máxima en tiempos de respuesta.",
            ],
        },
    ];

    const otherServices = [
        {
            id: 7,
            icon: "/img/os-1.svg",
            priceRange: [400, 900],
            isPopular: false,
            title: "Revisión y Ajuste",
            subtitle: "Rediseño / Migración",
            desc: "¿Tu web tiene más de 2 años? Probablemente está perdiendo clientes sin que lo notes. Tomo tu sitio actual y lo transformo: diseño actualizado, mayor velocidad y posicionamiento SEO preservado.",
            content: [
                "Diagnóstico inicial del sitio existente.",
                "Rediseño visual completo o parcial según necesidad.",
                "Migración a tecnología moderna si corresponde.",
                "Preservación del posicionamiento SEO durante la transición.",
                "Optimización de velocidad y experiencia móvil.",
            ],
            cta: "Consultá por tu caso",
        },
        {
            id: 8,
            icon: "/img/os-2.svg",
            priceRange: [150, 250],
            isPopular: false,
            title: "Auditoría del Taller Digital",
            subtitle: "Consultoría SEO + Diagnóstico",
            desc: "¿Sabés realmente cómo está funcionando tu web? Analizó tu sitio en profundidad y recibís un informe claro en PDF con todo lo que está fallando y un plan de acción concreto para solucionarlo.",
            content: [
                "Análisis de velocidad de carga y Core Web Vitals.",
                "Auditoría SEO técnica completa.",
                "Revisión de experiencia móvil y accesibilidad.",
                "Detección de errores y oportunidades de mejora.",
                "Informe en PDF con plan de acción priorizado.",
            ],
            cta: "Pedí tu auditoría",
            highlight: "Puerta de entrada ideal para empresas con web existente",
        },
        {
            id: 9,
            icon: "/img/os-3.svg",
            priceRange: [900, 2000],
            isPopular: false,
            title: "Tienda Artesanal",
            subtitle: "E-commerce",
            desc: "Vendé online, sin complicaciones. Diseño y desarrollo tu tienda online desde cero, con todo lo que necesitás para empezar a vender y administrar tu inventario de forma autónoma.",
            content: [
                "Catálogo de productos con categorías y filtros.",
                "Carrito de compras y pasarela de pago integrada.",
                "Panel de administración para gestionar inventario.",
                "SEO para productos y categorías.",
                "Capacitación completa para gestión autónoma.",
            ],
            cta: "Hablemos de tu tienda",
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.1,
                duration: 0.5
            }
        })
    };

    const tabs = [
        { id: 'development', label: 'Desarrollo Web' },
        { id: 'maintenance', label: 'Mantenimiento' },
        { id: 'other', label: 'Otros Servicios' },
    ];

    const activeServices =
        activeTab === 'development' ? services :
        activeTab === 'maintenance' ? maintenanceServices :
        otherServices;

    const isMaintenanceTab = activeTab === 'maintenance';
    const isOtherTab = activeTab === 'other';

    return (
        <section id="servicios" className="py-24 bg-[#F9F7F2] text-[#5c4033]">
            <div className="container mx-auto px-6">

                {/* Encabezado */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                        Servicios a Medida
                    </h2>
                    <p className="text-lg font-sans text-stone-600 max-w-2xl mx-auto">
                        Soluciones diseñadas para adaptarse a la etapa actual de tu negocio.
                    </p>
                </motion.div>

                {/* Selector de Moneda — solo visible cuando no es "Otros Servicios" */}
                {!isOtherTab && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-8"
                    >
                        <div className="bg-white p-1 rounded-lg border border-stone-200 shadow-sm inline-flex items-center text-sm font-sans">
                            <span className="px-3 text-stone-400 hidden sm:block">Moneda:</span>
                            {['USD', 'ARS', 'CRC'].map((curr) => (
                                <button
                                    key={curr}
                                    onClick={() => setCurrency(curr)}
                                    disabled={loading}
                                    className={`px-4 py-1.5 rounded-md transition-all font-medium ${
                                        currency === curr
                                        ? 'bg-[#5c4033] text-white shadow-sm'
                                        : 'text-stone-600 hover:bg-stone-50'
                                    }`}
                                >
                                    {curr === 'USD' ? 'USD ($)' : curr === 'ARS' ? 'ARS ($)' : 'CRC (₡)'}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Pestañas */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1 rounded-full shadow-md inline-flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2 rounded-full font-serif transition-all duration-300 ${
                                    activeTab === tab.id
                                    ? 'bg-[#5c4033] text-white shadow-lg'
                                    : 'text-[#5c4033] hover:bg-stone-100'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bajada contextual para "Otros Servicios" */}
                {isOtherTab && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-stone-500 font-sans text-sm max-w-xl mx-auto -mt-6 mb-10"
                    >
                        ¿Ya tenés una web o necesitás algo específico? Estos servicios están pensados para negocios en etapas más avanzadas. Los precios son orientativos — cada caso se cotiza a medida.
                    </motion.p>
                )}

                {/* Grid de Tarjetas */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
                >
                    {activeServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            custom={index}
                            className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 ${
                                service.isPopular
                                ? 'border-amber-500 shadow-lg ring-1 ring-amber-500/20'
                                : 'border-stone-200'
                            }`}
                        >
                            {service.isPopular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Más Popular
                                </span>
                            )}

                            <div className="text-center mb-6">
                                {/* Ícono: imagen si existe, iniciales si no */}
                                {service.icon ? (
                                    <div className="w-[200px] h-[200px] flex items-center justify-center mx-auto mb-4 overflow-hidden">
                                        <img src={service.icon} alt={service.title} className="w-full h-full object-contain" />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-serif font-bold text-[#5c4033]">
                                            {service.title.charAt(0)}
                                        </span>
                                    </div>
                                )}

                                <h3 className="text-2xl font-serif font-bold text-[#5c4033]">{service.title}</h3>

                                {/* Subtítulo para "Otros Servicios" */}
                                {service.subtitle && (
                                    <p className="text-xs text-stone-400 uppercase tracking-wider mt-1 font-sans">{service.subtitle}</p>
                                )}

                                {/* Bloque de precio */}
                                <div className="mt-3 font-sans flex flex-col items-center justify-center min-h-14">
                                    {service.priceRange ? (
                                        // Precio en rango (Otros Servicios)
                                        <div className="flex flex-col items-center">
                                            <span className="text-2xl font-bold text-[#5c4033]">
                                                {formatPriceRange(service.priceRange[0], service.priceRange[1])}
                                            </span>
                                            <span className="text-xs text-stone-400 mt-1">{currency} · precio orientativo</span>
                                        </div>
                                    ) : service.price > 0 ? (
                                        // Precio fijo
                                        <>
                                            <div className="flex items-baseline gap-1 flex-wrap justify-center">
                                                {service.pricePrefix && (
                                                    <span className="text-sm text-stone-400">{service.pricePrefix}</span>
                                                )}
                                                <span className="text-3xl font-bold text-[#5c4033]">
                                                    {formatPrice(service.price)}
                                                </span>
                                                <span className="text-sm text-stone-500">
                                                    {currency} {isMaintenanceTab ? '/ mes' : ''}
                                                </span>
                                            </div>
                                            {!isMaintenanceTab && !isOtherTab && (
                                                <span className="text-xs text-stone-400 mt-1 block">pago único</span>
                                            )}
                                        </>
                                    ) : (
                                        <span className="text-2xl font-bold text-[#5c4033] mt-2 block">A medida</span>
                                    )}
                                </div>
                            </div>

                            <p className="text-stone-600 text-center text-sm mb-6 leading-relaxed">{service.desc}</p>

                            {/* Highlight badge para servicios especiales */}
                            {service.highlight && (
                                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-center mb-4 font-sans">
                                    {service.highlight}
                                </p>
                            )}

                            <ul className="space-y-3 mb-8 grow">
                                {service.content.map((item, i) => (
                                    <li key={i} className="flex items-start text-sm text-stone-700">
                                        <svg className="w-5 h-5 text-amber-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto pt-6 border-t border-stone-100 text-center">
                                {service.time && (
                                    <p className="text-xs text-stone-400 mb-4 font-semibold uppercase tracking-wide">
                                        Tiempo estimado: {service.time}
                                    </p>
                                )}
                                <a
                                    href="#contacto"
                                    className={`block w-full py-3 rounded-lg font-medium transition-colors ${
                                        service.isPopular
                                        ? 'bg-[#5c4033] text-white hover:bg-[#4a332a]'
                                        : 'bg-stone-100 text-[#5c4033] hover:bg-stone-200'
                                    }`}
                                >
                                    {service.cta || 'Consultar ahora'}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Nota al pie para Otros Servicios */}
                {isOtherTab && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-stone-400 font-sans text-xs mt-8"
                    >
                        Los precios son orientativos en USD. Se ajustan según el alcance real del proyecto tras una consulta inicial sin costo.
                    </motion.p>
                )}
            </div>
        </section>
    );
};

export default Services;