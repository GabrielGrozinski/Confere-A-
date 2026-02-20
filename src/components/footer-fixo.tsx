export default function FooterFixo() {
    return (
        <footer className="relative bg-[#060911] border-t border-white/4">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

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
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
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

                        <div className="flex items-center gap-3">

                            <a href="#" className="w-9 h-9 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/12 transition-all duration-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-twitter w-4 h-4"
                                    aria-hidden="true"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </a>

                            <a href="#" className="w-9 h-9 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/12 transition-all duration-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-github w-4 h-4"
                                    aria-hidden="true"
                                >
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                                </svg>
                            </a>

                            <a href="#" className="w-9 h-9 rounded-lg bg-white/4 border border-white/6 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/12 transition-all duration-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="lucide lucide-mail w-4 h-4"
                                    aria-hidden="true"
                                >
                                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                </svg>
                            </a>

                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-slate-200/80 mb-5 uppercase tracking-wide">Análises</h4>
                        <ul className="space-y-3">
                            <li><a href="#revenue" className="text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Faturamento</a></li>
                            <li><a href="#debt" className="text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Dívidas</a></li>
                            <li><a href="#cost" className="text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Custo da Vitória</a></li>
                            <li><a href="#compare" className="text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Comparar Clubes</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-slate-200/80 mb-5 uppercase tracking-wide">Clubes</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Série A</a></li>
                            <li><a href="#" className="text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Série B</a></li>
                            <li><a href="#" className="text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Ranking</a></li>
                            <li><a href="#" className="text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Histórico</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-slate-200/80 mb-5 uppercase tracking-wide">Sobre</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Metodologia</a></li>
                            <li><a href="#" className="text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Fontes dos Dados</a></li>
                            <li><a href="#" className="text-sm text-white/45 hover:text-white/60 transition-colors duration-200">Contato</a></li>
                            <li><a href="#" className="text-sm text-white/45 hover:text-white/60 transition-colors duration-200">FAQ</a></li>
                        </ul>
                    </div>

                </div>

                <div data-orientation="horizontal" role="none" className="shrink-0 h-px w-full my-10 bg-white/4"></div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/20">
                        © 2026 Confere Aê. Todos os direitos reservados.
                    </p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Termos de Uso</a>
                        <a href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Privacidade</a>
                        <a href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Cookies</a>
                    </div>
                </div>

            </div>
        </footer>
    )
}