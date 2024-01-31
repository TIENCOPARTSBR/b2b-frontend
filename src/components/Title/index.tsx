type TitleType = {
    title: string
}

const Title = (props: TitleType) => {
    return (
        <h1 className="w-auto text-20px text-black font-semibold">{props.title}</h1>
    )
}

export default Title;