import React, { useState } from 'react';

export default function WhatsAppGenerator() {
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = (e) => {
        e.preventDefault();
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
        setGeneratedLink(url);
        setCopied(false); // Resetear estado de copiado al generar uno nuevo
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Volver a la normalidad en 2s
    };

    return (
        <div className="bg-[#231e19] p-8 md:p-10 rounded-xl shadow-2xl border border-white/5 max-w-2xl mx-auto backdrop-blur-sm">

            <form onSubmit={handleGenerate} className="space-y-8">

                {/* Input Teléfono */}
                <div className="space-y-2">
                    <label className="block text-[#EFEFEF] font-serif font-semibold tracking-wide ml-1">
                        Número de WhatsApp <span className="text-amber-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="Ej: 54123456789"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            // AQUI ESTÁ EL CAMBIO: py-4 (vertical) px-6 (horizontal)
                            className="no-spinner w-full py-4 px-6 rounded-lg bg-[#1a1510] border border-white/10 text-[#EFEFEF] placeholder:text-stone-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all duration-300 "
                            required
                        />
                        <p className="text-xs text-stone-500 mt-2 ml-1">
                            Incluye el código de país (ej: 54 para Argentina o 506 para Costa Rica) sin espacios ni símbolos (+).
                        </p>
                    </div>
                </div>

                {/* Input Mensaje */}
                <div className="space-y-2">
                    <label className="block text-[#EFEFEF] font-serif font-semibold tracking-wide ml-1">
                        Mensaje predeterminado
                    </label>
                    <textarea
                        rows="4"
                        placeholder="Hola, vengo de tu sitio web y me gustaría consultar por..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        // AQUI TAMBIÉN: py-4 px-6
                        className="w-full py-4 px-6 rounded-lg bg-[#1a1510] border border-white/10 text-[#EFEFEF] placeholder:text-stone-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all duration-300 resize-none"
                    />
                </div>

                {/* Botón Generar */}
                <button
                    type="submit"
                    className="w-full bg-amber-500 text-[#1a1510] font-bold py-4 rounded-lg hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 text-lg uppercase tracking-wider transform active:scale-[0.98] hover:cursor-pointer"
                >
                    Generar Enlace
                </button>
            </form>

            {/* Resultado (Se muestra solo si hay link) */}
            {generatedLink && (
                <div className="mt-10 pt-8 border-t border-white/10 animate-fade-in">
                    <p className="text-[#EFEFEF] font-serif font-semibold mb-4 ml-1">
                        ¡Tu enlace está listo!
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
                font-bold py-3 rounded-lg transition-all duration-300 border
                ${copied
                                    ? 'bg-green-500/10 border-green-500 text-green-500'
                                    : 'bg-transparent border-stone-600 text-stone-300 hover:border-amber-500 hover:text-amber-500 hover:cursor-pointer'
                                }
              `}
                        >
                            {copied ? '¡Copiado!' : 'Copiar'}
                        </button>

                        <a
                            href={generatedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#EFEFEF] text-[#1a1510] font-bold py-3 rounded-lg text-center hover:bg-white transition-colors border border-transparent hover:cursor-pointer"
                        >
                            Probar Enlace &rarr;
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}