import { HashRouter, Route, Routes } from "react-router-dom";

import PaginaInicial from "./pages/pagina-inicial";
import SaoPaulo from "./pages/site_dos_clubes/sao-paulo";

export default function Rotas() {
    return (
        <HashRouter>
            <Routes>
                <Route path="" element={<PaginaInicial/>} />
                <Route path="sao-paulo" element={<SaoPaulo/>} />
            </Routes>
        </HashRouter>
    );
}