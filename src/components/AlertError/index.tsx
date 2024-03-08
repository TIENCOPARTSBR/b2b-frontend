import Image from "next/image";

type Props = {
    text: string;
}

const AlertError = (props: Props) => {
    return (
        <div className='top-20px right-20px z-10 h-200px w-min-280px fixed z-40'>
            <div className={`${props.text ? 'visible' : 'invisible'} w-auto p-15px bg-white rounded-8px border-l-4 border-red_one text-red_one text-13px font-inter flex flex-row items-center mb-5 z-10 shadow-alert_error sticky`}>
                <Image
                        src="/icon/icon-error-red.svg"
                        alt="Icon"
                        width="24"
                        height="24"
                        className="mr-3"
                    />
                <div dangerouslySetInnerHTML={{ __html: props.text }} />
            </div>
        </div>
    )
}

export default AlertError;