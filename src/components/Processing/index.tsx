interface PropsProcessing {
    color?: string;
}

const Processing = ({ color }: PropsProcessing) => {
    return (
        <div className={`relative w-4 h-4 ml-2`}>
            <div className={`w-4 h-4 rounded-full absolute border-2 border-solid ${color ?? 'border-gray-200'}`}></div>
            <div className={`w-4 h-4 rounded-full animate-spin absolute border-2 border-solid border-white border-t-transparent shadow-profile`}></div>
        </div>
    )
}

export default Processing;