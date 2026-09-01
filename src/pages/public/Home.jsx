import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, CalendarDays, Headphones, MapPin, MessageCircle, Music2, Play, Quote, Sparkles, Star, Users } from 'lucide-react';
import gsap from 'gsap';
import { PublicHeader } from '../../components/public/PublicHeader';
import { WhatsAppFloat } from '../../components/public/WhatsAppFloat';
import { LiquidButton } from '../../components/motion/LiquidButton';
import { Reveal } from '../../components/motion/Reveal';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Logo } from '../../components/ui/Logo';
import { ChatbotFloat } from '../../components/public/ChatbotFloat';
import { smoothScrollToId } from '../../services/navigation';
import { useAppStore } from '../../store/useAppStore';
function Hero() { const r = useRef(); useEffect(() => { const c = gsap.context(() => { gsap.from('.hero__photo', { scale: 1.08, duration: 1.8, ease: 'power3.out' }); gsap.from('.hero__copy>*', { y: 30, opacity: 0, stagger: .1, duration: .8, delay: .3, ease: 'power3.out' }); gsap.from('.sound-line__pulse', { scaleX: 0, transformOrigin: 'left', duration: 1.4, delay: .5, ease: 'power3.inOut' }); }, r); return () => c.revert(); }, []); return <section ref={r} className="hero"><div className="hero__media"><img className="hero__photo" src="/images/show-publico.jpg" alt="Jean Rezende & Rodrigo no palco"/><div className="hero__veil"/></div><div className="hero__copy shell"><span className="eyebrow">JEAN REZENDE & RODRIGO</span><h1>Tem música que toca.<br /><em>Tem música que acontece.</em></h1><p>Shows, eventos, casamentos e noites feitas para cantar junto.</p><div className="hero__actions"><LiquidButton href="#contrate">Contratar a dupla</LiquidButton><a className="text-link" href="#ao-vivo"><Play size={17}/> Sentir o show</a></div><div className="sound-line"><span className="sound-line__pulse"/></div></div><a className="hero__scroll" href="#show"><span>Conheça a história</span><ArrowDown size={16}/></a></section>; }
function Show() { return <section id="show" className="section"><div className="shell show-grid"><Reveal className="show-grid__image"><img src="/images/casa-de-show.jpg" alt="Dupla em casa de show"/><span className="image-tag"><Sparkles size={15}/> O show</span></Reveal><Reveal className="show-grid__copy" delay={.1}><span className="eyebrow">O SHOW</span><h2>O palco é onde tudo <em>acontece.</em></h2><p>Uma experiência sertaneja que mistura repertório, presença de palco e a energia de quem gosta de viver cada música junto com o público.</p><div className="feature-list"><div><Music2 size={20}/><span>Repertório para diferentes momentos</span></div><div><Users size={20}/><span>Interação com o público</span></div><div><Headphones size={20}/><span>Formato adaptável ao evento</span></div></div></Reveal></div></section>; }
function History() { const history = useAppStore(s => s.history); const h = history.filter(x => x.visible); return <section id="historia" className="section history-section"><div className="shell"><SectionHeading eyebrow="NOSSA HISTÓRIA" title={<>Uma estrada feita de <em>música.</em></>} text="Cada palco acrescenta um capítulo. A história real será editada pelo Owner."/><div className="history-timeline">{h.map((x, i) => <Reveal key={x.id} className={`history-item history-item--${i % 2 ? 'right' : 'left'}`}><div><span className="history-item__year">{x.year}</span><h3>{x.title}</h3><p>{x.text}</p></div><img src={x.image} alt={x.title}/></Reveal>)}</div></div></section>; }
function Agenda() { const showsState = useAppStore(s => s.shows); const shows = showsState.filter(x => x.visible); return <section id="agenda" className="section agenda-section"><div className="shell"><SectionHeading eyebrow="PRÓXIMOS PALCOS" title={<>Onde a próxima noite <em>começa.</em></>}/><div className="agenda-list">{shows.map((x, i) => { const d = new Date(x.date + 'T12:00:00'); return <Reveal key={x.id} delay={i * .04} className="agenda-row"><div className="agenda-date"><strong>{d.getDate()}</strong><span>{d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}</span></div><div className="agenda-info"><span>{x.private ? 'Evento particular' : 'Show público'}</span><h3>{x.title}</h3><p><MapPin size={14}/> {x.city} • {x.state}</p></div><div className="agenda-time"><CalendarDays size={17}/> {x.time}</div><a href="#contrate" className="round-arrow" aria-label="Ver evento"><ArrowUpRight size={18}/></a></Reveal>; })}</div></div></section>; }
function Live() { return <section id="ao-vivo" className="section"><div className="shell"><SectionHeading eyebrow="AO VIVO" title={<>Alguns momentos não cabem em <em>uma foto.</em></>} text="Vídeos reais entram depois. A estrutura já está pronta para navegação por vários vídeos."/><div className="live-feature"><img src="/images/gravacao-ao-vivo.jpg" alt="Gravação ao vivo"/><div className="live-feature__overlay"><button className="play-orb" aria-label="Reproduzir vídeo"><Play fill="currentColor" size={24}/></button><span>Ver momento ao vivo</span></div></div></div></section>; }
function Repertoire() { const a = [['MODÃO', 'Roda de viola, voz e histórias.'], ['SERTANEJO', 'Os clássicos que todo mundo sabe cantar.'], ['ROMÂNTICO', 'Aquele bloco para diminuir a luz.'], ['FESTA', 'Quando o público já está de pé.']]; return <section id="repertorio" className="section repertoire-section"><div className="shell"><SectionHeading eyebrow="REPERTÓRIO" title={<>A música certa para cada <em>momento.</em></>}/><div className="repertoire-grid">{a.map(([t, p], i) => <Reveal key={t} className="repertoire-card"><span>0{i + 1}</span><Music2 size={21}/><h3>{t}</h3><p>{p}</p></Reveal>)}</div></div></section>; }
function Moments() { const a = [['/images/praia-acustico.jpg', 'Acústico na praia'], ['/images/show-publico.jpg', 'Show e público'], ['/images/bar-de-rua.jpg', 'Bar de rua'], ['/images/fazenda-sertanejo.jpg', 'Sertanejo na fazenda'], ['/images/bastidores.jpg', 'Bastidores']]; return <section className="section"><div className="shell"><SectionHeading eyebrow="MOMENTOS" title={<>A noite contada em <em>cenas.</em></>}/><div className="moments-editorial">{a.map(([s, l], i) => <Reveal key={s} className={`moment moment--${i + 1}`}><img src={s} alt={l}/><span>{l}</span></Reveal>)}</div></div></section>; }
function Why() { const a = [['01', 'Experiência', 'Um show pensado para envolver o público.'], ['02', 'Repertório', 'Sertanejo para diferentes momentos.'], ['03', 'Interação', 'A energia do palco encontra a pista.'], ['04', 'Profissionalismo', 'Organização antes, durante e depois.']]; return <section className="section why-section"><div className="shell"><SectionHeading eyebrow="POR QUE CONTRATAR" title={<>Uma noite com <em>presença.</em></>}/><div className="why-grid">{a.map(([n, t, p]) => <Reveal key={n} className="why-item"><span>{n}</span><h3>{t}</h3><p>{p}</p></Reveal>)}</div></div></section>; }
function Testimonials() { const testimonials = useAppStore(s => s.testimonials); const a = testimonials.filter(x => x.visible); return <section className="section testimonials-section"><div className="shell testimonials-wrap"><div className="testimonial-mark"><Quote size={28}/></div>{a.map(x => <Reveal className="testimonial" key={x.id}><div className="stars">{Array.from({ length: x.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor"/>)}</div><p>“{x.text}”</p></Reveal>)}</div></section>; }
function ContractForm() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      console.info('Solicitação de contratação pronta para integração:', data);
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="contract-form" onSubmit={handleSubmit}>
      <div className="form-step">
        <span>01</span>
        <label>
          Qual é o seu evento?
          <select name="eventType" defaultValue="Casamento">
            <option>Casamento</option>
            <option>Aniversário</option>
            <option>Bar / Restaurante</option>
            <option>Corporativo</option>
            <option>Festa particular</option>
          </select>
        </label>
      </div>

      <div className="form-grid">
        {[
          ['name', 'Nome', 'Como podemos chamar você?'],
          ['whatsapp', 'WhatsApp', '(11) 99999-9999'],
          ['email', 'E-mail', 'voce@email.com'],
        ].map(([name, label, placeholder]) => (
          <div className="form-field" key={name}>
            <label>
              {label}
              <input name={name} placeholder={placeholder} required={name !== 'email'} />
            </label>
          </div>
        ))}

        <div className="form-field">
          <label>
            Data
            <input name="date" type="date" required />
          </label>
        </div>

        <div className="form-field">
          <label>
            Horário aproximado
            <input name="time" type="time" required />
          </label>
        </div>

        <div className="form-field">
          <label>
            Cidade
            <input name="city" placeholder="São Paulo - SP" required />
          </label>
        </div>
      </div>

      <div className="form-field">
        <label>
          Conte um pouco do evento
          <textarea name="message" rows="3" placeholder="Local, público estimado, observações..." />
        </label>
      </div>

      <label className="consent">
        <input name="consent" type="checkbox" value="accepted" required />
        <span>Estou ciente de que os dados informados serão usados para atendimento da solicitação e compartilhados apenas com a equipe necessária.</span>
      </label>

      <button className="form-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Enviar solicitação'}
        <ArrowUpRight size={18} />
      </button>

      {status === 'success' && <p className="form-feedback form-feedback--success">Solicitação registrada. A equipe poderá entrar em contato pelo WhatsApp.</p>}
      {status === 'error' && <p className="form-feedback form-feedback--error">Não foi possível enviar agora. Tente novamente em instantes.</p>}
    </form>
  );
}

function Contract() {
  return (
    <section id="contrate" className="section contract-section">
      <div className="shell contract-card">
        <div className="contract-copy">
          <span className="eyebrow">CONTRATAÇÃO</span>
          <h2>Vamos fazer essa noite <em>acontecer?</em></h2>
          <p>Conte sobre o evento. A solicitação chega organizada para a equipe e o contato segue pelo WhatsApp.</p>
          <LiquidButton href="https://wa.me/5511999999999">Falar pelo WhatsApp</LiquidButton>
        </div>
        <ContractForm />
      </div>
    </section>
  );
}

export default function Home() {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const handleInternalNavigation = (event) => {
      const anchor = event.target.closest('a[href^="#"]');

      if (!anchor || anchor.closest('.public-header') || anchor.classList.contains('liquid-button')) {
        return;
      }

      const hash = anchor.getAttribute('href');

      if (!hash || hash === '#') {
        return;
      }

      if (!document.getElementById(hash.slice(1))) {
        return;
      }

      event.preventDefault();
      smoothScrollToId(hash, 1800);
    };

    document.addEventListener('click', handleInternalNavigation);

    return () => {
      document.removeEventListener('click', handleInternalNavigation);
    };
  }, []);

  return <><PublicHeader /><main><Hero /><Show /><History /><Agenda /><Live /><Repertoire /><Moments /><Why /><Testimonials /><section className="section backstage-section"><div className="shell backstage"><img src="/images/bastidores.jpg" alt="Bastidores"/><div><span className="eyebrow">ANTES DO PALCO</span><h2>Tem história também <em>fora dele.</em></h2><p>Uma área preparada para bastidores, estrada e momentos espontâneos.</p></div></div></section><Contract /></main><footer className="footer"><div className="shell footer__inner"><Logo /><div><a href="/privacidade">Privacidade</a><a href="/direitos">Direitos do titular</a></div><span>© 2026 Jean Rezende & Rodrigo</span></div></footer><WhatsAppFloat />
      <ChatbotFloat /></>; }
