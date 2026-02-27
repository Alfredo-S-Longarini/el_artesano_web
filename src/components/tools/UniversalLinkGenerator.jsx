import React, { useState, useEffect } from 'react';

// Definición de servicios y sus configuraciones
const SERVICES = {
    whatsapp: {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>,
        placeholder: 'Ej: 5492995041548',
        label: 'Número (con código país)',
        inputType: 'number',
        hasMessage: true,
        hasSubject: false,
        color: 'text-green-500',
        borderColor: 'hover:border-green-500'
    },
    telegram: {
        id: 'telegram',
        name: 'Telegram',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
        placeholder: 'Ej: alfredosobarzo',
        label: 'Nombre de Usuario',
        inputType: 'text',
        hasMessage: false, // Telegram links directos suelen ser al perfil
        hasSubject: false,
        color: 'text-blue-400',
        borderColor: 'hover:border-blue-400'
    },
    email: {
        id: 'email',
        name: 'Email',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>,
        placeholder: 'cliente@ejemplo.com',
        label: 'Correo de Destino',
        inputType: 'email',
        hasMessage: true,
        hasSubject: true,
        color: 'text-red-400',
        borderColor: 'hover:border-red-400'
    },
    sms: {
        id: 'sms',
        name: 'SMS',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
        placeholder: 'Ej: +549299...',
        label: 'Número de Teléfono',
        inputType: 'tel',
        hasMessage: true,
        hasSubject: false, // SMS no tiene asunto, solo body
        color: 'text-purple-400',
        borderColor: 'hover:border-purple-400'
    }
};

