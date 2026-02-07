import React, { useState, useRef } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

export default function QrGenerator() {
    const [url, setUrl] = useState('https://www.elartesanoweb.com');
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [logo, setLogo] = useState(null);

    // Referencias independientes
    const canvasRef = useRef();
    const svgRef = useRef();

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLogo(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 1. Descargar PNG de Alta Resolución
    const downloadPNG = () => {
        // Buscamos el canvas dentro del div referenciado
        const canvas = canvasRef.current.querySelector('canvas');
        if (canvas) {
            // Al tener size={1024} en el componente, el toDataURL genera una imagen grande
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'qr-elartesanoweb.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    // 2. Descargar SVG Vectorial
    const downloadSVG = () => {
        const svgNode = svgRef.current.querySelector('svg');
        if (svgNode) {
            // Serializamos el nodo SVG a texto
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgNode);
            const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'qr-elartesanoweb.svg';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    // Configuración común para ambos renderizadores
    const qrSettings = {
        value: url,
        size: 1024, // ALTA RESOLUCIÓN INTERNA
        bgColor: bgColor,
        fgColor: fgColor,
        level: "H", // High Error Correction
        includeMargin: true,
        imageSettings: logo ? {
            src: logo,
            x: undefined,
            y: undefined,
            height: 200, // Ajustado proporcionalmente al size 1024
            width: 200,
            excavate: true,
        } : undefined
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* COLUMNA 1: CONTROLES */}
            <div className="bg-[#231e19] p-8 rounded-xl shadow-2xl border border-white/5 h-fit backdrop-blur-sm">
                <h3 className="text-xl text-[#EFEFEF] font-serif font-bold mb-6 border-b border-white/10 pb-4">
                    Personalización
                </h3>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-[#EFEFEF] font-semibold text-sm">URL o Texto</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full py-3 px-4 rounded-lg bg-[#1a1510] border border-white/10 text-[#EFEFEF] placeholder:text-stone-600 focus:border-amber-500 outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-[#EFEFEF] font-semibold text-sm">Color Puntos</label>
                            <div className="flex items-center gap-2 bg-[#1a1510] p-2 rounded-lg border border-white/10">
                                <input
                                    type="color"
                                    value={fgColor}
                                    onChange={(e) => setFgColor(e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                                />
                                <span className="text-xs text-stone-400 font-mono">{fgColor}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[#EFEFEF] font-semibold text-sm">Color Fondo</label>
                            <div className="flex items-center gap-2 bg-[#1a1510] p-2 rounded-lg border border-white/10">
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                                />
                                <span className="text-xs text-stone-400 font-mono">{bgColor}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[#EFEFEF] font-semibold text-sm">
                            Logo (Opcional)
                        </label>
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-white/10 border-dashed rounded-lg cursor-pointer bg-[#1a1510] hover:bg-[#1f1a15] transition-colors group">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <p className="text-xs text-stone-500 group-hover:text-amber-500 transition-colors">
                                    {logo ? '¡Imagen cargada! Click para cambiar' : 'Click para subir imagen (PNG/JPG)'}
                                </p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                        </label>
                        {logo && (
                            <button onClick={() => setLogo(null)} className="text-xs text-red-400 hover:text-red-300 underline">
                                Quitar logo
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* COLUMNA 2: VISUALIZACIÓN */}
            <div className="flex flex-col">
                <div className="bg-[#231e19] p-8 rounded-xl shadow-2xl border border-white/5 grow flex flex-col items-center justify-center text-center">

                    <h3 className="text-xl text-[#EFEFEF] font-serif font-bold mb-8">
                        Vista Previa
                    </h3>

                    {/* CANVAS VISIBLE:
               Renderizamos a 1024px reales, pero usamos CSS (style) para limitarlo a 280px en pantalla.
               Esto asegura que la descarga sea HD pero no rompa el layout.
            */}
                    <div ref={canvasRef} className="p-4 bg-white rounded-lg shadow-xl inline-block mb-8">
                        <QRCodeCanvas
                            {...qrSettings}
                            style={{ width: '280px', height: 'auto', maxWidth: '100%' }}
                        />
                    </div>

                    {/* SVG OCULTO: Solo existe para ser descargado */}
                    <div ref={svgRef} style={{ display: 'none' }}>
                        <QRCodeSVG {...qrSettings} />
                    </div>

                    {/* Botones de Descarga */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                        <button
                            onClick={downloadPNG}
                            className="flex-1 bg-amber-500 text-[#1a1510] font-bold py-3 px-4 rounded-lg hover:bg-amber-400 transition-all uppercase tracking-wider text-sm shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.23)] hover:-translate-y-1"
                        >
                            Descargar PNG (HD)
                        </button>
                        <button
                            onClick={downloadSVG}
                            className="flex-1 border-2 border-stone-600 text-stone-300 font-bold py-3 px-4 rounded-lg hover:border-amber-500 hover:text-amber-500 transition-all uppercase tracking-wider text-sm hover:-translate-y-1"
                        >
                            Descargar SVG
                        </button>
                    </div>

                    <p className="mt-4 text-xs text-stone-500 max-w-xs">
                        PNG es ideal para redes sociales. SVG es vectorial, perfecto para imprenta y diseño gráfico.
                    </p>

                </div>
            </div>
        </div>
    );
}