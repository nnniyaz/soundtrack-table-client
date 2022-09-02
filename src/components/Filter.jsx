import { useMemo } from "react";
import Select from "./UI/Select/Select";

const Filter = ({ playlist, filter, setFilter }) => {
    const authors = useMemo(() => {
        const list = [];
        for (let i = 0; i < playlist.length; i++) {
            list.push({
                value: playlist[i].author,
                name: playlist[i].author
            })
        }

        return list.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.place === value.place && t.name === value.name
            ))
        );
    }, [playlist])

    const genres = useMemo(() => {
        const list = [];
        for (let i = 0; i < playlist.length; i++) {
            list.push({
                value: playlist[i].genre,
                name: playlist[i].genre
            })
        }

        return list.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.place === value.place && t.name === value.name
            ))
        );
    }, [playlist])

    const years = useMemo(() => {
        const list = [];
        for (let i = 0; i < playlist.length; i++) {
            list.push({
                value: playlist[i].year,
                name: playlist[i].year
            })
        }

        return list.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.place === value.place && t.name === value.name
            ))
        );
    }, [playlist])

    return (
        <div className="filter">
            <div className="title">Фильтр</div>
            <div className='block'>
                <div className='select'>
                    Исполнитель
                    <Select
                        value={filter.author}
                        onChange={sort => setFilter({ ...filter, author: sort })}
                        defaultValue={'Все'}
                        options={authors}
                    />
                </div>

                <div className='select'>
                    Жанр
                    <Select
                        value={filter.genre}
                        onChange={sort => setFilter({ ...filter, genre: sort })}
                        defaultValue={'Все'}
                        options={genres}
                    />
                </div>

                <div className='select'>
                    Год
                    <Select
                        value={filter.year}
                        onChange={sort => setFilter({ ...filter, year: sort })}
                        defaultValue={'Все'}
                        options={years}
                    />
                </div>
            </div>
        </div>
    );
}

export default Filter;