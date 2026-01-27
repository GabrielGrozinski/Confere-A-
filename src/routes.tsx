import { HashRouter, Route, Routes } from "react-router-dom";

import PaginaInicial from "./pages/pagina-inicial";

export default function Rotas() {
    return (
        <HashRouter>
            <Routes>
                <Route path="" element={<PaginaInicial/>} />
            </Routes>
        </HashRouter>
    );
}