import { MessageCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function WhatsAppFloat() {
  const whatsapp = useAppStore((state) => state.site.whatsapp);

  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/5511939397691?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20dupla."
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