import { useMemo } from "react";

export const useSortedPlaylist = (playlist, filter) => {
    function filterCondition(item) {
        if (filter.author && filter.genre && filter.year) {
            return item.author === filter.author && item.genre === filter.genre && item.year === parseInt(filter.year)
        }
        if (filter.author && filter.genre) {
            return item.author === filter.author && item.genre === filter.genre
        }
        if (filter.author && filter.year) {
            return item.author === filter.author && item.year === parseInt(filter.year)
        }
        if (filter.genre && filter.year) {
            return item.genre === filter.genre && item.year === parseInt(filter.year)
        }
        if (filter.author) {
            return item.author === filter.author
        }
        if (filter.genre) {
            return item.genre === filter.genre
        }
        if (filter.year) {
            return item.year === parseInt(filter.year)
        }
        return item
    }

    const sortedPlaylist = useMemo(() => {
        if (filter.author || filter.genre || filter.year) {
            return [...playlist].filter(filterCondition)
        }
        return playlist;
    }, [playlist, filter])

    return sortedPlaylist;
}

export const useTracks = (playlist, filter) => {
    const sortedPlaylist = useSortedPlaylist(playlist, filter);

    const sortedAndSearchedPlaylist = useMemo(() => {
        return sortedPlaylist.filter(track =>
            track.author.toLowerCase().includes(filter.query.toLowerCase()) || track.music.toLowerCase().includes(filter.query.toLowerCase()) || track.genre.toLowerCase().includes(filter.query.toLowerCase()) || String(track.year).includes(String(filter.query))
        )
    }, [sortedPlaylist, filter.query])

    return sortedAndSearchedPlaylist;
}