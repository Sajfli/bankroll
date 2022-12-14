const IFrame = ({ src }: { src: string }) => {
    return (
        <iframe
            src={`https://youtube.com/embed/${src}`}
            title="Film na youtube"
            width="560"
            height="315"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
        ></iframe>
    )
}

export default IFrame
