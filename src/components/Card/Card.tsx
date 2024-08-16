export type CardProps = {
    title?: string,
    description?: string,
    coverImage?: string,
    onClick?: () => void,
}

function Card({ title, description }: CardProps) {
    return (
        <div className="card">
            <h1>{title}</h1>
            <p>{""}</p>
            <p>{description}</p>
        </div>
    );
}

export default Card;