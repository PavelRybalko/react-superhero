import { Suspense, useState, useEffect, useCallback } from 'react';
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalHeroes, setTotalHeroes] = useState(0);

  useEffect(() => {
    if (fetching) {
      setLoading(true);
      heroesApi
        .fetchHeroes(page, pageSize)
        .then(({ data }) => {
          setHeroes((prevHeroes) => [...prevHeroes, ...data.heroes]);
          setTotalHeroes(data.total);
        })
        .finally(() => {
          setLoading(false);
          setFetching(false);
          setPage((prevState) => prevState + 1);
          window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: 'smooth',
          });
        });
    }
  }, [fetching, pageSize, page]);

  const scrollHandler = useCallback(
    (e) => {
      const totalWindowHeight = e.target.documentElement.scrollHeight;
      const scrollPositionFromTop = e.target.documentElement.scrollTop;

      if (
        totalWindowHeight - (scrollPositionFromTop + window.innerHeight) <
          100 &&
        heroes.length < totalHeroes
      ) {
        setFetching(true);
      }
    },
    [heroes.length, totalHeroes]
  );

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  const handleAdd = async (newHero, image) => {
    const { hero } = await heroesApi.addHero(newHero);

    const data = new FormData();
    data.append('image', image);
    data.append('heroName', hero.nickname);

    const { imageUrl } = await heroesApi.uploadImage(hero._id, data);

    setHeroes((state) => [...state, { ...hero, Images: [imageUrl] }]);
  };

  const handleDelete = async (heroId) => {
    const { hero: deletedHero } = await heroesApi.removeHero(heroId);
    setHeroes((heroes) =>
      heroes.filter((hero) => hero._id !== deletedHero._id)
    );
  };

  const handleUpdate = async (hero, heroId, image) => {
    debugger;
    const updatedHero = await heroesApi.updateHero(heroId, hero);

    const data = new FormData();
    data.append('image', image);
    data.append('heroName', hero.nickname);

    const { imageUrl } = await heroesApi.uploadImage(heroId, data);
    setHeroes((heroes) =>
      heroes.map((hero) =>
        hero.id === heroId
          ? { ...updatedHero, images: [...hero.images, imageUrl] }
          : hero
      )
    );
  };

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
        {/* <SearchBar searchText={searchText} handleChange={handleChange} /> */}
        <Suspense fallback={<Loader />}>
          <HeroesList
            setEditHero={setEditHero}
            openModal={setModalActive}
            onDelete={handleDelete}
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
          modalActive && (
            <HeroForm
              onAddHero={handleAdd}
              onUpdateHero={handleUpdate}
              editHero={editHero}
              setEditHero={setEditHero}
              openModal={setModalActive}
            />
          )
        }
      />
    </Container>
  );
}
