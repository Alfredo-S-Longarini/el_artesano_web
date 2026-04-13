import React, { useState } from 'react';

export default function UrlShortener() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShortUrl('');
        setLoading(true);

        if (!longUrl.startsWith('http')) {
            setError('La URL debe comenzar con http:// o https://');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
            if (!response.ok) throw new Error('Servicio no disponible');
            const result = await response.text();
            setShortUrl(result);
        } catch (err) {
            setError('Error en la forja del enlace. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto px-4">
            <div className="bg-[#231e19]/60 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
                
                {/* Cabecera del Componente */}
                <div className="p-8 border-b border-white/5 bg-linear-to-b from-white/2 to-transparent text-center">
                    <span className="text-amber-500 font-serif italic text-sm tracking-widest block mb-2">Compresión de Enlaces</span>
                    <h3 className="text-2xl font-sans font-black text-[#EFEFEF] uppercase tracking-tighter">Acortador Pro</h3>
                </div>

                <div className="p-8 md:p-12">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3 group">
                            <label className="text-[11px] uppercase tracking-[0.3em] text-stone-500 font-bold ml-1 transition-colors group-focus-within:text-amber-500">
                                Enlace Original
                            </label>
                            <div className="relative flex items-center">
                                <div className="absolute left-5 text-amber-500/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                </div>
                                <input
                                    type="url"
                                    placeholder="Pega la URL larga aquí..."
                                    value={longUrl}
                                    onChange={(e) => setLongUrl(e.target.value)}
                                    className="w-full bg-[#1a1510] border border-white/10 rounded-xl pl-14 pr-6 py-5 text-[#EFEFEF] focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all duration-300 placeholder:text-stone-700 font-mono text-sm"
                                    required
                                />
                            </div>
                            {error && (
                                <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                w-full py-5 rounded-xl font-black uppercase tracking-[0.2em] text-sm transition-all duration-500 relative overflow-hidden
                                ${loading 
                                    ? 'bg-stone-800 text-stone-500 cursor-wait' 
                                    : 'bg-amber-500 text-[#1a1510] hover:bg-amber-400 shadow-lg shadow-amber-500/10 active:scale-[0.98]'
                                }
                            `}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-3">
                                    <svg className="animate-spin h-5 w-5 text-stone-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Procesando
                                </span>
                            ) : 'Reducir Enlace'}
                        </button>
                    </form>

                    {/* Área de Resultado */}
                    {shortUrl && (
                        <div className="mt-12 space-y-6 animate-in zoom-in-95 duration-500">
                            <div className="relative p-8 rounded-2xl bg-amber-500/3 border border-amber-500/20 text-center overflow-hidden">
                                {/* Decoración de fondo */}
                                <div className="absolute top-0 right-0 p-2 opacity-[0.03] rotate-12">
                                     <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path></svg>
                                </div>

                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500/60 mb-4 block">Resultado de la Forja</span>
                                <a 
                                    href={shortUrl} 
                                    target="_blank" 
                                    className="text-3xl md:text-4xl font-sans font-bold text-[#EFEFEF] hover:text-amber-500 transition-colors break-all leading-tight"
                                >
                                    {shortUrl.replace('https://', '')}
                                </a>

                                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        onClick={copyToClipboard}
                                        className={`
                                            flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all
                                            ${copied 
                                                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                                                : 'bg-white/5 text-[#EFEFEF] border border-white/10 hover:bg-white/10'
                                            }
                                        `}
                                    >
                                        {copied ? '¡Copiado!' : 'Copiar URL'}
                                    </button>
                                    <button
                                        onClick={() => { setShortUrl(''); setLongUrl(''); }}
                                        className="py-4 rounded-xl font-bold uppercase tracking-widest text-xs bg-[#EFEFEF] text-[#1a1510] hover:bg-white transition-all shadow-xl shadow-black/20"
                                    >
                                        Nuevo Enlace
                                    </button>
                                </div>
                            </div>
                            <p className="text-center text-stone-600 font-serif italic text-xs">
                                Enlace generado mediante la forja de TinyURL. Válido de forma permanente.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}