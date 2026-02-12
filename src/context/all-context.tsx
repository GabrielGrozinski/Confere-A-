import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../auth/supabase-client";
import type { User, Session } from "@supabase/supabase-js";


interface Props {
    children: ReactNode
}

interface data {
    user: User | null;
    session: Session | null;
}

interface dataGoogle {
    provider: string;
    url: string | null;
}

interface promise_type {
    success: boolean;
    data: data | dataGoogle;
    error?: any;
}

type TopicoAtivoType = 'Explorar Dados' | 'Produto' | 'Preço';


interface all_context_type {
    mostrarCard: boolean;
    setMostrarCard: (value: boolean) => void;
    dark: boolean;
    setDark: (value: boolean) => void;
    topicoAtivo: TopicoAtivoType;
    setTopicoAtivo: (value: TopicoAtivoType) => void;
    menuAberto: boolean;
    setMenuAberto: (value: boolean) => void;
    loadingAuth: boolean;
    setLoadingAuth: (value: boolean) => void;
    session: Session | undefined;
    setSession: (value: Session | undefined) => void;
    user: User | undefined;
    setUser: (value: User | undefined) => void;
    cadastroUser: (email: string, password: string) => Promise<promise_type>;
    loginUser: (email: string, password: string) => Promise<promise_type>;
    loginGoogle: () => Promise<promise_type>;
    deslogarUser: () => void;
    largura: number;
}

export const all_context = createContext<all_context_type>({} as all_context_type);

export function AllContext({children}: Props) {
    const [dark, setDark] = useState<boolean>(() => localStorage.getItem("tema") === "escuro");
    const [topicoAtivo, setTopicoAtivo] = useState<'Explorar Dados' | 'Produto' | 'Preço'>('Explorar Dados');
    const [menuAberto, setMenuAberto] = useState<boolean>(false);
    const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
    const [session, setSession] = useState<Session | undefined>(undefined)
    const [user, setUser] = useState<User | undefined>(undefined);
    const [mostrarCard, setMostrarCard] = useState<boolean>(false);
    const [largura, setLargura] = useState(window.innerWidth);


    const cadastroUser = async (email: string, password: string) => {
        try {  
            const {data, error} = await supabase.auth.signUp({
                email,
                password
            });

            if (error) {
                console.error("Houve um erro ao cadastrar o usuário", error);
                return {data, error, success: false}
            }

            return {data, success: true};

        } catch (error) {
            console.error("Houve um erro", error);
            return {success: false, data: {user: null, session: null}}
        }
    }
    // Criar usuário.

    const loginUser = async (email: string, password: string) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                console.error("Houve um erro na hora de autenticar o usuário", error);
                return {success: false, error, data};
            }

            return {success: true, data};

        } catch (error) {
            console.error("Houve um erro", error);
            return {success: false, data: {user: null, session: null}}
        }
    }
    // Logar usuário.

    const loginGoogle = async () => {
        try {
            
            const {data, error} = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: ""
                }
            });
            
            if (error) {
                console.error("Houve um erro ao logar com google", error);
                return {success: false, error, data};
            }

            return {success: true, data: {provider: "google", url: data.url}};

        } catch (error) {
            console.error("Houve um erro", error); 
            return {success: false, error: null, data: {provider: "google", url: null}};
        }
    }
    // Login google.

    const deslogarUser = async () => {
        try {            
            const {error} = await supabase.auth.signOut();
            if (error) {
                console.error("Houve um erro ao deslogar o usuário", error);
            }
        } catch (error) {
            console.error("Houve um erro", error);
        }
    }
    // Deslogar usuário.

    useEffect(() => {
        const ajustarLargura = () => setLargura(window.innerWidth);
        window.addEventListener("resize", ajustarLargura);

        supabase.auth.getSession()
        .then(( {data: { session } }) => setSession(session ?? undefined))
        .catch(( {error} ) => console.error("Houve um erro ao buscar a sessão", error))
        .finally(() => setLoadingAuth(false));

        supabase.auth.getUser()
        .then(( {data: { user } }) => setUser(user ?? undefined))
        .catch(( { error } ) => console.error("Houve um erro ao buscar o usuário", error))
        .finally(() => setLoadingAuth(false));

        const {data: {subscription}} = 
            supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session ?? undefined);
                if (session) setUser(session.user)
            });

        return () => {
            subscription.unsubscribe();
            window.removeEventListener("resize", ajustarLargura);
        }
    }, []);
    // Buscando sessão e usuário.

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("tema", dark ? "escuro" : "claro");
    }, [dark]);

    return (
        <all_context.Provider
            value={{
                dark,
                setDark,
                cadastroUser,
                loginUser,
                loginGoogle,
                deslogarUser,
                loadingAuth,
                session,
                user,
                setLoadingAuth,
                setSession,
                setUser,
                largura,
                topicoAtivo,
                setTopicoAtivo,
                menuAberto,
                setMenuAberto,
                mostrarCard, 
                setMostrarCard
            }}
        >
            {children}
        </all_context.Provider>
    )
}

export const allContext = () => {
    return useContext(all_context);
}
