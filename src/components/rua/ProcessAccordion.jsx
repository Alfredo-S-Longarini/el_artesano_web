// src/components/ProcessAccordion.jsx
import { useState } from 'react';

const STEPS = [
  { n: '01', title: 'Contacto',             text: 'Nos escribís, nos contás tu idea y agendamos una charla sin compromiso para conocernos.' },
  { n: '02', title: 'Brief creativo',        text: 'Te hacemos preguntas clave: tu público, tu estilo, tus referencias. Construimos juntos el brief.' },
  { n: '03', title: 'Proceso de diseño',     text: 'Nuestro equipo trabaja en la propuesta. Investigamos, bocetamos y refinamos cada detalle.' },
  { n: '04', title: 'Adelantos y revisiones',text: 'Te enviamos avances para que veas el camino y nos cuentes ajustes. Rondas incluidas.' },
  { n: '05', title: 'Entrega final',          text: 'Archivos listos en todos los formatos que necesitás: print, digital, redes. Sin sorpresas.' },
];

export default function ProcessAccordion() {
  const [active, setActive] = useState(null);

  return (
    <div>
      {STEPS.map((step, i) => {
        const isOpen = active === i;
        return (
          <div
            key={step.n}
            className="border-t border-beige/15 py-7 cursor-pointer"
            onClick={() => setActive(isOpen ? null : i)}
            role="button"
            aria-expanded={isOpen}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setActive(isOpen ? null : i)}
          >
            <div className="flex items-start gap-6">
              <span className="font-sans text-[11px] text-gold/50 tracking-[1px] pt-[5px] min-w-[24px]">
                {step.n}
              </span>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className={`font-serif font-normal leading-[1.2] transition-colors duration-200 ${isOpen ? 'text-gold' : 'text-cream'}`}
                      style={{ fontSize: 'clamp(20px,2.5vw,28px)' }}>
                    {step.title}
                  </h3>
                  <span className={`text-[20px] leading-none transition-all duration-300 mt-0.5 ${isOpen ? 'rotate-45 text-gold' : 'text-cream/30'}`}>
                    +
                  </span>
                </div>
                <div className="overflow-hidden transition-[max-height] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                     style={{ maxHeight: isOpen ? '200px' : '0' }}>
                  <p className="font-sans text-[14px] leading-[1.8] text-cream/60 pt-3.5">
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="border-t border-beige/15" />
    </div>
  );
}
