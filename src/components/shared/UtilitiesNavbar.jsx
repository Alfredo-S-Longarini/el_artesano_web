import React from 'react';

const UtilitiesNavbar = () => {
    return (
        <nav className="w-full bg-[#1a1510]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 overflow-hidden">
            {/* Línea de acento superior (Estilo forja) */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/50 to-transparent"></div>

            <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo / Título con Branding de Artesano */}
                <a href="/utilidades" className="group flex flex-col">
                    <div className="flex items-center gap-2">
                         <span className="text-xl font-sans font-black tracking-tighter text-[#EFEFEF] group-hover:text-amber-500 transition-colors duration-300">
                            UTILIDADES
                        </span>
                        <span className="text-amber-500 font-serif italic text-lg opacity-80 group-hover:translate-x-1 transition-transform">
                            /&gt;
                        </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold -mt-1 group-hover:text-stone-400 transition-colors">
                        El Artesano Web
                    </span>
                </a>

                {/* Acciones de Navegación */}
                <div className="flex items-center gap-8">
                    <a
                        href="/"
                        className="relative text-sm font-medium text-stone-400 hover:text-[#EFEFEF] transition-colors group py-2"
                    >
                        Volver al Inicio
                        {/* Subrayado animado */}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>

                    <a
                        href="mailto:elartesanoweb73@gmail.com"
                        className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-amber-500/5 hover:bg-amber-500 text-amber-500 hover:text-[#1a1510] border border-amber-500/30 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" height="16" 
                            viewBox="0 0 24 24" fill="none" 
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                        Sugerir Herramienta
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default UtilitiesNavbar;