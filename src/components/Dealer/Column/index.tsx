const Column = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <main className="w-50%">
                {children}
            </main>
        </>
    )
}

export default Column;