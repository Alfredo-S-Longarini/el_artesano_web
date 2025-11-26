import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const links = [
        { name: 'Inicio', href: '#home' },
        { name: 'Mi Taller', href: '#taller' },
        { name: 'Proyectos', href: '#proyectos' },
        { name: 'Servicios', href: '#servicios' },
        { name: 'Contacto', href: '#contacto' },
    ];

    return (
        <footer className="bg-[#140f0c] text-[#EFEFEF] border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-6">

                {/* Contenido Principal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Columna 1: Marca y Filosofía */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-[#EFEFEF]">
                            &lt; Alfredo S. Longarini /&gt;
                        </h3>
                        <p className="text-stone-400 font-sans text-sm leading-relaxed max-w-xs">
                            Diseñando mecanismos digitales que combinan la precisión del código con la calidez del diseño artesanal.
                        </p>
                    </div>

                    {/* Columna 2: Navegación */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold text-amber-500 mb-4">Explorar</h4>
                        <ul className="space-y-2">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-stone-400 hover:text-[#EFEFEF] hover:translate-x-1 transition-all duration-300 inline-block text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 3: Social y Contacto */}
                    <div>
                        <h4 className="text-lg font-serif font-semibold text-amber-500 mb-4">Conectar</h4>
                        <div className="flex space-x-4 mb-6">
                            {/* GitHub */}
                            <a href="https://github.com/Alfredo-S-Longarini" target="_blank" aria-label="GitHub" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-stone-400 hover:bg-amber-500 hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/in/alfredo-s-longarini/" target="_blank" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-stone-400 hover:bg-amber-500 hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                            </a>
                            {/* Instagram */}
                            <a href="https://www.instagram.com/alfred_s_longa/" target="_blank" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-stone-400 hover:bg-amber-500 hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                        </div>
                        <p className="text-stone-500 text-sm">
                            ¿Dudas? <a href="mailto:hola@tudominio.com" className="text-amber-500 hover:underline">elartesanoweb73@gmail.com</a>
                        </p>
                    </div>

                </div>

                {/* Barra Inferior */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600 font-sans">
                    <p>
                        &copy; {currentYear} El Artesano Web. Todos los derechos reservados.
                    </p>
                    <div className="mt-4 md:mt-0 flex items-center space-x-2">
                        <span>Diseñado y ensamblado a mano con</span>
                        <span className="text-amber-500 font-semibold" title="Astro + React">Astro + React</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;