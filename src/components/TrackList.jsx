import Track from "./Track";
import selector from '../assets/svgs/selector.svg';
import { useMemo, useState } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TrackList = ({ playlist }) => {
    const [selectedSort, setSelectedSort] = useState('');

    const sortTracks = (e) => {
        if (e.currentTarget.textContent === 'Исполнитель' || e.currentTarget.innerText === 'Исполнитель') {
            setSelectedSort('author')
        }
        if (e.currentTarget.textContent === 'Песня' || e.currentTarget.innerText === 'Песня') {
            setSelectedSort('music')
        }
        if (e.currentTarget.textContent === 'Жанр' || e.currentTarget.innerText === 'Жанр') {
            setSelectedSort('genre')
        }
        if (e.currentTarget.textContent === 'Год' || e.currentTarget.innerText === 'Год') {
            setSelectedSort('year')
        }

    }

    const sortedTracks = useMemo(() => {
        if (selectedSort) {
            if (selectedSort === 'year') {
                return [...playlist].sort(function (a, b) { return a.year - b.year; }).reverse();
            }
            console.log([...playlist].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort])))
            return [...playlist].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
        }
        return playlist;
    }, [selectedSort, playlist]);

    return (
        <div className="playlist">
            <div className="title">Плейлист</div>
            <table>
                <thead>
                    <tr>
                        <th onClick={sortTracks}>
                            <div className="table-header">
                                Исполнитель
                                <img src={selector} alt="" />
                            </div>
                        </th>
                        <th onClick={sortTracks}>
                            <div className="table-header">
                                Песня
                                <img src={selector} alt="" />
                            </div>
                        </th>
                        <th onClick={sortTracks}>
                            <div className="table-header">
                                Жанр
                                <img src={selector} alt="" />
                            </div>
                        </th>
                        <th onClick={sortTracks}>
                            <div className="table-header">
                                Год
                                <img src={selector} alt="" />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedTracks.map(track =>
                            <Track data={track} key={track.id} />
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TrackList;