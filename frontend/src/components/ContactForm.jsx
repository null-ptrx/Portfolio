import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || formData.message.length < 10) {
      setError('Please fill all fields correctly (message min 10 chars).');
      return;
    }

    const apiKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!apiKey) {
      console.error('Missing VITE_WEB3FORMS_KEY');
      setError('Internal server error.');
      return;
    }

    setStatus('sending');
    setError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: apiKey,
          ...formData,
          subject: 'New message from portfolio',
          from_name: 'Portfolio Contact',
          botcheck: '',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        throw new Error(data.message || 'Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setError('ERROR — TRY AGAIN');
    }
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    background: 'rgba(223,231,224,.04)',
    border: '1px solid var(--line)',
    color: 'var(--bone)',
    fontFamily: 'inherit',
    fontSize: '14px',
    padding: '12px 16px',
    outline: 'none',
    transition: 'border-color .2s',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '10px',
    letterSpacing: '.2em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    lineHeight: '1'
  };

  return (
    <div className="fin-form" style={{ marginTop: '80px', fontFamily: 'inherit' }}>
      <form id="contact-form" data-rv="up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit}>
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={labelStyle}>Name</label>
          <input name="name" type="text" required placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--bone-dim)'} onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={labelStyle}>Email</label>
          <input name="email" type="email" required placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--bone-dim)'} onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={labelStyle}>Message</label>
          <textarea name="message" required rows="5" placeholder="Write something..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{...inputStyle, resize: 'vertical'}}
            onFocus={(e) => e.target.style.borderColor = 'var(--bone-dim)'} onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
          ></textarea>
        </div>
        <div>
          <button type="submit" id="contact-btn" className="cta" style={{ marginTop: '0', display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: '1px solid var(--line)', padding: '12px 20px', color: 'var(--bone)', cursor: 'pointer', fontFamily: 'inherit' }} disabled={status === 'sending'}>
            <i></i>
            <span id="contact-btn-label">
              {status === 'sending' ? 'SENDING...' : status === 'success' ? 'MESSAGE SENT ✓' : status === 'error' ? error : 'SEND MESSAGE ↗'}
            </span>
          </button>
        </div>
      </form>
      <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <a href="mailto:dharmveer.97@outlook.com" style={{ textDecoration: 'none', padding: '8px 16px', border: '1px solid var(--muted)', color: 'var(--bone-dim)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.2s', fontFamily: 'inherit' }}
           onMouseOver={(e) => { e.target.style.borderColor = 'crimson'; e.target.style.color = 'crimson'; }}
           onMouseOut={(e) => { e.target.style.borderColor = 'var(--muted)'; e.target.style.color = 'var(--bone-dim)'; }}>
           EMAIL ME ↗
        </a>
        <a href="https://github.com/null-ptrx" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '8px 16px', border: '1px solid var(--muted)', color: 'var(--bone-dim)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.2s', fontFamily: 'inherit' }}
           onMouseOver={(e) => { e.target.style.borderColor = 'crimson'; e.target.style.color = 'crimson'; }}
           onMouseOut={(e) => { e.target.style.borderColor = 'var(--muted)'; e.target.style.color = 'var(--bone-dim)'; }}>
           GITHUB ↗
        </a>
      </div>
    </div>
  );
};

export default ContactForm;
