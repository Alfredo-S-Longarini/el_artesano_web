import React from 'react';

const About = () => {
    return (
        <section id="taller" className="py-20 md:py-24 overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* --- Columna de Imágenes (Efecto Collage) --- */}
                <div
                    className="relative w-full max-w-[450px] mx-auto h-[350px] md:h-[450px] my-10"
                    data-aos="fade-right"
                >
                    {/* Imagen 1 (Fondo - Inclinada a la izquierda) */}
                    {/* Usamos 'absolute' para sacarla del flujo y colocarla detrás */}
                    <img
                        src="/img/bocetos-taller.webp"
                        alt="Bocetos de diseño web"
                        className="absolute top-0 left-0 md:left-8 w-3/4 rounded-lg shadow-xl transform -rotate-12 z-0 transition-transform hover:scale-105 duration-500"
                    />

                    {/* Imagen 2 (Frente - Inclinada a la derecha) */}
                    {/* Usamos 'absolute' y posicionamiento bottom/right para crear el solapamiento */}
                    <img
                        src="/img/bocetos-taller1.webp"
                        alt="Detalle de bocetos"
                        className="absolute bottom-8 right-0 md:right-8 w-3/4 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)] transform rotate-6 z-10 transition-transform hover:scale-105 duration-500"
                    />
                </div>

                {/* --- Columna de Texto --- */}
                <div
                    className="text-center md:text-left space-y-6"
                    data-aos="fade-left"
                    data-aos-delay="200"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-semibold text-[#5c4033] leading-tight">
                        Artesanía en un Mundo Digital.
                    </h2>

                    <p className="font-serif text-base md:text-lg text-gray-700 leading-relaxed">
                        En un mundo de soluciones rápidas y efímeras, mi taller se rige por la
                        <span className="font-semibold text-[#5c4033]"> pausa, la precisión y el compromiso </span>
                        con lo bien hecho.
                    </p>
                    <p className="font-serif text-base md:text-lg text-gray-700 leading-relaxed">
                        Trato cada sitio web como una pieza de relojería: un mecanismo diseñado a medida,
                        donde cada engranaje, visible e invisible, tiene un propósito y está
                        construido para durar.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default About;