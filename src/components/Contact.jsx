import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '', // Valor por defecto
        message: ''
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
                setFormData({ name: '', email: '', subject: '', message: '' });
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
                            ¿Listo para darle vida a ese mecanismo digital? Cuéntame sobre tu proyecto y analicemos cómo puedo ayudarte a lograrlo.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 text-[#EFEFEF]">
                                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-amber-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                </div>
                                <span>elartesanoweb73@gmail.com</span>
                            </div>
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
                                <label htmlFor="subject" className="block text-sm font-serif text-stone-300 mb-2">¿En qué estás interesado?</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-[#1a1510] border border-white/10 rounded-lg px-4 py-3 placeholder-[#bbbbbb] text-[#EFEFEF] focus:outline-none focus:border-amber-500 transition-colors appearance-none"
                                >
                                    <option value="Presupuesto Web - 1">Engranaje Esencial</option>
                                    <option value="Presupuesto Web - 2">Mecanismo Completo</option>
                                    <option value="Presupuesto Web - 3">Cronógrafo a Medida</option>
                                    <option value="Presupuesto Mant - 1">Puesta a Punto Esencial</option>
                                    <option value="Presupuesto Mant - 2">Soporte prioritario</option>
                                </select>
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
                                    placeholder="Cuéntame un poco sobre tu proyecto..."
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
                                <p className="text-red-400 text-center text-sm mt-2">Hubo un error. Por favor intenta de nuevo o escríbeme directo al correo.</p>
                            )}
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;