// Images imports in components will handle images, here we just need text.
// But wait, if I move data to here, the images are imported in the component files.
// Passing image paths around might be tricky if they are Vite processed.
// In Astro, it's better if `projects` data stays in the component if images are imported there, OR I pass the text strings from here and the images stay in the component.
// But the project titles/descriptions need translation.
// So I will keep the structure in the component but pass the localized text.
// Strategy: I will provide a dictionary of text strings mapped by ID or similar, OR I will just provide the full array here and require the component to map it.
// Issue: Images. If I define the array here, I can't easily import the images here without polluting this file or making it an Astro file (it is .js).
// Solution: I will separating the "static text" (titles, labels) from the "content items" (projects list).
// Actually, I can pass the translated title/description for each project by ID in `data.js`, and merge it in the component.
// OR, simpler: The component has the images. The component can try to match the translation by ID or index.
// Let's use Index or ID matching.
// I'll put the full content arrays here for text. For images, I'll deal with them in the component.
// Actually, `Services.jsx` has icons as paths (strings), so that's easy.
// `Projects.astro` has imported images. I will let the component import images and merge with data from here.
// I'll provide `projects` array with `id`, `title`, `description` here. The component will use this to override its internal data text or just use this data and look up the image.

export const languages = {
    es: {
        nav: {
            navLinks: [
                { name: 'Inicio', href: '#home' },
                { name: 'Mi Taller', href: '#taller' },
                { name: 'Proyectos', href: '#proyectos' },
                { name: 'Servicios', href: '#servicios' },
            ],
            cta: 'Iniciar Proyecto'
        },
        hero: {
            title: "Construyo Mecanismos Digitales que Perduran en el Tiempo.",
            subtitle: "Diseño y Desarrollo Web de Precisión para marcas que valoran la calidad y el detalle.",
            cta: "Ver Últimas Creaciones",
            secondary: "o descubre mis",
            secondaryLink: "Servicios y Soluciones"
        },
        about: {
            title: "Artesanía en un Mundo Digital.",
            intro: '<span>Soy <strong class="font-bold">Alfredo Sobarzo Longarini</strong>, fundador y desarrollador detrás de <strong class="font-bold">El Artesano Web</strong>.</span>',
            p1: '<span>En un mundo de soluciones rápidas y efímeras, mi taller se rige por la <span class="font-semibold text-[#5c4033]">pausa, la precisión y el compromiso</span> con lo bien hecho.</span>',
            p2: "Trato cada sitio web como una pieza de relojería: un mecanismo diseñado a medida, donde cada engranaje, visible e invisible, tiene un propósito y está construido para durar."
        },
        projects: {
            title: "Proyectos Selectos",
            subtitle: "Desde mecanismos terminados hasta prototipos en mi banco de trabajo.",
            status: {
                inProgress: "En Construcción",
                comingSoon: "Próximamente",
                view: "Ver Proyecto"
            },
            items: [
                {
                    id: 1,
                    title: "Con Esencia a Mau",
                    description: "Aplicación web full-stack para la gestión de pedidos de una pastelería.",
                    tags: ["Astro", "React", "Tailwind", "Node.js", "Nanostores", "Resend API"]
                },
                {
                    id: 2,
                    title: "CAPEAC Web",
                    description: "Desarrollo integral de una aplicación web para la Cámara Patagónica de Empresas de Autotransporte de Cargas. El sistema combina un portal institucional de alto rendimiento con una plataforma de gestión interna.",
                    tags: ["Astro", "React", "Tailwind", "Supabase", "Puppeteer", "JSZip", "Resend API"]
                }
            ]
        },
        services: {
            title: "Servicios a Medida",
            subtitle: "Soluciones diseñadas para adaptarse a la etapa actual de tu negocio.",
            currencyLabel: "Moneda:",
            tabs: {
                development: "Desarrollo Web",
                maintenance: "Mantenimiento"
            },
            cta: "Consultar ahora",
            labels: {
                popular: "Más Popular",
                time: "Tiempo estimado:",
                oneTime: "pago único",
                perMonth: "/ mes",
                customPrice: "A medida"
            },
            items: [
                {
                    id: 1,
                    title: "Engranaje Esencial",
                    desc: "Ideal para profesionales independientes o pequeños comercios. Una tarjeta de presentación digital impecable y veloz.",
                    content: [
                        "Sitio Web One Page o hasta 3 páginas.",
                        "Diseño 100% responsive (Móvil/PC)",
                        "Formulario de Contacto funcional.",
                        "SEO Básico.",
                        "Conexión con Redes Sociales."
                    ],
                    time: "2-3 semanas"
                },
                {
                    id: 2,
                    title: "Mecanismo Completo",
                    desc: "Restaurantes, cafeterías, startups, o negocios que necesitan mostrar más información y tener funcionalidades específicas.",
                    content: [
                        "Todo lo del Paquete Engranaje.",
                        "Sitio Web de hasta 6 páginas.",
                        "Una funcionalidad clave (Blog, Galería, Reservas).",
                        "SEO Intermedio.",
                        "Integración con Google Maps."
                    ],
                    time: "4-6 semanas"
                },
                {
                    id: 3,
                    title: "Cronógrafo a Medida",
                    desc: "Para empresas de servicios, turismo o negocios que requieren catálogo, reservas o arquitecturas complejas.",
                    content: [
                        "Todo lo del Paquete Mecanismo",
                        "Arquitectura web ampliada (+10 páginas)",
                        "Funcionalidad a medida",
                        "Diseño Premium y micro-interacciones",
                        "Formularios inteligentes",
                        "SEO Técnico Avanzado",
                        "Capacitación personalizada"
                    ],
                    time: "Variable según requisitos"
                }
            ],
            maintenanceItems: [
                {
                    id: 4,
                    title: "Puesta a Punto Esencial",
                    desc: "Clientes que no planean hacer cambios en su web pero quieren la seguridad de que todo funciona y está protegido.",
                    content: [
                        "Actualizaciones mensuales.",
                        "Copias de seguridad semanales.",
                        "Escaneos de seguridad.",
                        "Monitorización de uptime.",
                        "Reporte mensual simple."
                    ]
                },
                {
                    id: 5,
                    title: "Soporte prioritario",
                    desc: "Clientes que, además de seguridad, necesitan hacer pequeñas actualizaciones de contenido.",
                    content: [
                        "Todo lo del plan Esencial.",
                        "1 o 2 horas de soporte mensual.",
                        "Soporte prioritario por email o WhatsApp."
                    ]
                }
            ]
        },
        contact: {
            title: "Empecemos a <br /> <span class='text-amber-500'>Construir.</span>",
            description: "¿Listo para darle vida a ese mecanismo digital? Cuéntame sobre tu proyecto y analicemos cómo puedo ayudarte a lograrlo.",
            info: {
                location: "Argentina (Remoto Mundial)"
            },
            form: {
                name: "Nombre",
                namePlaceholder: "Tu nombre o empresa",
                email: "Correo Electrónico",
                emailPlaceholder: "ejemplo@correo.com",
                subject: "¿En qué estás interesado?",
                message: "Mensaje",
                messagePlaceholder: "Cuéntame un poco sobre tu proyecto...",
                submit: "Enviar Mensaje",
                sending: "Enviando...",
                success: "¡Mensaje recibido!",
                reference: "Tu referencia es:",
                error: "Hubo un error. Por favor intenta de nuevo o escríbeme directo al correo."
            },
            subjects: {
                web1: "Engranaje Esencial",
                web2: "Mecanismo Completo",
                web3: "Cronógrafo a Medida",
                mant1: "Puesta a Punto Esencial",
                mant2: "Soporte prioritario"
            }
        },
        footer: {
            brand: "< Alfredo S. Longarini />",
            tagline: "Diseñando mecanismos digitales que combinan la precisión del código con la calidez del diseño artesanal.",
            explore: "Explorar",
            connect: "Conectar",
            questions: "¿Dudas?",
            copyright: "El Artesano Web. Todos los derechos reservados.",
            madeWith: "Diseñado y ensamblado a mano con"
        }
    },
    en: {
        nav: {
            navLinks: [
                { name: 'Home', href: '#home' },
                { name: 'My Workshop', href: '#taller' },
                { name: 'Projects', href: '#proyectos' },
                { name: 'Services', href: '#servicios' },
            ],
            cta: 'Start Project'
        },
        hero: {
            title: "Building Digital Mechanisms That Stand the Test of Time.",
            subtitle: "Precision Web Design and Development for brands that value quality and detail.",
            cta: "View Latest Creations",
            secondary: "or discover my",
            secondaryLink: "Services & Solutions"
        },
        about: {
            title: "Craftsmanship in a Digital World.",
            intro: '<span>I am <strong class="font-bold">Alfredo Sobarzo Longarini</strong>, founder and developer behind <strong class="font-bold">El Artesano Web</strong>.</span>',
            p1: '<span>In a world of quick and ephemeral solutions, my workshop is governed by <span class="font-semibold text-[#5c4033]">pause, precision, and commitment</span> to what is well done.</span>',
            p2: "I treat every website like a timepiece: a custom-designed mechanism, where every gear, visible and invisible, has a purpose and is built to last."
        },
        projects: {
            title: "Selected Projects",
            subtitle: "From finished mechanisms to prototypes on my workbench.",
            status: {
                inProgress: "Under Construction",
                comingSoon: "Coming Soon",
                view: "View Project"
            },
            items: [
                {
                    id: 1,
                    title: "Con Esencia a Mau",
                    description: "Full-stack web application for bakery order management.",
                    tags: ["Astro", "React", "Tailwind", "Node.js", "Nanostores", "Resend API"]
                },
                {
                    id: 2,
                    title: "CAPEAC Web",
                    description: "Comprehensive web application for the Patagonian Chamber of Cargo Transport Companies. The system combines a high-performance institutional portal with an internal management platform.",
                    tags: ["Astro", "React", "Tailwind", "Supabase", "Puppeteer", "JSZip", "Resend API"]
                }
            ]
        },
        services: {
            title: "Tailored Services",
            subtitle: "Solutions designed to adapt to your business's current stage.",
            currencyLabel: "Currency:",
            tabs: {
                development: "Web Development",
                maintenance: "Maintenance"
            },
            cta: "Inquire Now",
            labels: {
                popular: "Most Popular",
                time: "Est. Time:",
                oneTime: "one-time",
                perMonth: "/ month",
                customPrice: "Custom"
            },
            items: [
                {
                    id: 1,
                    title: "Essential Gear",
                    desc: "Ideal for independent professionals or small businesses. A flawless and fast digital business card.",
                    content: [
                        "One Page Website or up to 3 pages.",
                        "100% responsive design (Mobile/PC)",
                        "Functional Contact Form.",
                        "Basic SEO.",
                        "Social Media Connection."
                    ],
                    time: "2-3 weeks"
                },
                {
                    id: 2,
                    title: "Complete Mechanism",
                    desc: "Restaurants, cafes, startups, or businesses that need to show more information and have specific functionalities.",
                    content: [
                        "Everything in Essential Gear package.",
                        "Website up to 6 pages.",
                        "One key feature (Blog, Gallery, Booking).",
                        "Intermediate SEO.",
                        "Google Maps Integration."
                    ],
                    time: "4-6 weeks"
                },
                {
                    id: 3,
                    title: "Custom Chronograph",
                    desc: "For service companies, tourism, or businesses requiring product catalogs, bookings, or complex architectures.",
                    content: [
                        "Everything in Mechanism package",
                        "Expanded web architecture (+10 pages)",
                        "Custom functionality",
                        "Premium Design & micro-interactions",
                        "Smart forms",
                        "Advanced Technical SEO",
                        "Personalized training"
                    ],
                    time: "Variable"
                }
            ],
            maintenanceItems: [
                {
                    id: 4,
                    title: "Essential Tune-up",
                    desc: "Clients who don't plan to change their web content but want security and protection.",
                    content: [
                        "Monthly system updates.",
                        "Weekly backups.",
                        "Security scans.",
                        "Uptime monitoring.",
                        "Simple monthly report."
                    ]
                },
                {
                    id: 5,
                    title: "Priority Support",
                    desc: "Clients who need security plus small content updates occasionally.",
                    content: [
                        "Everything in Essential plan.",
                        "1 or 2 hours of monthly support.",
                        "Priority support via email or WhatsApp."
                    ]
                }
            ]
        },
        contact: {
            title: "Let's Start <br /> <span class='text-amber-500'>Building.</span>",
            description: "Ready to check that digital mechanism? Tell me about your project and let's analyze how I can help you achieve it.",
            info: {
                location: "Argentina (Remote Worldwide)"
            },
            form: {
                name: "Name",
                namePlaceholder: "Your name or company",
                email: "Email",
                emailPlaceholder: "example@mail.com",
                subject: "What are you interested in?",
                message: "Message",
                messagePlaceholder: "Tell me a bit about your project...",
                submit: "Send Message",
                sending: "Sending...",
                success: "Message received!",
                reference: "Your reference is:",
                error: "There was an error. Please try again or email me directly."
            },
            subjects: {
                web1: "Essential Gear",
                web2: "Complete Mechanism",
                web3: "Custom Chronograph",
                mant1: "Essential Tune-up",
                mant2: "Priority Support"
            }
        },
        footer: {
            brand: "< Alfredo S. Longarini />",
            tagline: "Designing digital mechanisms that combine code precision with artisanal design warmth.",
            explore: "Explore",
            connect: "Connect",
            questions: "Questions?",
            copyright: "El Artesano Web. All rights reserved.",
            madeWith: "Designed and hand-assembled with"
        }
    }
};
