import React from 'react'

const Hero = () => {
    return (
        <section className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#2C241B]">

            {/* Imagen de Fondo (Madera oscura) */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/img/wood-bg.webp" // CAMBIAR POR LA RUTA REAL DE TU FONDO
                    alt="Fondo de madera"
                    className="w-full h-full object-cover opacity-60"
                />
                {/* Overlay oscuro para mejorar legibilidad */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Contenedor Principal */}
            <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-20">

                {/* Columna Izquierda: Texto */}
                <div className="text-left space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans text-[#EFEFEF] leading-tight">
                        Construyo Mecanismos Digitales <br className="hidden md:block" />
                        que Perduran en el Tiempo.
                    </h1>

                    <p className="text-lg text-stone-300 max-w-lg font-serif">
                        Diseño y Desarrollo Web de Precisión para marcas que valoran la calidad y el detalle.
                    </p>

                    <div className="flex flex-col items-start gap-3 pt-6">
                        {/* Botón Principal CTA */}
                        <a
                            href="#proyectos"
                            className="group relative px-8 py-3.5 bg-[#5D4037] text-[#EFEFEF] font-serif text-lg rounded shadow-[0_10px_20px_rgba(93,64,55,0.4)] hover:shadow-[0_15px_25px_rgba(93,64,55,0.6)] hover:bg-[#4E342E] transition-all duration-300 flex items-center gap-3 transform hover:-translate-y-1"
                        >
                            <span>Ver Últimas Creaciones</span>
                            {/* Icono de flecha animado */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>

                        {/* Texto Secundario */}
                        <p className="text-stone-400 text-sm font-sans ml-1 mt-1">
                            o descubre mis <a href="#servicios" className="text-amber-500 hover:text-amber-400 underline decoration-amber-500/30 underline-offset-4 transition-colors">Servicios y Soluciones</a>
                        </p>
                    </div>
                </div>

                {/* Columna Derecha: Imagen del Personaje */}
                <div className="flex justify-center md:justify-end mt-8 md:mt-0">
                    <img
                        src="/img/character.webp" // CAMBIAR POR LA RUTA REAL DE TU PERSONAJE
                        alt="Desarrollador artesano"
                        className="w-3/4 md:w-[65%] max-w-md object-contain drop-shadow-2xl"
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero