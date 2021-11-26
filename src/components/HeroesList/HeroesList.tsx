import Hero from './Hero';
import s from './HeroesList.module.css';
import { IHero } from '../../interfaces/Hero.interface';

interface HeroesListProps {
  heroes: IHero[];
  setEditHero(hero: IHero): void;
  onDelete(id: string): void;
  openModal(setValue: boolean): void;
  onDeleteImage(heroId: string, prevImage: string): void;
}

export default function HeroesList({
  heroes,
  setEditHero,
  onDelete,
  openModal,
  onDeleteImage,
}: HeroesListProps) {
  return (
    <>
      <h2 className={s.heroesTitle}>Heroes</h2>
      <ul className={s.heroesList}>
        {heroes &&
          heroes.map((hero) => (
            <Hero
              key={hero._id}
              openModal={openModal}
              onDelete={onDelete}
              onDeleteImage={onDeleteImage}
              hero={hero}
              setEditHero={setEditHero}
            />
          ))}
      </ul>
    </>
  );
}
