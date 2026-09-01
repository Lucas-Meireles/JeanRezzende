import { useState } from 'react';
import { Bot, LoaderCircle, Send, Sparkles, X } from 'lucide-react';

const welcome = {
  role: 'assistant',
  content: 'Posso ajudar com contratação, agenda, repertório e informações sobre a dupla.',
};

export function ChatbotFloat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([welcome]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const message = input.trim();

    if (!message || loading) {
      return;
    }

    setInput('');
    setMessages((current) => [...current, { role: 'user', content: message }]);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 650));

      const normalized = message.toLowerCase();
      let reply = 'Posso ajudar com contratação, agenda, repertório e informações sobre a dupla.';

      if (normalized.includes('contrat') || normalized.includes('orçamento')) {
        reply = 'Claro. Para solicitar uma contratação, use o formulário da seção Contrate ou fale diretamente com a equipe pelo WhatsApp.';
      } else if (normalized.includes('agenda') || normalized.includes('show') || normalized.includes('data')) {
        reply = 'Você pode consultar os próximos palcos na seção Agenda. A disponibilidade para novas datas será confirmada pela equipe.';
      } else if (normalized.includes('repertório') || normalized.includes('musica') || normalized.includes('música')) {
        reply = 'O repertório combina sertanejo, modão, romântico e músicas para festa, adaptado ao perfil de cada evento.';
      } else if (normalized.includes('whatsapp') || normalized.includes('contato')) {
        reply = 'Você pode falar diretamente com a equipe pelo botão de WhatsApp disponível no site.';
      }

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: reply,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: 'No momento estou em modo de demonstração. Você pode falar com a equipe pelo WhatsApp para um atendimento direto.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chatbot-float ${open ? 'chatbot-float--open' : ''}`}>
      {open && (
        <section className="chatbot-panel" aria-label="Assistente da dupla">
          <header className="chatbot-header">
            <div>
              <span className="chatbot-header__icon"><Sparkles size={15} /></span>
              <div>
                <strong>Assistente da dupla</strong>
                <small>Atendimento inteligente</small>
              </div>
            </div>
            <button type="button" className="chatbot-close" onClick={() => setOpen(false)} aria-label="Fechar assistente">
              <X size={18} />
            </button>
          </header>

          <div className="chatbot-messages">
            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`chatbot-message chatbot-message--${item.role}`}>
                {item.role === 'assistant' && <Bot size={15} />}
                <span>{item.content}</span>
              </div>
            ))}
            {loading && (
              <div className="chatbot-message chatbot-message--assistant">
                <LoaderCircle className="chatbot-loading" size={15} />
                <span>Consultando...</span>
              </div>
            )}
          </div>

          <form className="chatbot-form" onSubmit={sendMessage}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Escreva sua pergunta..." aria-label="Mensagem" />
            <button type="submit" aria-label="Enviar mensagem" disabled={loading || !input.trim()}>
              <Send size={16} />
            </button>
          </form>
        </section>
      )}

      <button type="button" className="chatbot-orb" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Fechar assistente' : 'Abrir assistente'}>
        {open ? <X size={21} /> : <Bot size={22} />}
      </button>
    </div>
  );
}
