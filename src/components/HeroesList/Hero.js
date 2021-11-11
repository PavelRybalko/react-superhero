import s from './Hero.module.css';

export default function Hero({
  hero: {
    _id: heroId,
    nickname,
    real_name,
    origin_description,
    Images: image,
    superpowers,
    catch_phrase,
  },
  onDelete,
  openModal,
  setEditHero,
}) {
  return (
    <li className={s.listItem}>
      <img
        src={image.length > 0 ? image[0] : ''}
        alt={nickname}
        className={s.productImage}
      />
      <div className={s.heroInfo}>
        <h3 className={s.heroTitle}>{nickname}</h3>
        <p className={s.heroText}>
          <span>Real Name:</span> {real_name}
        </p>
        <p className={s.heroText}>
          <span>Description:</span> {origin_description}
        </p>
        <p className={s.heroText}>
          <span>Superpowers:</span> {superpowers}
        </p>
        <p className={s.heroText}>
          <span>Catch Phrase:</span> {catch_phrase}
        </p>
      </div>
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setEditHero({
              nickname,
              real_name,
              origin_description,
              superpowers,
              catch_phrase,
              image,
              heroId,
            });
            openModal(true);
          }}
        >
          edit
        </button>
        <button
          type="button"
          onClick={() => {
            onDelete(heroId);
          }}
        >
          delete
        </button>
      </div>
    </li>
  );
}
