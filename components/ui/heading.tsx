interface headingprops{
    title: string;
    description: string;
}
export const Heading: React.FC<headingprops>=({
    title,
    description
})=>{
    return(
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}
