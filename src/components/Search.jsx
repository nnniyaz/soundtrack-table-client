import Input from "./UI/Input/Input";

const Search = ({ filter, setFilter }) => {
    return (
        <Input
            value={filter.query}
            onChange={e => setFilter({ ...filter, query: e.target.value })}
            type="text"
            placeholder='Поиск...'
            style={{ borderRadius: '20px', padding: '5px 20px' }}
        />
    );
}

export default Search;