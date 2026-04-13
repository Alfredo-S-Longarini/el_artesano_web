import React, { useState, useRef } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

export default function QrGenerator() {
    const [url, setUrl] = useState('https://www.elartesanoweb.com');
    const [fgColor, setFgColor] = useState('#f59e0b'); // Ámbar por defecto
    const [bgColor, setBgColor] = useState('#ffffff');
    const [logo, setLogo] = useState(null);

    const canvasRef = useRef();
    const svgRef = useRef();

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setLogo(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const downloadPNG = () => {
        const canvas = canvasRef.current.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = 'qr-artesano-hd.png';
            link.click();
        }
    };

    const downloadSVG = () => {
        const svgNode = svgRef.current.querySelector('svg');
        if (svgNode) {
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgNode);
            const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'qr-artesano-vectorial.svg';
            link.click();
        }
    };

    const qrSettings = {
        value: url || " ",
        size: 1024,
        bgColor: bgColor,
        fgColor: fgColor,
        level: "H",
        includeMargin: true,
        imageSettings: logo ? {
            src: logo,
            height: 200,
            width: 200,
            excavate: true,
        } : undefined
    };

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* PANEL DE CONFIGURACIÓN (Lado izquierdo) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-[#231e19]/60 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-xl">
                        <h3 className="text-[11px] uppercase tracking-[0.3em] text-amber-500 font-black mb-8 flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                            Parámetros de Forja
                        </h3>

                        <div className="space-y-8">
                            {/* Input de Contenido */}
                            <div className="group">
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3 group-focus-within:text-amber-500 transition-colors">Destino del QR</label>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://tu-sitio.com"
                                    className="w-full bg-[#1a1510] border border-white/10 rounded-xl px-5 py-4 text-[#EFEFEF] focus:outline-none focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all"
                                />
                            </div>

                            {/* Selectores de Color Estilizados */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-[#1a1510] border border-white/5 rounded-xl">
                                    <label className="block text-[10px] font-bold text-stone-500 uppercase mb-3">Puntos</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={fgColor}
                                            onChange={(e) => setFgColor(e.target.value)}
                                            className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-none"
                                        />
                                        <span className="text-xs font-mono text-stone-400 uppercase tracking-tighter">{fgColor}</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-[#1a1510] border border-white/5 rounded-xl">
                                    <label className="block text-[10px] font-bold text-stone-500 uppercase mb-3">Fondo</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-none"
                                        />
                                        <span className="text-xs font-mono text-stone-400 uppercase tracking-tighter">{bgColor}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Dropzone de Logo */}
                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Marca de Agua (Logo)</label>
                                <div className={`relative group border-2 border-dashed rounded-2xl transition-all duration-300 ${logo ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/10 hover:border-amber-500/20 bg-[#1a1510]'}`}>
                                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" onChange={handleLogoUpload} />
                                    <div className="p-6 text-center">
                                        {logo ? (
                                            <div className="flex items-center justify-between gap-4 text-left">
                                                <div className="flex items-center gap-3">
                                                    <img src={logo} className="w-10 h-10 rounded shadow-lg object-contain bg-white p-1" alt="Logo preview" />
                                                    <span className="text-[11px] text-[#EFEFEF] font-bold uppercase truncate max-w-[120px]">Imagen Cargada</span>
                                                </div>
                                                <button onClick={(e) => { e.preventDefault(); setLogo(null); }} className="relative z-20 text-[10px] text-red-400 font-black uppercase hover:text-red-300 transition-colors">Eliminar</button>
                                            </div>
                                        ) : (
                                            <div className="py-2">
                                                <svg className="w-6 h-6 text-stone-600 mx-auto mb-2 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                                <p className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">Subir archivo PNG/JPG</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PANEL DE PREVIEW (Lado derecho) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="bg-[#1a1510] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[500px] shadow-inner relative overflow-hidden group">
                        
                        {/* Decoración de fondo */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0%,transparent_70%)]"></div>
                        
                        <div className="relative z-10 text-center">
                            <h3 className="text-stone-500 text-[10px] uppercase tracking-[0.4em] mb-12 font-black">Sello Generado</h3>
                            
                            <div className="p-6 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:scale-[1.02] flex items-center justify-center">
                                <div ref={canvasRef}>
                                    <QRCodeCanvas
                                        {...qrSettings}
                                        style={{ width: '280px', height: 'auto', maxWidth: '100%' }}
                                    />
                                </div>
                            </div>

                            <div ref={svgRef} style={{ display: 'none' }}>
                                <QRCodeSVG {...qrSettings} />
                            </div>

                            {/* Acciones de exportación */}
                            <div className="mt-16 flex flex-wrap justify-center gap-4">
                                <button
                                    onClick={downloadPNG}
                                    className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-[#1a1510] font-black rounded-xl transition-all shadow-lg shadow-amber-500/10 active:scale-95 text-xs uppercase tracking-widest flex items-center gap-2"
                                >
                                    Descargar PNG <span className="text-[10px] opacity-60">(HD)</span>
                                </button>
                                <button
                                    onClick={downloadSVG}
                                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black rounded-xl transition-all active:scale-95 text-xs uppercase tracking-widest flex items-center gap-2"
                                >
                                    Descargar SVG <span className="text-[10px] opacity-40">(Vector)</span>
                                </button>
                            </div>
                            
                            <p className="mt-8 text-[10px] text-stone-600 font-serif italic max-w-sm mx-auto">
                                * Utiliza SVG para impresiones de gran formato o diseños vectoriales de alta precisión.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}