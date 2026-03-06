import { allContext } from "../context/all-context";
import HeaderFixo from "../components/header-fixo";
import FooterFixo from "../components/footer-fixo";
import { useEffect } from "react";


interface Props {
    children: React.ReactNode
}


export default function RotaPadrao({children}: Props) {
    const {menuAberto, setMenuAberto, loadingAssinante, loadingSession, loadingUser, loadingFunction} = allContext();

    useEffect(() => {
        setMenuAberto(false)
    }, []);

    if (loadingAssinante || loadingSession || loadingUser || loadingFunction) return;

    return (
        <>
        {menuAberto ?
            <div>
                <HeaderFixo />


                {children}
                <FooterFixo />

                <div className="inset-0 fixed backdrop-blur-xs bg-black/60 min-h-screen">

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