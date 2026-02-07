import React from 'react';

const UtilitiesNavbar = () => {
    return (
        <nav className="w-full bg-[#1a1510]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo / Título de la Sección */}
                <a href="/utilidades" className="flex items-center gap-2 group">
                    <span className="text-2xl font-serif font-bold text-[#EFEFEF] group-hover:text-amber-500 transition-colors">
                        &lt; Utilidades /&gt;
                    </span>
                </a>

                {/* Enlaces */}
                <div className="flex items-center gap-6 text-sm font-medium font-sans">
                    <a
                        href="/"
                        className="text-stone-400 hover:text-[#EFEFEF] transition-colors"
                    >
                        Volver al Inicio
                    </a>

                    <a
                        href="mailto:elartesanoweb73@gmail.com"
                        className="hidden sm:block px-4 py-2 border border-amber-500/30 text-amber-500 rounded hover:bg-amber-500 hover:text-[#1a1510] transition-all duration-300"
                    >
                        Sugerir Herramienta
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default UtilitiesNavbar;