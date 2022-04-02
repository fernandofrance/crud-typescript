type CardProps = {
    text: string
}

export function Card(props: CardProps) {
    return <h3>{props.text}</h3>
}