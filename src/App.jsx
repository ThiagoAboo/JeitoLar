import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import HomePage from "./pages/HomePage";
import LocationPage from "./pages/LocationPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="sao-goncalo/" element={<LocationPage locationKey="sao-goncalo" />} />
          <Route path="niteroi/" element={<LocationPage locationKey="niteroi" />} />
          <Route path="marica/" element={<LocationPage locationKey="marica" />} />
          <Route path="itaborai/" element={<LocationPage locationKey="itaborai" />} />
          <Route path="rio-de-janeiro/centro/" element={<LocationPage locationKey="centro-rio" />} />
          <Route path="rio-de-janeiro/zona-sul/" element={<LocationPage locationKey="zona-sul-rio" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
