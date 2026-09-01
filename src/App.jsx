import { Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import { PrivateLayout } from './layouts/PrivateLayout';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import HistoryManager from './pages/owner/HistoryManager';
import UserManager from './pages/owner/UserManager';
import SupportManager from './pages/owner/SupportManager';
import GenericManager from './pages/owner/GenericManager';
import ArtistDashboard from './pages/artist/ArtistDashboard';
import ArtistSupport from './pages/artist/ArtistSupport';
import Privacy from './pages/system/Privacy';
export default function App() { return <Routes><Route path="/" element={<Home />}/><Route path="/privacidade" element={<Privacy />}/><Route path="/direitos" element={<Privacy rights/>}/><Route path="/gestao" element={<PrivateLayout><OwnerDashboard /></PrivateLayout>}/><Route path="/gestao/historia" element={<PrivateLayout><HistoryManager /></PrivateLayout>}/><Route path="/gestao/usuarios" element={<PrivateLayout><UserManager /></PrivateLayout>}/><Route path="/gestao/suporte" element={<PrivateLayout><SupportManager /></PrivateLayout>}/><Route path="/gestao/:module" element={<PrivateLayout><GenericManager /></PrivateLayout>}/><Route path="/artista" element={<PrivateLayout role="artist"><ArtistDashboard /></PrivateLayout>}/><Route path="/artista/suporte" element={<PrivateLayout role="artist"><ArtistSupport /></PrivateLayout>}/><Route path="/artista/:module" element={<PrivateLayout role="artist"><GenericManager title="Área do artista" eyebrow="MEU ESPAÇO"/></PrivateLayout>}/><Route path="*" element={<Home />}/></Routes>; }
