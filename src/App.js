import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import Search from './components/Search';
import TrackForm from './components/TrackForm';
import TrackList from './components/TrackList';
import Button from './components/UI/Button/Button';
import Modal from './components/UI/Modal/Modal';
import { useTracks } from './hooks/useTrack';
import TrackService from './API/TrackService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from './utils/pages';
import previosPage from './assets/svgs/chevron-left.svg';
import nextPage from './assets/svgs/chevron-right.svg';

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [filter, setFilter] = useState({ author: '', genre: '', year: '', query: '' })
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPlaylist = useTracks(playlist, filter);
  const pagesArray = getPagesArray(totalPages);

  const [fetchTracks, isLoading, errorMessage] = useFetching(async () => {
    const tracks = await TrackService.getAll(limit, page);
    setPlaylist(tracks.playlist);
    const totalCount = tracks.total;
    setTotalPages(getPageCount(totalCount, limit));
  })

  const createTrack = async (newSoundtrack) => {
    await TrackService.create(newSoundtrack);
    setModal(false)
  }

  useEffect(() => {
    fetchTracks()
  }, [modal, page, limit])

  const changePage = (page) => {
    setPage(page);
    setFilter({ author: '', genre: '', year: '', query: '' });
  }

  const goPreviousPage = () => {
    if (page === 1) {
      return
    }
    setPage(page - 1);
    setFilter({ author: '', genre: '', year: '', query: '' });
  }

  const goNextPage = () => {
    if (page === pagesArray[pagesArray.length - 1]) {
      return
    }
    setPage(page + 1);
    setFilter({ author: '', genre: '', year: '', query: '' });
  }

  const changeLimit = (limit) => {
    setLimit(limit);
    setFilter({ author: '', genre: '', year: '', query: '' });
  }

  return (
    <div className="App">
      <Button onClick={() => setModal(true)} style={{ width: '20%' }}>
        Добавить трек
      </Button>
      <Modal visible={modal} setVisible={setModal} >
        <TrackForm create={createTrack} />
      </Modal>

      <hr style={{ margin: '20px 0' }} />

      <div className='container'>
        <Search filter={filter} setFilter={setFilter} />

        <div className='inner-container'>
          {
            errorMessage
              ?
              <h1>Произошла ошибка {errorMessage}</h1>
              :
              isLoading
                ?
                <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Loader />
                </div>
                :
                <div className='content'>
                  <TrackList playlist={sortedAndSearchedPlaylist} />
                  <div className='page__wrapper'>
                    <div className='pages'>
                      <span onClick={goPreviousPage} className='page'>
                        <img src={previosPage} alt="previous page" />
                      </span>
                      {pagesArray.map(p =>
                        <span
                          onClick={() => changePage(p)}
                          key={p}
                          className={page === p ? 'page page__current' : 'page'}
                        >
                          {p}
                        </span>
                      )}
                      <span onClick={goNextPage} className='page'>
                        <img src={nextPage} alt="previous page" />
                      </span>
                    </div>
                    <div className='limits'>
                      {
                        [3, 5, 10].map(l =>
                          <span
                            onClick={() => changeLimit(l)}
                            key={l}
                            className={limit === l ? 'limit limit__current' : 'limit'}>
                            {l}
                          </span>
                        )
                      }
                    </div>
                  </div>
                </div>
          }
          <Filter playlist={playlist} filter={filter} setFilter={setFilter} />
        </div>
      </div >
    </div >
  );
}

export default App;
