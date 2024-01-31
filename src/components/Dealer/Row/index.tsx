const Row = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <div className="w-100% flex flex-wrap">
                {children}
            </div>
        </>
    )
}

export default Row;