import Link from 'next/link'
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="bg-white w-screen h-screen flex flex-col items-center justify-center min-h-1000 px-3 lg:px-0">
            <Image
                src="/logo-enco.svg"
                alt="Encoparts"
                width="120"
                height="50"
                className="sm:mx-2 sm:w-auto"
            />

            <Image
                src="/404.svg"
                alt="Not found"
                width="575"
                height="468"
                className="w-auto object-contain"
            />
        </div>
    )
}