const Track = ({ data }) => {
    return (
        <tr key={data.id}>
            <td>{data.author}</td>
            <td>{data.music}</td>
            <td>{data.genre.charAt(0).toUpperCase() + data.genre.slice(1)}</td>
            <td>{data.year}</td>
        </tr>
    );
}

export default Track;