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

        // Validación básica de URL
        if (!longUrl.startsWith('http')) {
            setError('Por favor ingresa una URL válida (que empiece con http:// o https://)');
            setLoading(false);
            return;
        }

        try {
            // Usamos la API pública de TinyURL
            const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);

            if (!response.ok) throw new Error('Error al conectar con el servicio');

            const result = await response.text();
            setShortUrl(result);
        } catch (err) {
            console.error(err);
            setError('Hubo un problema al acortar el enlace. Intenta nuevamente.');
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
        <div className="bg-[#231e19] p-8 md:p-10 rounded-xl shadow-2xl border border-white/5 max-w-2xl mx-auto backdrop-blur-sm">

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-[#EFEFEF] font-serif font-semibold tracking-wide ml-1">
                        Pega tu enlace largo aquí
                    </label>
                    <div className="relative">
                        <input
                            type="url"
                            placeholder="https://ejemplo.com/una-ruta-muy-larga/..."
                            value={longUrl}
                            onChange={(e) => setLongUrl(e.target.value)}
                            className="w-full py-4 px-6 rounded-lg bg-[#1a1510] border border-white/10 text-[#EFEFEF] placeholder:text-stone-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all duration-300 pr-12"
                            required
                        />
                        {/* Ícono de eslabón decorativo */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        </div>
                    </div>
                    {error && <p className="text-red-400 text-sm ml-1 animate-pulse">{error}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`
            w-full font-bold py-4 rounded-lg transition-all duration-300 text-lg uppercase tracking-wider
            ${loading
                            ? 'bg-stone-700 text-stone-400 cursor-wait'
                            : 'bg-amber-500 text-[#1a1510] hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transform active:scale-[0.98]'
                        }
          `}
                >
                    {loading ? 'Acortando...' : 'Acortar URL'}
                </button>
            </form>

            {/* Resultado */}
            {shortUrl && (
                <div className="mt-10 pt-8 border-t border-white/10 animate-fade-in">
                    <p className="text-[#EFEFEF] font-serif font-semibold mb-4 ml-1">
                        ¡Enlace listo!
                    </p>

                    <div className="bg-[#1a1510] p-4 rounded-lg border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                        <a href={shortUrl} target="_blank" rel="noreferrer" className="text-amber-500 font-mono text-lg hover:underline truncate w-full text-center sm:text-left">
                            {shortUrl}
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={copyToClipboard}
                            className={`
                font-bold py-3 rounded-lg transition-all duration-300 border
                ${copied
                                    ? 'bg-green-500/10 border-green-500 text-green-500'
                                    : 'bg-transparent border-stone-600 text-stone-300 hover:border-amber-500 hover:text-amber-500'
                                }
              `}
                        >
                            {copied ? '¡Copiado!' : 'Copiar'}
                        </button>

                        <button
                            onClick={() => {
                                setShortUrl('');
                                setLongUrl('');
                            }}
                            className="bg-[#EFEFEF] text-[#1a1510] font-bold py-3 rounded-lg hover:bg-white transition-colors"
                        >
                            Acortar otro
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}