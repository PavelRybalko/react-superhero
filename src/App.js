import { Suspense, useState, useEffect } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';
import heroesApi from './services/heroes-api';
import Container from './components/Container';
import Navbar from './components/Navbar';
// import SearchBar from './components/SearchBar';
import Modal from './components/Modal';
import HeroForm from './components/HeroForm';
import HeroesList from './components/HeroesList';
import { Status } from './data/constants';
import s from './App.module.css';
// const ShoppingBasket = lazy(() =>
//   import('./components/ShoppingBasket' /* webpackChunkName: "ShoppingBasket"*/),
// );

// const toastOptions = {
//   position: 'top-right',
//   autoClose: 1000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// };

export default function App() {
  const [editHero, setEditHero] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [heroes, setHeroes] = useState([]);
  const [searchText, setSearchText] = useState(null);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [totalHeroes, setTotalHeroes] = useState(0);

  const handleAdd = async (newHero, image) => {
    const { hero } = await heroesApi.addHero(newHero);

    const formData = new FormData();
    formData.append('file', image);
    const newImage = await heroesApi.uploadImage(hero._id, formData);
    console.log('newImage - ', newImage);
    // setHeroes((state) => [...state, { ...hero, image }]);
    // setHeroes((state) => [...state, hero]);
  };

  const asyncUploadNewImage = (heroId, image) => {
    heroesApi.uploadImage(heroId, image);
  };

  const handleDelete = async (heroId) => {
    const deletedHero = await heroesApi.removeHero(heroId);
    setHeroes((heroes) => heroes.filter((hero) => hero._id !== heroId));
  };

  const handleUpdate = async (hero, heroId, image) => {
    const updatedHero = await heroesApi.updateHero(heroId, hero);
    console.log('updatedHero - ', updatedHero);
    const newImage = await asyncUploadNewImage(hero.id, image);
    setHeroes((heroes) =>
      heroes.map((hero) => (hero.id === heroId ? updatedHero : hero))
    );
  };

  const scrollHandler = (e) => {
    const totalWindowHeight = e.target.documentElement.scrollHeight;
    const scrollPositionFromTop = e.target.documentElement.scrollTop;

    console.log(
      'общая высота страницы со скроллом',
      e.target.documentElement.scrollHeight
    );
    console.log(
      'текущее положение скролла от верха страницы',
      e.target.documentElement.scrollTop
    );
    console.log('высота видимой области страницы', window.innerHeight);

    if (
      totalWindowHeight -
      (scrollPositionFromTop + window.innerHeight < 100 &&
        heroes.length < totalHeroes)
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    console.log('Запрос на сервер');
    if (fetching) {
      heroesApi
        .fetchHeroes(page)
        .then(({ data }) => {
          console.log('Data from Server - ', data);
          setHeroes([...heroes, ...data.heroes]);
          setPage((prevState) => prevState + 1);
          setTotalHeroes(data.total);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  // useEffect(() => {
  //   // if(!searchText){
  //   //   return
  //   // }
  //   setStatus(Status.PENDING);

  //   heroesApi
  //     .fetchHeroes(page)
  //     .then(({ data }) => {
  //       setHeroes(data.heroes);
  //       setStatus(Status.RESOLVED);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setStatus(Status.REJECTED);
  //     })
  //     .finally(() => {
  //       // setShowLoader(false);
  //       window.scrollTo({
  //         top: document.documentElement.offsetHeight,
  //         behavior: 'smooth',
  //       });
  //     });
  // }, [page]);

  // useEffect(() => {
  //   const fetchHeroes = () => {
  //     const options = { searchQuery, page };

  //     heroesApi
  //       .fetchHeroes(options)
  //       .then((res) => {
  //         const { hits, totalHits } = res;

  //         if (!!hits.length) {
  //           toast.success('Запрос выполнен успешно');
  //           setHeroes((prevHeroes) => [...prevHeroes, ...hits]);
  //           setShowButton(true);
  //         }

  //         if (!hits.length) {
  //           toast.error(`По запросу "${searchQuery}" ничего не найдено`);
  //         }

  //         if (totalHits <= 12) {
  //           setShowButton(false);
  //         }
  //       })
  //       .catch((error) => setError(error))
  //       .finally(() => {
  //         setShowLoader(false);
  //         window.scrollTo({
  //           top: document.documentElement.offsetHeight,
  //           behavior: 'smooth',
  //         });
  //       });
  //   };

  //   searchQuery && setShowLoader(true);
  //   searchQuery && fetchImages();
  // }, [searchQuery, page]);

  return (
    <Container>
      <header className={s.header}>
        <Navbar openModal={setModalActive} />
      </header>
      <main className={s.main}>
        {/* <HeroForm onSubmit={handleAdd} /> */}
        {/* <SearchBar searchText={searchText} handleChange={handleChange} /> */}
        <Suspense fallback={<Loader />}>
          <HeroesList
            setEditHero={setEditHero}
            openModal={setModalActive}
            onDelete={handleDelete}
            // onEdit={handleUpdate}
            heroes={heroes}
          />
        </Suspense>
      </main>

      {/* 
     <ToastContainer autoClose={3000} /> */}
      <Modal
        active={modalActive}
        setActive={setModalActive}
        children={
          <HeroForm
            onAddHero={handleAdd}
            onUpdateHero={handleUpdate}
            editHero={editHero}
            setEditHero={setEditHero}
            openModal={setModalActive}
          />
        }
      />
    </Container>
  );
}
