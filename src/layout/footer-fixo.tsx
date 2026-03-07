import { useNavigate } from "react-router-dom"
import { allContext } from "../context/all-context";



export default function FooterFixo() {
    const navigate = useNavigate();
    const {setMostrarClubes, largura} = allContext();


    const handleNavegar = (rota: string) => {
        const url = `${window.location.origin}/#/${rota}`;
        window.open(url, "_blank", "noopener,noreferrer");
    }

    return (
        <footer className="relative bg-[#060911] -mt-1">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20">

                <div className={`grid grid-cols-1 ${(largura >= 820 && largura < 1024) && 'grid-cols-[35%_1fr]'} lg:grid-cols-5 gap-12 lg:gap-8`}>

                    <div className="lg:col-span-2">

                        <a href="/" className="flex items-center gap-3 mb-5">
                            <div className="w-9 h-9 rounded-lg bg-linear-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/20 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-chart-column w-5 h-5 text-amber-400"
                                    aria-hidden="true"
                                >
                                    <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                                    <path d="M18 17V9"></path>
                                    <path d="M13 17V5"></path>
                                    <path d="M8 17v-3"></path>
                                </svg>
                            </div>

                            <span className="text-lg font-semibold text-white tracking-tight">
                                Confere<span className="text-amber-400"> Aê</span>
                            </span>
                        </a>

                        <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mb-6">
                            A plataforma mais completa de análise financeira do futebol brasileiro.
                            Dados transparentes para decisões inteligentes.
                        </p>

                    </div>

                    {largura >= 820 && largura < 1024 ?
                    <div className="flex justify-between">
                        <div className="">
                            <h4 className="text-sm font-medium text-slate-200/80 mb-5 uppercase tracking-wide">Análises</h4>
                            <ul className="space-y-3">

                                <li onClick={() => {
                                    navigate('/produtos');
                                    setMostrarClubes(true);
                                    }}
                                    ><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Análise Individual</a>
                                </li>

                                <li onClick={() => navigate('/clube-vs-clube')}><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Clube VS Clube</a></li>

                                <li onClick={() => navigate('/clube-vs-mundo')}><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Clube VS Mundo</a></li>

                                <li onClick={() => navigate('/comparador-de-clubes')}><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Comparação Geral</a></li>
                            </ul>
                        </div>

                        <div className="">
                            <h4 className="text-sm font-medium text-slate-200/80 mb-5 uppercase tracking-wide">Sobre</h4>
                            <ul className="space-y-3">
                                <li onClick={() => handleNavegar('metodologia')}><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Metodologia</a></li>

                                <li><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Fontes dos Dados</a></li>

                                <li><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Preço</a></li>
                                
                                <li><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">FAQ</a></li>
                            </ul>
                        </div>

                        <div className="">
                            <h4 className="text-sm font-medium text-slate-200/80 mb-5 uppercase tracking-wide">Contato</h4>
                            <ul className="space-y-3">
                                <li className="flex justify-start items-center" onClick={() => handleNavegar('metodologia')}>
                                    <i className="fa-brands fa-square-instagram text-3xl -ml-1.25 text-neutral-200 cursor-pointer hover:text-neutral-300 transition-colors duration-200"></i>

                                    <i className="fa-brands fa-square-x-twitter text-3xl text-neutral-200 cursor-pointer hover:text-neutral-300 transition-colors duration-200"></i>

                                    <i className="fa-brands fa-square-facebook text-3xl text-neutral-200 cursor-pointer hover:text-neutral-300 transition-colors duration-200"></i>
                                </li>
                                
                                <li><a className="cursor-text text-sm text-white/45 hover:text-white/60 transition-colors duration-200">contato@confereae.com</a></li>
                            </ul>
                        </div>
                    </div>
                    :
                    <>
                    <div className="">
                        <h4 className="text-sm font-medium text-slate-200/80 mb-5 uppercase tracking-wide">Análises</h4>
                        <ul className="space-y-3">

                            <li onClick={() => {
                                navigate('/produtos');
                                setMostrarClubes(true);
                                }}
                                ><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Análise Individual</a>
                            </li>

                            <li onClick={() => navigate('/clube-vs-clube')}><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Clube VS Clube</a></li>

                            <li onClick={() => navigate('/clube-vs-mundo')}><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Clube VS Mundo</a></li>

                            <li onClick={() => navigate('/comparador-de-clubes')}><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Comparação Geral</a></li>
                        </ul>
                    </div>

                    <div className="">
                        <h4 className="text-sm font-medium text-slate-200/80 mb-5 uppercase tracking-wide">Sobre</h4>
                        <ul className="space-y-3">
                            <li onClick={() => handleNavegar('metodologia')}><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Metodologia</a></li>

                            <li><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Fontes dos Dados</a></li>

                            <li><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Preço</a></li>
                            
                            <li><a className="cursor-pointer text-sm text-white/45 hover:text-white/60 transition-colors duration-200">FAQ</a></li>
                        </ul>
                    </div>

                    <div className="">
                        <h4 className="text-sm font-medium text-slate-200/80 mb-5 uppercase tracking-wide">Contato</h4>
                        <ul className="space-y-3">
                            <li><a className="cursor-text text-sm text-white/45 hover:text-white/60 transition-colors duration-200">contato@confereae.com</a></li>
                        </ul>
                    </div>
                    </>
                    }

                </div>

                <div data-orientation="horizontal" role="none" className="shrink-0 h-px w-full my-10 bg-white/4"></div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/20">
                        © 2026 Confere Aê. Todos os direitos reservados.
                    </p>

                    <div className="flex items-center gap-6">
                        <a onClick={() => handleNavegar('termos-de-uso')} className="text-xs text-white/20 hover:text-white/40 transition-colors cursor-pointer">Termos de Uso</a>
                        <a onClick={() => handleNavegar('politica-de-privacidade')} className="text-xs text-white/20 hover:text-white/40 transition-colors cursor-pointer">Privacidade</a>
                    </div>
                </div>

            </div>
        </footer>
    )
}