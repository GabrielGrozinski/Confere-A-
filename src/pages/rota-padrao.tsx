import { allContext } from "../context/all-context";
import HeaderFixo from "../components/header-fixo";
import FooterFixo from "../components/footer-fixo";
import { useEffect, useState } from "react";


interface Props {
    children: React.ReactNode
}


export default function RotaPadrao({children}: Props) {
    const {menuAberto, setMenuAberto, loadingAssinante, loadingSession, loadingUser, loadingFunction} = allContext();
    const [loadingGeral, setLoadingGeral] = useState(true);

    useEffect(() => {
        setMenuAberto(false);
        if (loadingAssinante || loadingFunction || loadingSession || loadingUser) {
            setLoadingGeral(true);
        } else {
            setLoadingGeral(false);
        }
    }, []);

    if (loadingGeral) return;

    return (
        <>
        {menuAberto ?
            <div>
                <HeaderFixo />


                {children}
                <FooterFixo />

                <div onClick={() => setMenuAberto(false)} className="inset-0 fixed backdrop-blur-xs bg-black/60 min-h-screen">

                </div>

            </div>
        :
            <div>
            <HeaderFixo />
            {children}
            <FooterFixo />
            </div>
        }
        </>
    )
}