import { useState, useEffect, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import debounce from 'lodash.debounce';
import './pagination.css';
import HeroForm from './components/HeroForm';
import Loader from './components/Loader';
import heroesApi from './services/heroes-api';
import Container from './components/Container';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import HeroesList from './components/HeroesList';
import s from './App.module.css';

import { IHeroFormItem } from './interfaces/HeroFormItem.interface';
import { IHero } from './interfaces/Hero.interface';

const getImagePublicId = (image: string): string => {
  const prevImagePublicId = image.split('/').slice(-3);
  prevImagePublicId[2] = prevImagePublicId[2].slice(
    0,
    prevImagePublicId[2].lastIndexOf('.')
  );
  return prevImagePublicId.join('/');
};

export default function App() {
  const [editHero, setEditHero] = useState<IHero | null>(null);
  const [modalActive, setModalActive] = useState(false);
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  // const [fetching, setFetching] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalHeroes, setTotalHeroes] = useState(0);

  const debouncedGetResponse = useCallback(
    debounce((searchText, page, pageSize) => {
      setLoading(true);
      heroesApi
        .fetchHeroes({ searchText, page, pageSize })!
        .then((result) => {
          if (!result) return;
          // setHeroes([...prevHeroes, ...data.heroes]);
          setHeroes(result.data.heroes);
          setTotalHeroes(Number(result.data.total));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
          // setFetching(false);
          // setPage(page + 1);
        });
    }, 500),
    []
  );

  useEffect(() => {
    // if (fetching) {
    debouncedGetResponse(searchText, page, pageSize);
  }, [pageSize, page, searchText, debouncedGetResponse]);

  // const scrollHandler = useCallback(
  //   (e) => {
  //     const totalWindowHeight = e.target.documentElement.scrollHeight;
  //     const scrollPositionFromTop = e.target.documentElement.scrollTop;

  //     if (
  //       totalWindowHeight - (scrollPositionFromTop + window.innerHeight) <
  //         100 &&
  //       heroes.length < totalHeroes
  //     ) {
  //       setFetching(true);
  //     }
  //   },
  //   [heroes.length, totalHeroes]
  // );

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler);

  //   return function () {
  //     document.removeEventListener('scroll', scrollHandler);
  //   };
  // }, [scrollHandler]);

  const handleAdd = async (newHero: IHeroFormItem, image: File) => {
    const { hero } = await heroesApi.addHero(newHero);

    const data = new FormData();

    data.append('image', image);
    data.append('heroName', hero.nickname);
    if (image) {
      const { imageUrl } = await heroesApi.uploadImage(hero._id, data);

      setHeroes((state) => [...state, { ...hero, Images: [imageUrl] }]);
    }
    setHeroes((state) => [hero, ...state]);
    // window.scrollTo({
    //   top: document.documentElement.offsetHeight,
    //   behavior: 'smooth',
    // });
  };

  const handleDelete = async (heroId: string) => {
    const { hero: deletedHero } = await heroesApi.removeHero(heroId);
    setHeroes((state) => state.filter((hero) => hero._id !== deletedHero._id));
  };

  const handleDeleteImage = async (heroId: string, prevImage: string) => {
    const publicId = getImagePublicId(prevImage);

    const data = new FormData();
    data.append('prevImagePublicId', publicId);

    await heroesApi.uploadImage(heroId, data);
    setHeroes(
      heroes.map((hero) =>
        hero._id === heroId ? { ...hero, Images: [] } : hero
      )
    );
  };

  const handleUpdate = async (
    hero: IHeroFormItem,
    heroId: string,
    image: File | null
  ) => {
    const updatedHero = await heroesApi.updateHero(heroId, hero);
    if (image?.size) {
      const data = new FormData();
      data.append('heroName', hero.nickname);
      data.append('image', image);

      if (updatedHero.Images.length > 0) {
        const publicId = getImagePublicId(updatedHero.Images[0]);
        data.append('previousImagePublicId', publicId);
      }

      const { imageUrl } = await heroesApi.uploadImage(heroId, data);
      setHeroes((state) =>
        state.map((hero) =>
          hero._id === heroId ? { ...updatedHero, Images: [imageUrl] } : hero
        )
      );
      return;
    }

    setHeroes((state) =>
      state.map((hero) => (hero._id === heroId ? { ...updatedHero } : hero))
    );
  };

  return (
    <Container>
      <header className={s.header}>
        <Navbar
          searchText={searchText}
          setSearchText={setSearchText}
          openModal={setModalActive}
          isModalOpen={modalActive}
          setEditHero={setEditHero}
        />
      </header>
      {loading && <Loader />}
      <main className={s.main}>
        <HeroesList
          onDeleteImage={handleDeleteImage}
          setEditHero={setEditHero}
          openModal={setModalActive}
          onDelete={handleDelete}
          heroes={heroes}
        />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          nextLinkClassName="page-link"
          activeClassName="active"
          onPageChange={({ selected }) => setPage(selected + 1)}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(totalHeroes / pageSize)}
          previousLabel="< previous"
          marginPagesDisplayed={2}
        />
      </main>

      <Modal
        active={modalActive}
        setActive={setModalActive}
        children={
          modalActive && (
            <HeroForm
              onDeleteImage={handleDeleteImage}
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
