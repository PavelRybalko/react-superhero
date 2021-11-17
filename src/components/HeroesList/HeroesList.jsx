import Hero from './Hero';
import s from './HeroesList.module.css';

export default function HeroesList({
  heroes,
  setEditHero,
  onDelete,
  openModal,
}) {
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
              hero={hero}
              setEditHero={setEditHero}
            />
          ))}
      </ul>
    </>
  );
}
