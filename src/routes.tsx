import { HashRouter, Route, Routes } from "react-router-dom";

import PaginaInicial from "./pages/pagina-inicial";
import SaoPaulo from "./pages/site_dos_clubes/sao-paulo";
import Palmeiras from "./pages/site_dos_clubes/palmeiras";
import Santos from "./pages/site_dos_clubes/santos";
import Corinthians from "./pages/site_dos_clubes/corinthians";
import Mirassol from "./pages/site_dos_clubes/mirassol";
import Bragantino from "./pages/site_dos_clubes/bragantino";
import Fluminense from "./pages/site_dos_clubes/fluminense";

export default function Rotas() {
    return (
        <HashRouter>
            <Routes>
                <Route path="" element={<PaginaInicial/>} />
                <Route path="sao-paulo" element={<SaoPaulo/>} />
                <Route path="palmeiras" element={<Palmeiras/>} />
                <Route path="santos" element={<Santos/>} />
                <Route path="corinthians" element={<Corinthians/>} />
                <Route path="mirassol" element={<Mirassol/>} />
                <Route path="bragantino" element={<Bragantino/>} />
                <Route path="fluminense" element={<Fluminense/>} />
            </Routes>
        </HashRouter>
    );
}