import React, { useState } from 'react';
import { EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from '../config/contact.js';
import { trackEvent } from '../lib/track.js';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '' // honeypot anti-spam, oculto para personas
    });

    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
    const [ticketId, setTicketId] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json(); // Leemos la respuesta de la API
                setStatus('success');
                setTicketId(data.id); // Guardamos el ID que nos devolvió el servidor
                trackEvent('Formulario enviado', { origen: 'home', interes: formData.subject || 'Sin especificar' });
                setFormData({ name: '', email: '', subject: '', message: '', website: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="contacto" className="py-24 bg-[#1a1510] relative overflow-hidden">
            {/* Elemento decorativo de fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Columna Izquierda: Información */}
                    <div data-aos="fade-right">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#EFEFEF] mb-6">
                            Empecemos a <br />
                            <span className="text-amber-500">Construir.</span>
                        </h2>
                        <p className="text-stone-400 font-sans text-lg mb-8 leading-relaxed">
                            ¿Listo para darle vida a ese mecanismo digital? Contame sobre tu proyecto y analicemos cómo puedo ayudarte a lograrlo.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 text-[#EFEFEF]">
                                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-amber-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                </div>
                                <a href={`mailto:${EMAIL}`} className="hover:text-amber-500 transition-colors">{EMAIL}</a>
                            </div>
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-4 text-[#EFEFEF] hover:text-amber-500 transition-colors"
                            >
                                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-amber-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.46 9.48-9.46a9.4 9.4 0 0 1 6.7 2.78 9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.05-17.52A11.32 11.32 0 0 0 12.04.65C5.77.65.67 5.75.67 12.01c0 2 .52 3.96 1.52 5.68L.57 23.65l6.1-1.6a11.36 11.36 0 0 0 5.37 1.37h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.89-3.33-8.04z"/></svg>
                                </div>
                                <span>{WHATSAPP_DISPLAY}</span>
                            </a>
                            <div className="flex items-center space-x-4 text-[#EFEFEF]">
                                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-amber-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                </div>
                                <span>Argentina (Remoto Mundial)</span>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario */}
                    <div className="bg-[#231e19] p-8 rounded-2xl border border-white/5 shadow-2xl" data-aos="fade-left">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Nombre */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-serif text-stone-300 mb-2">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 placeholder-[#bbbbbb] text-[#EFEFEF] focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="Tu nombre o empresa"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-serif text-stone-300 mb-2">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 placeholder-[#bbbbbb] text-[#EFEFEF] focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="ejemplo@correo.com"
                                />
                            </div>

                            {/* Asunto (Dropdown) */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-serif text-stone-300 mb-2">¿Qué te interesa?</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-[#1a1510] border border-white/10 rounded-lg px-4 py-3 placeholder-[#bbbbbb] text-[#EFEFEF] focus:outline-none focus:border-amber-500 transition-colors appearance-none"
                                >
                                    <option value="">Elegí una opción</option>
                                    <optgroup label="Desarrollo web">
                                        <option value="Desarrollo - Engranaje Esencial">Engranaje Esencial</option>
                                        <option value="Desarrollo - Mecanismo Completo">Mecanismo Completo</option>
                                        <option value="Desarrollo - Cronógrafo a Medida">Cronógrafo a Medida</option>
                                    </optgroup>
                                    <optgroup label="Mantenimiento">
                                        <option value="Mantenimiento - Puesta a Punto Esencial">Puesta a Punto Esencial</option>
                                        <option value="Mantenimiento - Soporte Prioritario">Soporte Prioritario</option>
                                        <option value="Mantenimiento - Taller Completo">Mantenimiento Taller Completo</option>
                                    </optgroup>
                                    <optgroup label="Otros servicios">
                                        <option value="Otros - Revisión y Ajuste">Revisión y Ajuste (rediseño / migración)</option>
                                        <option value="Otros - Auditoría del Taller Digital">Auditoría del Taller Digital (consultoría SEO)</option>
                                        <option value="Otros - Tienda Artesanal">Tienda Artesanal (e-commerce)</option>
                                    </optgroup>
                                    <option value="Otras Consultas">Otras consultas</option>
                                </select>
                            </div>

                            {/* Honeypot: invisible para personas, los bots lo completan */}
                            <div className="hidden" aria-hidden="true">
                                <label htmlFor="website">No completar este campo</label>
                                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
                            </div>

                            {/* Mensaje */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-serif text-stone-300 mb-2">Mensaje</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 placeholder-[#bbbbbb] text-[#EFEFEF] focus:outline-none focus:border-amber-500 transition-colors resize-none"
                                    placeholder="Contame un poco sobre tu proyecto..."
                                ></textarea>
                            </div>

                            {/* Botón de envío y Estados */}
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-serif font-medium py-3 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>

                            {status === 'success' && (
                                <div className="text-center mt-4">
                                    <p className="text-green-400 font-medium">¡Mensaje recibido!</p>
                                    {ticketId && (
                                        <p className="text-stone-400 text-sm mt-1">
                                            Tu referencia es: <span className="text-amber-500 font-mono">{ticketId}</span>
                                        </p>
                                    )}
                                </div>
                            )}
                            {status === 'error' && (
                                <p className="text-red-400 text-center text-sm mt-2">Algo falló. Probá de nuevo o escribime por WhatsApp o al correo.</p>
                            )}
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;