export default function UniversalLinkGenerator() {
    const [activeService, setActiveService] = useState('whatsapp');
    const [inputValue, setInputValue] = useState(''); // Teléfono, User o Email
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState(''); // Solo para Email
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);

    // Limpiar campos al cambiar de servicio
    useEffect(() => {
        setInputValue('');
        setMessage('');
        setSubject('');
        setGeneratedLink('');
        setCopied(false);
    }, [activeService]);

    const handleGenerate = (e) => {
        e.preventDefault();
        const config = SERVICES[activeService];
        let url = '';

        const encodedMsg = encodeURIComponent(message);
        const encodedSubject = encodeURIComponent(subject);

        switch (activeService) {
            case 'whatsapp':
                // Limpiamos todo lo que no sea número
                const cleanPhoneWa = inputValue.toString().replace(/[^0-9]/g, '');
                url = `https://wa.me/${cleanPhoneWa}?text=${encodedMsg}`;
                break;

            case 'telegram':
                // Quitamos el @ si lo pusieron
                const cleanUser = inputValue.replace('@', '').trim();
                url = `https://t.me/${cleanUser}`;
                break;

            case 'email':
                url = `mailto:${inputValue}?subject=${encodedSubject}&body=${encodedMsg}`;
                break;

            case 'sms':
                // SMS suele requerir limpiar espacios pero mantener el + a veces, depende del OS.
                // Lo dejaremos limpio de espacios.
                const cleanPhoneSms = inputValue.replace(/\s/g, '');
                // El separador de body cambia entre iOS (&) y Android (?), pero ? suele ser más estándar web
                url = `sms:${cleanPhoneSms}?body=${encodedMsg}`;
                break;
        }

        setGeneratedLink(url);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const currentConfig = SERVICES[activeService];

    return (
        <div className="bg-[#231e19] p-8 md:p-10 rounded-xl shadow-2xl border border-white/5 max-w-3xl mx-auto backdrop-blur-sm">

            {/* 1. SELECTOR DE SERVICIO (TABS) */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {Object.values(SERVICES).map((service) => (
                    <button
                        key={service.id}
                        onClick={() => setActiveService(service.id)}
                        className={`
                    flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300
                    ${activeService === service.id
                                ? `bg-[#1a1510] border-amber-500 text-[#EFEFEF] shadow-[0_0_15px_rgba(245,158,11,0.2)]`
                                : `bg-transparent border-white/10 text-stone-500 hover:text-[#EFEFEF] ${service.borderColor}`
                            }
                `}
                    >
                        <span className={activeService === service.id ? service.color : ''}>
                            {service.icon}
                        </span>
                        <span className="font-serif font-bold text-sm">{service.name}</span>
                    </button>
                ))}
            </div>

            <form onSubmit={handleGenerate} className="space-y-6 animate-fade-in">

                {/* INPUT PRINCIPAL (Dinámico) */}
                <div className="space-y-2">
                    <label className="block text-[#EFEFEF] font-serif font-semibold tracking-wide ml-1">
                        {currentConfig.label} <span className="text-amber-500">*</span>
                    </label>
                    <input
                        type={currentConfig.inputType}
                        placeholder={currentConfig.placeholder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={`
                w-full py-4 px-6 rounded-lg bg-[#1a1510] border border-white/10 text-[#EFEFEF] 
                placeholder:text-stone-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 
                outline-none transition-all duration-300
                ${currentConfig.inputType === 'number' ? 'no-spinner' : ''}
            `}
                        required
                    />
                </div>

                {/* INPUT ASUNTO (Solo Email) */}
                {currentConfig.hasSubject && (
                    <div className="space-y-2 animate-fade-in">
                        <label className="block text-[#EFEFEF] font-serif font-semibold tracking-wide ml-1">
                            Asunto del Correo
                        </label>
                        <input
                            type="text"
                            placeholder="Consulta de presupuesto..."
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full py-4 px-6 rounded-lg bg-[#1a1510] border border-white/10 text-[#EFEFEF] placeholder:text-stone-600 focus:border-amber-500 outline-none transition-all"
                        />
                    </div>
                )}

                {/* INPUT MENSAJE (Opcional según servicio) */}
                {currentConfig.hasMessage && (
                    <div className="space-y-2 animate-fade-in">
                        <label className="block text-[#EFEFEF] font-serif font-semibold tracking-wide ml-1">
                            Mensaje Predeterminado
                        </label>
                        <textarea
                            rows="4"
                            placeholder="Escribe el mensaje que aparecerá automáticamente..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full py-4 px-6 rounded-lg bg-[#1a1510] border border-white/10 text-[#EFEFEF] placeholder:text-stone-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all duration-300 resize-none"
                        />
                    </div>
                )}

                {/* BOTÓN GENERAR */}
                <button
                    type="submit"
                    className="w-full bg-amber-500 text-[#1a1510] font-bold py-4 rounded-lg hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 text-lg uppercase tracking-wider transform active:scale-[0.98] mt-4"
                >
                    Generar Enlace {currentConfig.name}
                </button>
            </form>

            {/* RESULTADO */}
            {generatedLink && (
                <div className="mt-10 pt-8 border-t border-white/10 animate-fade-in">
                    <p className="text-[#EFEFEF] font-serif font-semibold mb-4 ml-1 flex items-center gap-2">
                        ¡Enlace listo!
                        <span className="text-xs font-sans font-normal text-stone-500 bg-white/5 px-2 py-1 rounded">
                            Formato: {activeService.toUpperCase()}
                        </span>
                    </p>

                    <div className="bg-[#1a1510] p-4 rounded-lg border border-white/5 flex items-center justify-between gap-4 mb-6 group">
                        <code className="text-stone-400 text-sm truncate font-mono select-all">
                            {generatedLink}
                        </code>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={copyToClipboard}
                            className={`
                font-bold py-3 rounded-lg transition-all duration-300 border hover:cursor-pointer
                ${copied
                                    ? 'bg-green-500/10 border-green-500 text-green-500'
                                    : 'bg-transparent border-stone-600 text-stone-300 hover:border-amber-500 hover:text-amber-500'
                                }
              `}
                        >
                            {copied ? '¡Copiado!' : 'Copiar'}
                        </button>

                        <a
                            href={generatedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#EFEFEF] text-[#1a1510] font-bold py-3 rounded-lg text-center hover:bg-white transition-colors border border-transparent"
                        >
                            Probar Enlace &rarr;
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}