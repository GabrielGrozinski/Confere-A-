import adsense from '/adsense.png';


export default function AdsenseLeft() {
    
    return (
        <div className="lg:flex justify-start hidden sticky left-0 top-25 self-start">
            <img className="max-w-[90%]" src={adsense} alt="" />
        </div>
    )
}
