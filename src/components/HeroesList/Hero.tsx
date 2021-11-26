import s from './Hero.module.css';
import { IHero } from '../../interfaces/Hero.interface';
import UnknownHeroImage from '../../img/No-Image.png';

interface HeroProps {
  hero: IHero;
  onDelete(id: string): void;
  openModal(isOpen: boolean): void;
  setEditHero(hero: IHero): void;
  onDeleteImage(id: string, image: string): void;
}

export default function Hero({
  hero: {
    _id,
    nickname,
    real_name,
    origin_description,
    Images,
    superpowers,
    catch_phrase,
  },
  onDelete,
  openModal,
  setEditHero,
  onDeleteImage,
}: HeroProps) {
  return (
    <li className="col s12 m7">
      <div className="card small horizontal">
        <div className={`card-image ${s.image}`}>
          {Images[0] && (
            <a
              title="Delete Image"
              className={`btn-floating btn-small waves-effect waves-light transparent  ${s.deleteImageBtn}`}
              href="_"
              onClick={(e) => {
                e.preventDefault();
                onDeleteImage(_id, Images[0]);
              }}
            >
              <i className="material-icons red">delete</i>
            </a>
          )}
          <img
            className={s.image}
            src={Images?.length > 0 ? Images[0] : UnknownHeroImage}
            alt={nickname}
          />
        </div>
        <div className={`card-stacked  ${s.myCard}`}>
          <div className="card-content">
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
          <div className="card-action">
            <div className={s.buttons}>
              <a
                href="_"
                className="waves-effect  light-blue accent-4 btn-small"
                onClick={(e) => {
                  e.preventDefault();
                  setEditHero({
                    nickname,
                    real_name,
                    origin_description,
                    superpowers,
                    catch_phrase,
                    Images,
                    _id,
                  });
                  openModal(true);
                }}
              >
                <i className="material-icons left">edit</i>Edit
              </a>
              <a
                className="waves-effect  deep-orange darken-3 btn-small"
                href="_"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(_id);
                }}
              >
                <i className="material-icons right">delete</i>Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
