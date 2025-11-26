import React, { useState } from 'react';

const Services = () => {
    const [activeTab, setActiveTab] = useState('development');

    const services = [
        {
            id: 1,
            icon: "/img/engranaje.webp",
            price: 300,
            originalPrice: null,
            isPopular: false,
            title: "Engranaje Esencial",
            desc: "Ideal para profesionales independientes o pequeños comercios. Una tarjeta de presentación digital impecable y veloz.",
            content: [
                "Sitio Web One Page o hasta 3 páginas: (Ej: Inicio, Sobre Mí/Nosotros, Contacto).",
                "Diseño 100% responsive (Móvil/PC)",
                "Formulario de Contacto funcional.",
                "SEO Básico: Configuración inicial de títulos, descripciones, y conexión con Google Search Console para que empieces a ser visible.",
                "Conexión con Redes Sociales.",
            ],
            time: "2-3 semanas",
            featured: false,
        },
        {
            id: 2,
            icon: "/img/mecanismo_completo.webp",
            price: 510,
            originalPrice: 600,
            isPopular: true,
            title: "Mecanismo Completo",
            desc: "Restaurantes, cafeterías, startups, o negocios que necesitan mostrar más información y tener funcionalidades específicas.Estructura y configuración técnica para que tu web sea visible y relevante para quienes te buscan en Google.",
            content: [
                "Todo lo del Paquete Engranaje.",
                "Sitio Web de hasta 6 páginas: (Ej: Inicio, Servicios, Portfolio/Galería, Blog, Nosotros, Contacto).",
                "Una funcionalidad clave: A elección entre un Blog para contenido, una Galería/Portfolio avanzada para mostrar trabajos, o la integración de un sistema de reservas/turnos simple.",
                "SEO Intermedio: Investigación básica de palabras clave para tu sector, optimización de imágenes y estructura de URLs.",
                "Integración con Google Maps.",
            ],
            time: "4-6 semanas",
            featured: true,
        },
        {
            id: 3,
            icon: "/img/cronografo_a_medida.webp",
            price: 1500,
            originalPrice: 1800,
            isPopular: false,
            title: "Cronógrafo a Medida",
            desc: "Para empresas de servicios, turismo o negocios que requieren catálogo de productos (vidriera), reservas o arquitecturas complejas.",
            content: [
                "Todo lo del Paquete Mecanismo",
                "Arquitectura web ampliada (+10 páginas)",
                "Funcionalidad a medida: Catálogo Vidriera, Reservas o Multi-idioma",
                "Diseño Premium y micro-interacciones",
                "Formularios inteligentes con lógica condicional",
                "SEO Técnico Avanzado y optimización de velocidad",
                "Capacitación personalizada de gestión"
            ],
            time: "Variable según requisitos",
            featured: false
        },
    ];

    const maintenanceServices = [
        {
            id: 4,
            icon: "/img/sm-1.webp",
            price: 25,
            title: "Puesta a Punto Esencial",
            desc: "Clientes que no planean hacer cambios en su web pero quieren la seguridad de que todo funciona y está protegido.",
            content: [
                "Actualizaciones mensuales del sistema, plugins y temas.",
                "Copias de seguridad semanales (backups).",
                "Escaneos de seguridad para prevenir malware.",
                "Monitorización de uptime (verificar que la web no se caiga).",
                "Un reporte mensual simple con las acciones realizadas.",
            ],
        },
        {
            id: 5,
            icon: "/img/sm-2.webp",
            price: 50,
            title: "Soporte prioritario",
            desc: "Clientes que, además de seguridad, necesitan hacer pequeñas actualizaciones de contenido de vez en cuando (cambiar un texto, una foto, subir una nueva entrada al blog, etc.).",
            content: [
                "Todo lo del plan Esencial.",
                "1 o 2 horas de soporte mensual para cambios y actualizaciones de contenido menores (no acumulables).",
                "Soporte prioritario por email o WhatsApp.",
            ],
        },
    ];

    const handleConsult = (serviceTitle) => {
        // 1. Codificamos el título para que sea válido en una URL (quita espacios, tildes, etc)
        const encodedSubject = encodeURIComponent(serviceTitle);

        // 2. Redirigimos a la sección de contacto pasando el parámetro
        window.location.href = `#contacto?subject=${encodedSubject}`;
    };

    const getDiscountPercent = (original, current) => {
        if (!original || !current) return 0;
        return Math.round(((original - current) / original) * 100);
    };

    return (
        <section id="servicios" className="py-24 bg-[#F9F7F2] text-[#5c4033]">
            <div className="container mx-auto px-6">

                {/* Encabezado */}
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                        Servicios a Medida
                    </h2>
                    <p className="text-lg font-sans text-stone-600 max-w-2xl mx-auto">
                        Soluciones diseñadas para adaptarse a la etapa actual de tu negocio.
                    </p>
                </div>

                {/* Pestañas de Navegación */}
                <div className="flex justify-center mb-12" data-aos="fade-up">
                    <div className="bg-white p-1 rounded-full shadow-md inline-flex">
                        <button
                            onClick={() => setActiveTab('development')}
                            className={`px-6 py-2 rounded-full font-serif transition-all duration-300 ${activeTab === 'development'
                                ? 'bg-[#5c4033] text-white shadow-lg'
                                : 'text-[#5c4033] hover:bg-stone-100'
                                }`}
                        >
                            Desarrollo Web
                        </button>
                        <button
                            onClick={() => setActiveTab('maintenance')}
                            className={`px-6 py-2 rounded-full font-serif transition-all duration-300 ${activeTab === 'maintenance'
                                ? 'bg-[#5c4033] text-white shadow-lg'
                                : 'text-[#5c4033] hover:bg-stone-100'
                                }`}
                        >
                            Mantenimiento
                        </button>
                    </div>
                </div>

                {/* Grid de Tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {(activeTab === 'development' ? services : maintenanceServices).map((service, index) => (
                        <div
                            key={service.id}
                            className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 ${service.isPopular ? 'border-amber-500 shadow-lg ring-1 ring-amber-500/20' : 'border-stone-200'
                                }`}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Etiqueta Popular */}
                            {service.isPopular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Más Popular
                                </span>
                            )}

                            {/* Icono y Título */}
                            <div className="text-center mb-6">
                                <div className="w-[200px] h-[200px] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                    {service.icon && <img src={service.icon} alt="" />}
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-[#5c4033]">{service.title}</h3>

                                {/* Precio */}
                                <div className="mt-3 font-sans flex flex-col items-center justify-center min-h-14">
                                    {service.price > 0 ? (
                                        <>
                                            {/* Si hay precio original (oferta), mostramos la comparativa */}
                                            {service.originalPrice && (
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-stone-400 line-through text-sm font-medium">
                                                        ${service.originalPrice}
                                                    </span>
                                                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                                        Ahorras {getDiscountPercent(service.originalPrice, service.price)}%
                                                    </span>
                                                </div>
                                            )}

                                            {/* Precio Actual */}
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-bold text-[#5c4033]">
                                                    ${service.price}
                                                </span>
                                                <span className="text-sm text-stone-500">
                                                    {activeTab === 'maintenance' ? '/ mes' : '/ pago único'}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        // Caso: Precio a medida (0)
                                        <span className="text-2xl font-bold text-[#5c4033] mt-2 block">
                                            A medida
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Descripción */}
                            <p className="text-stone-600 text-center text-sm mb-6 leading-relaxed">
                                {service.desc}
                            </p>

                            {/* Lista de características */}
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

                            {/* Footer de la tarjeta: Tiempo y Botón */}
                            <div className="mt-auto pt-6 border-t border-stone-100 text-center">
                                {service.time && (
                                    <p className="text-xs text-stone-400 mb-4 font-semibold uppercase tracking-wide">
                                        Tiempo estimado: {service.time}
                                    </p>
                                )}
                                <a
                                    href="#contacto"
                                    className={`block w-full py-3 rounded-lg font-medium transition-colors ${service.isPopular
                                        ? 'bg-[#5c4033] text-white hover:bg-[#4a332a]'
                                        : 'bg-stone-100 text-[#5c4033] hover:bg-stone-200'
                                        }`}
                                >
                                    Consultar ahora
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;