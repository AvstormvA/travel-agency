const InfoPill = ({ text, image }: InfoPillProps) => {
  return (
    <figure className="info-pill">
      <img src={image} alt={text} />
      <figcaption className="max-w-[700px] w-full truncate">{text}</figcaption>
    </figure>
  )
}

export default InfoPill