import React, { useState, useEffect } from 'react';

const SERVICES = {
    whatsapp: {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>,
        placeholder: 'Ej: 5492995041548',
        label: 'Número de Teléfono',
        inputType: 'number',
        hasMessage: true,
        color: '#22c55e'
    },
    telegram: {
        id: 'telegram',
        name: 'Telegram',
        icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
        placeholder: 'Ej: elartesanoweb',
        label: 'Nombre de Usuario',
        inputType: 'text',
        hasMessage: false,
        color: '#38bdf8'
    },
    email: {
        id: 'email',
        name: 'Email',
        icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>,
        placeholder: 'cliente@ejemplo.com',
        label: 'Correo Electrónico',
        inputType: 'email',
        hasMessage: true,
        hasSubject: true,
        color: '#f87171'
    },
    sms: {
        id: 'sms',
        name: 'SMS',
        icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
        placeholder: 'Ej: +549299...',
        label: 'Número de Teléfono',
        inputType: 'tel',
        hasMessage: true,
        color: '#c084fc'
    }
};

export default function UniversalLinkGenerator() {
    const [activeService, setActiveService] = useState('whatsapp');
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setInputValue('');
        setMessage('');
        setSubject('');
        setGeneratedLink('');
    }, [activeService]);

    const handleGenerate = (e) => {
        e.preventDefault();
        let url = '';
        const encodedMsg = encodeURIComponent(message);
        const encodedSubject = encodeURIComponent(subject);

        if (activeService === 'whatsapp') {
            const cleanPhone = inputValue.replace(/[^0-9]/g, '');
            url = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
        } else if (activeService === 'telegram') {
            url = `https://t.me/${inputValue.replace('@', '').trim()}`;
        } else if (activeService === 'email') {
            url = `mailto:${inputValue}?subject=${encodedSubject}&body=${encodedMsg}`;
        } else if (activeService === 'sms') {
            url = `sms:${inputValue.replace(/\s/g, '')}?body=${encodedMsg}`;
        }

        setGeneratedLink(url);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const config = SERVICES[activeService];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-[#231e19]/60 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-2xl">

                {/* 1. Cabecera del Generador */}
                <div className="p-8 border-b border-white/5 bg-linear-to-b from-white/2 to-transparent">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {Object.values(SERVICES).map((service) => (
                            <button
                                key={service.id}
                                onClick={() => setActiveService(service.id)}
                                className={`
                                    relative flex items-center gap-3 px-6 py-3 rounded-xl border transition-all duration-500 group
                                    ${activeService === service.id
                                        ? 'bg-[#1a1510] border-amber-500/50 text-[#EFEFEF] shadow-lg shadow-amber-500/10'
                                        : 'bg-transparent border-white/5 text-stone-500 hover:border-white/20 hover:text-stone-300'
                                    }
                                `}
                            >
                                <service.icon className={`w-5 h-5 transition-colors duration-300 ${activeService === service.id ? 'text-amber-500' : 'group-hover:text-stone-300'}`} />
                                <span className="font-sans font-bold text-sm tracking-wide">{service.name}</span>
                                {activeService === service.id && (
                                    <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber-500 shadow-[0_0_10px_#f59e0b]"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* 2. Formulario */}
                    <form onSubmit={handleGenerate} className="space-y-6">
                        <div className="space-y-2 group">
                            <label className="text-[11px] uppercase tracking-[0.2em] text-amber-500/80 font-bold ml-1 transition-colors group-focus-within:text-amber-500">
                                {config.label}
                            </label>
                            <input
                                type={config.inputType}
                                placeholder={config.placeholder}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full bg-[#1a1510] border border-white/10 rounded-xl px-5 py-4 text-[#EFEFEF] focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 placeholder:text-stone-700"
                                required
                            />
                        </div>

                        {config.hasSubject && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-left-4">
                                <label className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-bold ml-1">Asunto</label>
                                <input
                                    type="text"
                                    placeholder="¿De qué trata este correo?"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full bg-[#1a1510] border border-white/10 rounded-xl px-5 py-4 text-[#EFEFEF] focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-stone-700"
                                />
                            </div>
                        )}

                        {config.hasMessage && (
                            <div className="space-y-2">
                                <label className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-bold ml-1">Mensaje Predeterminado</label>
                                <textarea
                                    rows="4"
                                    placeholder="Escribe el contenido aquí..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full bg-[#1a1510] border border-white/10 rounded-xl px-5 py-4 text-[#EFEFEF] focus:outline-none focus:border-amber-500/50 transition-all resize-none placeholder:text-stone-700"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-amber-500 hover:bg-amber-400 text-[#1a1510] font-black py-5 rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-[0.98] uppercase tracking-widest text-sm"
                        >
                            Forjar Enlace
                        </button>
                    </form>

                    {/* 3. Panel de Resultado (Visualmente Diferenciado) */}
                    <div className="relative">
                        <div className={`
                            h-full flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed transition-all duration-700
                            ${generatedLink ? 'bg-amber-500/2 border-amber-500/30' : 'bg-transparent border-white/5'}
                        `}>
                            {!generatedLink ? (
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mx-auto opacity-20">
                                        <svg className="w-6 h-6 text-[#EFEFEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    </div>
                                    <p className="text-stone-500 font-serif italic">Completa los datos para forjar la URL</p>
                                </div>
                            ) : (
                                <div className="w-full space-y-8 animate-in zoom-in-95 duration-500">
                                    <div className="text-center">
                                        <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-2">Listo para compartir</div>
                                        <h4 className="text-2xl font-sans font-bold text-[#EFEFEF]">Enlace Creado</h4>
                                    </div>

                                    <div className="bg-[#1a1510] border border-white/10 rounded-xl p-4 overflow-hidden group relative">
                                        <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-[#1a1510] to-transparent pointer-events-none"></div>
                                        <code className="text-amber-500/80 font-mono text-sm break-all">
                                            {generatedLink}
                                        </code>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        <button
                                            onClick={copyToClipboard}
                                            className={`
                                                w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2
                                                ${copied ? 'bg-green-500 text-white' : 'bg-white/5 text-[#EFEFEF] hover:bg-white/10 border border-white/10'}
                                            `}
                                        >
                                            {copied ? (
                                                <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> ¡Copiado!</>
                                            ) : 'Copiar al Portapapeles'}
                                        </button>
                                        <a
                                            href={generatedLink}
                                            target="_blank"
                                            className="w-full py-4 rounded-xl font-bold bg-white text-[#1a1510] hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            Probar Enlace
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}