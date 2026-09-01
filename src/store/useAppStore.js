import { create } from 'zustand';
const historyDefault = [
    { id: 'h1', year: '2022', title: 'Primeiros passos', text: 'Os primeiros palcos marcaram o encontro entre voz, repertório e a vontade de transformar cada apresentação em uma experiência para o público.', image: '/images/praia-acustico.jpg', visible: true },
    { id: 'h2', year: '2023', title: 'A dupla ganha forma', text: 'A dupla ganhou ritmo, presença e identidade, levando o sertanejo para festas, eventos e noites em que o público participa do começo ao fim.', image: '/images/show-publico.jpg', visible: true },
    { id: 'h3', year: '2024', title: 'Novos palcos', text: 'Novos palcos abriram espaço para uma proposta cada vez mais profissional, próxima do público e preparada para diferentes formatos de evento.', image: '/images/casa-de-show.jpg', visible: true }
];
const showsDefault = [
    { id: 's1', date: '2026-09-05', time: '21:30', title: 'Noite Sertaneja', city: 'São Paulo', state: 'SP', private: false, visible: true },
    { id: 's2', date: '2026-09-19', time: '22:00', title: 'Festa Particular', city: 'Ferraz de Vasconcelos', state: 'SP', private: true, visible: true }
];
const testimonialsDefault = [
    { id: 't1', rating: 5, text: 'A festa inteira cantou junto. O repertório e a energia foram incríveis.', visible: true },
    { id: 't2', rating: 5, text: 'A dupla trouxe exatamente o clima que a nossa noite precisava.', visible: true },
    { id: 't3', rating: 5, text: 'Profissionais, animados e muito fáceis de trabalhar.', visible: true }
];
const usersDefault = [
    { id: 'u1', name: 'Lucas', email: 'owner@jeanerodrigo.com', role: 'owner', status: 'active' },
    { id: 'u2', name: 'Admin', email: 'admin@jeanerodrigo.com', role: 'admin', status: 'active' },
    { id: 'u3', name: 'Jean', email: 'jean@jeanerodrigo.com', role: 'artist', status: 'active' },
    { id: 'u4', name: 'Rodrigo', email: 'rodrigo@jeanerodrigo.com', role: 'artist', status: 'active' }
];
const ticketsDefault = [{ id: 'CH-001', subject: 'Atualização de flyer', category: 'Flyer', priority: 'Média', status: 'Em atendimento', requester: 'Jean', messages: [{ from: 'artist', text: 'Preciso revisar o flyer do próximo show.' }, { from: 'owner', text: 'Claro. Vou revisar e devolver a arte por aqui.' }] }];
export const useAppStore = create((set) => ({
    theme: 'dark', history: historyDefault, shows: showsDefault, testimonials: testimonialsDefault, users: usersDefault, tickets: ticketsDefault,
    site: { slogan: 'Tem música que toca. Tem música que acontece.', whatsapp: '5511999999999' },
    setTheme: (theme) => set({ theme }), updateSite: (patch) => set(s => ({ site: { ...s.site, ...patch } })),
    addHistory: (item) => set(s => ({ history: [...s.history, item] })),
    updateHistory: (id, patch) => set(s => ({ history: s.history.map(x => x.id === id ? { ...x, ...patch } : x) })),
    toggleHistory: (id) => set(s => ({ history: s.history.map(x => x.id === id ? { ...x, visible: !x.visible } : x) })),
    addTicket: (ticket) => set(s => ({ tickets: [ticket, ...s.tickets] })),
    replyTicket: (id, message) => set(s => ({ tickets: s.tickets.map(x => x.id === id ? { ...x, messages: [...x.messages, message], status: 'Em atendimento' } : x) })),
    updateUser: (id, patch) => set(s => ({ users: s.users.map(x => x.id === id ? { ...x, ...patch } : x) })),
    toggleTestimonial: (id) => set(s => ({ testimonials: s.testimonials.map(x => x.id === id ? { ...x, visible: !x.visible } : x) }))
}));
