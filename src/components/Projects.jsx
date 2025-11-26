import React from 'react';

const projects = [
    {
        id: 1,
        title: "Con Esencia a Mau",
        status: "completed",
        description: "Aplicación web full-stack para la gestión de pedidos de una pastelería.",
        tags: ["Astro", "React", "Tailwind", "Node.js", "Nnostores", "Resend API"],
        image: "/proyectos/pw-1.webp", // Asegúrate de tener estas imágenes o cambiar la ruta
        demoLink: "https://www.conesenciaamau.com/",
        repoLink: "#"
    },
    {
        id: 2,
        title: "CAPEAC Web",
        status: "in-progress",
        description: "Desarrollo integral de una aplicación web para la Cámara Patagónica de Empresas de Autotransporte de Cargas. El sistema combina un portal institucional de alto rendimiento con una plataforma de gestión interna.",
        tags: ["Astro", "React", "Tailwind", "Supabase", "Puppeteer", "JSZip", "Resend API"],
        image: "/proyectos/pw-2.webp",
        demoLink: "#",
        repoLink: "#"
    },
];

const Projects = () => {
    return (
        <section id="proyectos" className="py-24 bg-[#1a1510] text-[#EFEFEF]">
            <div className="container mx-auto px-6">

                {/* Encabezado */}
                <div className="mb-16 text-center" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-[#EFEFEF]">
                        Proyectos Selectos
                    </h2>
                    <p className="text-stone-400 font-sans max-w-2xl mx-auto">
                        Desde mecanismos terminados hasta prototipos en mi banco de trabajo.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <article
                            key={project.id}
                            className={`group relative rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 ${project.status === 'in-progress'
                                    ? 'bg-[#231e19]/50 border-amber-500/30 border-dashed' // Estilo WIP: Borde discontinuo y fondo más sutil
                                    : 'bg-[#231e19] border-white/5 hover:border-amber-500/30 hover:shadow-2xl' // Estilo Normal
                                }`}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >

                            {/* Badge de Estado (Solo si está en desarrollo) */}
                            {project.status === 'in-progress' && (
                                <div className="absolute top-4 right-4 z-20 bg-amber-500/90 backdrop-blur-sm text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                    <span className="animate-pulse">🔨</span> En Construcción
                                </div>
                            )}

                            {/* Imagen */}
                            <div className="relative overflow-hidden h-56">
                                {/* Overlay oscuro extra si está en desarrollo */}
                                {project.status === 'in-progress' && <div className="absolute inset-0 bg-black/40 z-10" />}

                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${project.status === 'in-progress' ? 'grayscale-50' : 'group-hover:scale-110'
                                        }`}
                                />
                            </div>

                            {/* Contenido */}
                            <div className="p-8">
                                <h3 className="text-2xl font-serif font-semibold mb-3 group-hover:text-amber-500 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-stone-400 font-sans text-sm leading-relaxed mb-6">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium px-3 py-1 bg-white/5 text-stone-300 rounded-full border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Botones de Acción */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">

                                    {/* Botón Ver Proyecto / En Proceso */}
                                    {project.status === 'completed' ? (
                                        <a
                                            href={project.demoLink}
                                            className="flex items-center gap-2 text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
                                            target="_blank" rel="noreferrer"
                                        >
                                            Ver Proyecto
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                        </a>
                                    ) : (
                                        <span className="flex items-center gap-2 text-sm font-medium text-stone-500">
                                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                            Próximamente
                                        </span>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;