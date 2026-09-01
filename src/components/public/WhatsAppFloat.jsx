import { MessageCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function WhatsAppFloat() {
  const whatsapp = useAppStore((state) => state.site.whatsapp);

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle
        size={24}
        strokeWidth={2.2}
      />

      <span>Falar com a dupla</span>
    </a>
  );
}