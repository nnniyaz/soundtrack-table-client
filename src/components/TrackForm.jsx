import { useState } from "react";
import Button from "./UI/Button/Button";
import Input from "./UI/Input/Input";
import Select from "./UI/Select/Select";

const TrackForm = ({ create }) => {
    const [soundtrack, setSoundtrack] = useState({
        author: '',
        music: '',
        genre: '',
        year: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!soundtrack.author || !soundtrack.music || !soundtrack.genre || !soundtrack.year) {
            return
        }
        const newSoundtrack = { ...soundtrack }
        create(newSoundtrack)
        setSoundtrack({
            author: '',
            music: '',
            genre: '',
            year: ''
        })
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className='row'>
                <label className='label'>
                    Исполнитель
                    <Input
                        value={soundtrack.author}
                        onChange={e => setSoundtrack({ ...soundtrack, author: e.target.value })}
                        type={'text'}
                        placeholder={'Введите имя исполнителя'}
                    />
                </label>

                <label className='label'>
                    Песня
                    <Input
                        value={soundtrack.music}
                        onChange={e => setSoundtrack({ ...soundtrack, music: e.target.value })}
                        type={'text'}
                        placeholder={'Введите название песни'}
                    />
                </label>
            </div>

            <div className='row'>
                <label className='label'>
                    Жанр
                    <Select
                        value={soundtrack.genre}
                        onChange={genre => setSoundtrack({ ...soundtrack, genre: genre })}
                        defaultValue={'Выберите жанр'}
                        options={[
                            { value: 'folk', name: 'Folk' },
                            { value: 'rock', name: 'Rock' },
                            { value: 'jazz', name: 'Jazz' },
                            { value: 'blues', name: 'Blues' },
                            { value: 'rap', name: 'Rap' },
                            { value: 'pop', name: 'Pop' },
                        ]}
                    />
                </label>

                <label className='label'>
                    Год
                    <Input
                        value={soundtrack.year}
                        onChange={e => setSoundtrack({ ...soundtrack, year: parseInt(e.target.value) })}
                        type={'number'}
                        min={1900}
                        max={2022}
                        placeholder={'Введите год песни'}
                    />
                </label>
            </div>
            <Button type={"submit"}>Добавить</Button>
        </form>
    );
}

export default TrackForm;