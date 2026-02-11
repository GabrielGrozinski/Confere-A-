import { HashRouter, Route, Routes } from "react-router-dom";

import PaginaInicial from "./pages/pagina-inicial";
import SaoPaulo from "./pages/site_dos_clubes/sao-paulo";
import Palmeiras from "./pages/site_dos_clubes/palmeiras";
import Santos from "./pages/site_dos_clubes/santos";
import Corinthians from "./pages/site_dos_clubes/corinthians";
import Mirassol from "./pages/site_dos_clubes/mirassol";
import Bragantino from "./pages/site_dos_clubes/bragantino";
import Fluminense from "./pages/site_dos_clubes/fluminense";
import Flamengo from "./pages/site_dos_clubes/flamengo";
import Vasco from "./pages/site_dos_clubes/vasco";
import Botafogo from "./pages/site_dos_clubes/botafogo";
import Gremio from "./pages/site_dos_clubes/gremio";
import Internacional from "./pages/site_dos_clubes/internacional";
import Cruzeiro from "./pages/site_dos_clubes/cruzeiro";
import AtleticoMineiro from "./pages/site_dos_clubes/atletico-mineiro";
import Juventude from "./pages/site_dos_clubes/juventude";
import Fortaleza from "./pages/site_dos_clubes/fortaleza";
import Ceara from "./pages/site_dos_clubes/ceara";
import Vitoria from "./pages/site_dos_clubes/vitoria";
import Sport from "./pages/site_dos_clubes/sport";
import Bahia from "./pages/site_dos_clubes/bahia";
import CompararCoisas from "./pages/comparar-coisas";
import ComparadorDeClubes from "./pages/comparador-de-clubes";
import Produtos from "./pages/produtos";


export default function Rotas() {
    return (
        <HashRouter>
            <Routes>
                <Route path="" element={<PaginaInicial/>} />
                <Route path="comparador-de-coisas" element={<CompararCoisas/>} />
                <Route path="comparador-de-clubes" element={<ComparadorDeClubes/>} />
                <Route path="produtos" element={<Produtos/>} />
                <Route path="sao-paulo" element={<SaoPaulo/>} />
                <Route path="palmeiras" element={<Palmeiras/>} />
                <Route path="santos" element={<Santos/>} />
                <Route path="corinthians" element={<Corinthians/>} />
                <Route path="mirassol" element={<Mirassol/>} />
                <Route path="bragantino" element={<Bragantino/>} />
                <Route path="fluminense" element={<Fluminense/>} />
                <Route path="flamengo" element={<Flamengo/>} />
                <Route path="vasco" element={<Vasco/>} />
                <Route path="botafogo" element={<Botafogo/>} />
                <Route path="gremio" element={<Gremio/>} />
                <Route path="internacional" element={<Internacional/>} />
                <Route path="cruzeiro" element={<Cruzeiro/>} />
                <Route path="atletico-mineiro" element={<AtleticoMineiro/>} />
                <Route path="juventude" element={<Juventude/>} />
                <Route path="fortaleza" element={<Fortaleza/>} />
                <Route path="ceara" element={<Ceara/>} />
                <Route path="vitoria" element={<Vitoria/>} />
                <Route path="sport" element={<Sport/>} />
                <Route path="bahia" element={<Bahia/>} />
            </Routes>
        </HashRouter>
    );
}