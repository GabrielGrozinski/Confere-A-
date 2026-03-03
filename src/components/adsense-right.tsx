import adsense from '/adsense.png';
import { allContext } from '../context/all-context';


export default function AdsenseRight() {
    const {assinanteAtual} = allContext();

    return (
        <>
        {assinanteAtual !== '' ?
        <span className='min-w-2 max-w-2 sticky left-0 top-25 hidden lg:flex'></span>
        :
        <div className="lg:flex justify-end hidden sticky left-0 top-25 self-start">
            <img className="max-w-[90%]" src={adsense} alt="" />
        </div>
        }
        </>
    )
}
