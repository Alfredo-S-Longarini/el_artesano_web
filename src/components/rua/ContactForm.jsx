// src/components/ContactForm.jsx
import { useState } from 'react';

const SERVICES = [
  { value: '',           label: '¿En qué podemos ayudarte?' },
  { value: 'logo',       label: 'Identidad visual / Logo' },
  { value: 'templates',  label: 'Templates para redes' },
  { value: 'infografia', label: 'Infografía' },
  { value: 'branding',   label: 'Branding completo' },
  { value: 'otro',       label: 'Otro' },
];

function validate(field, value) {
  if (!value.trim()) return 'Campo requerido';
  if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
  return null;
}

export default function ContactForm() {
  const [form,     setForm]     = useState({ nombre: '', email: '', servicio: '', mensaje: '' });
  const [touched,  setTouched]  = useState({});
  const [status,   setStatus]   = useState('idle'); // idle | sending | done | error
  const [ticketId, setTicketId] = useState(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleBlur   = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(form).map((k) => [k, true])));
    if (Object.entries(form).some(([k, v]) => validate(k, v))) return;
    setStatus('sending');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.nombre,
          email:   form.email,
          subject: form.servicio,
          message: form.mensaje,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTicketId(data.id);
        setStatus('done');
        setForm({ nombre: '', email: '', servicio: '', mensaje: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const borderColor = (name) =>
    touched[name] && validate(name, form[name]) ? 'border-red-500' : 'border-brown/25';

  if (status === 'done') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M5 14l7 7L23 7" stroke="#c89f53" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-serif text-[32px] font-normal text-brown mb-3">¡Mensaje enviado!</h3>
        <p className="font-sans text-[14px] text-brown/60 leading-[1.7]">
          Te respondemos en menos de 24 horas. Gracias por escribirnos.
        </p>
        {ticketId && (
          <p className="font-sans text-[13px] text-brown/50 mt-3">
            Tu referencia: <span className="font-mono text-brown">{ticketId}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Nombre + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        {[
          { name: 'nombre', label: 'Nombre', type: 'text',  placeholder: 'Tu nombre',   autoComplete: 'name' },
          { name: 'email',  label: 'Email',  type: 'email', placeholder: 'tu@email.com', autoComplete: 'email' },
        ].map((f) => (
          <div key={f.name} className="field-wrap">
            <label className="field-label" htmlFor={`cf-${f.name}`}>{f.label}</label>
            <input
              id={`cf-${f.name}`}
              type={f.type}
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={f.placeholder}
              autoComplete={f.autoComplete}
              className={`field-input border-b ${borderColor(f.name)}`}
            />
            {touched[f.name] && validate(f.name, form[f.name]) && (
              <p className="field-error" role="alert">{validate(f.name, form[f.name])}</p>
            )}
          </div>
        ))}
      </div>

      {/* Servicio */}
      <div className="field-wrap">
        <label className="field-label" htmlFor="cf-servicio">Servicio</label>
        <select
          id="cf-servicio"
          name="servicio"
          value={form.servicio}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`field-input border-b ${borderColor('servicio')} cursor-pointer appearance-none
            bg-[url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235c4033' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")]
            bg-no-repeat bg-position-[right_4px_center] pr-6`}
        >
          {SERVICES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        {touched.servicio && validate('servicio', form.servicio) && (
          <p className="field-error" role="alert">{validate('servicio', form.servicio)}</p>
        )}
      </div>

      {/* Mensaje */}
      <div className="field-wrap">
        <label className="field-label" htmlFor="cf-mensaje">Tu idea</label>
        <textarea
          id="cf-mensaje"
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Contanos sobre tu proyecto, tu público y qué buscás lograr..."
          rows={4}
          className={`field-input border-b ${borderColor('mensaje')} resize-none block`}
        />
        {touched.mensaje && validate('mensaje', form.mensaje) && (
          <p className="field-error" role="alert">{validate('mensaje', form.mensaje)}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className={`w-full py-[18px] font-sans text-[13px] font-semibold tracking-[2px] uppercase
          rounded-sm text-cream border-none cursor-pointer transition-colors duration-200
          ${status === 'sending'
            ? 'bg-beige cursor-not-allowed'
            : 'bg-brown hover:bg-brown-dark'
          }`}
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {status === 'error' && (
        <p className="font-sans text-[13px] text-red-500 text-center mt-4">
          Hubo un error al enviar. Por favor intentá de nuevo o escribinos directamente.
        </p>
      )}
    </form>
  );
}
