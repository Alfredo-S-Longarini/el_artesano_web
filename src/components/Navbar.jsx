import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Detectar el scroll para cambiar el estilo del navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#home' },
        { name: 'Mi Taller', href: '#taller' },
        { name: 'Proyectos', href: '#proyectos' },
        { name: 'Servicios', href: '#servicios' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled
                ? 'bg-[#1a1510]/90 backdrop-blur-md py-4 border-white/5 shadow-lg'
                : 'bg-transparent py-6 border-transparent'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">

                {/* LOGO */}
                <a href="#home" className="text-2xl font-sans font-regular text-[#EFEFEF] tracking-wide flex items-center gap-2 group">
                    <span
                        className={`text-amber-500 transition-transform duration-700 ease-in-out inline-block ${isScrolled ? 'rotate-180' : 'rotate-0'
                            } group-hover:rotate-90`}
                    >
                        ⚙️
                    </span>
                    <span>El Artesano Web</span>
                </a>

                {/* MENÚ ESCRITORIO */}
                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-8">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="text-stone-300 font-sans text-[18px] font-medium hover:text-amber-500 transition-colors tracking-wide"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Botón CTA Destacado */}
                    <a
                        href="#contacto"
                        className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded transition-all duration-300 shadow-[0_0_15px_rgba(217,119,6,0.3)] hover:shadow-[0_0_20px_rgba(217,119,6,0.5)] transform hover:-translate-y-0.5"
                    >
                        Iniciar Proyecto
                    </a>
                </div>

                {/* BOTÓN HAMBURGUESA (MÓVIL) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-[#EFEFEF] focus:outline-none p-2"
                    aria-label="Toggle menu"
                >
                    <div className="w-6 flex flex-col items-end gap-1.5 group">
                        <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
                        <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`} />
                        <span className={`h-0.5 bg-current transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
                    </div>
                </button>
            </div>

            {/* MENÚ MÓVIL (DESPLEGABLE) */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-[#140f0c] border-b border-white/5 shadow-2xl overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="flex flex-col p-6 space-y-4 items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[#EFEFEF] font-serif text-lg hover:text-amber-500 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#contacto"
                        className="mt-4 px-8 py-3 bg-amber-600 text-white rounded w-full text-center font-medium"
                        onClick={() => setIsOpen(false)}
                    >
                        Iniciar Proyecto
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;