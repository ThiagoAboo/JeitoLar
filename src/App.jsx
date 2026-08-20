import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RegionProvider } from "./context/RegionContext";
import SiteLayout from "./components/SiteLayout";
import HomePage from "./pages/HomePage";
import QuotePage from "./pages/QuotePage";
import LocationPage from "./pages/LocationPage";
import ServiceGroupPage from "./pages/ServiceGroupPage";
import InstallPage from "./pages/InstallPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

export default function App() {
  return <RegionProvider><BrowserRouter><Routes><Route element={<SiteLayout />}>
    <Route index element={<HomePage />} />
    <Route path="orcamento/" element={<QuotePage />} />
    <Route path="instalar/" element={<InstallPage />} />
    <Route path="sao-goncalo/" element={<LocationPage locationKey="sao-goncalo" />} />
    <Route path="niteroi/" element={<LocationPage locationKey="niteroi" />} />
    <Route path="marica/" element={<LocationPage locationKey="marica" />} />
    <Route path="itaborai/" element={<LocationPage locationKey="itaborai" />} />
    <Route path="rio-de-janeiro/centro/" element={<LocationPage locationKey="centro-rio" />} />
    <Route path="rio-de-janeiro/zona-sul/" element={<LocationPage locationKey="zona-sul-rio" />} />

    <Route path="servicos/eletrica/" element={<ServiceGroupPage groupKey="eletrica" />} />
    <Route path="servicos/hidraulica/" element={<ServiceGroupPage groupKey="hidraulica" />} />
    <Route path="servicos/instalacoes/" element={<ServiceGroupPage groupKey="instalacoes" />} />
    <Route path="servicos/montagem/" element={<ServiceGroupPage groupKey="montagem" />} />
    <Route path="servicos/pequenos-reparos/" element={<ServiceGroupPage groupKey="pequenos-reparos" />} />
    <Route path="servicos/jardim-quintal/" element={<ServiceGroupPage groupKey="jardim-quintal" />} />
    <Route path="servicos/piscina/" element={<ServiceGroupPage groupKey="piscina" />} />

    <Route path="servicos/instalacao-chuveiro/" element={<Navigate to="/servicos/eletrica/" replace />} />
    <Route path="servicos/instalacao-ventilador/" element={<Navigate to="/servicos/eletrica/" replace />} />
    <Route path="servicos/suporte-tv/" element={<Navigate to="/servicos/instalacoes/" replace />} />
    <Route path="servicos/prateleiras-cortinas/" element={<Navigate to="/servicos/instalacoes/" replace />} />
    <Route path="servicos/montagem-moveis/" element={<Navigate to="/servicos/montagem/" replace />} />
    <Route path="servicos/reparos-hidraulicos/" element={<Navigate to="/servicos/hidraulica/" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route></Routes></BrowserRouter></RegionProvider>;
}
