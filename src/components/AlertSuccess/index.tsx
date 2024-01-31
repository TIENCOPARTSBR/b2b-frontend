import Image from "next/image";

type Props = {
    text: string;
}

const AlertSuccess = (props: Props) => {
    return (
        <div className='top-20px right-20px z-10 h-200px w-280px fixed z-40'>
            <div className={`${props.text ? 'visible' : 'invisible'} w-auto p-15px bg-green_one rounded-8px text-white text-14px font-normal font-inter flex flex-row items-center mb-5 z-10 shadow-alert_error`}>
                <Image
                        src="/icon/icon-success-green.svg"
                        alt="Icon"
                        width="24"
                        height="24"
                        className="mr-3"
                    />
                {props.text}
            </div>
        </div>
    )
}

export default AlertSuccess;