import s from './Navbar.module.css';
import { GrAddCircle } from 'react-icons/gr';
import { IHero } from '../../interfaces/Hero.interface';
import SearchBar from '../SearchBar';

interface NavbarProps {
  openModal(setValue: boolean): void;
  isModalOpen: boolean;
  searchText: string;
  setEditHero(hero: IHero | null): void;
  setSearchText(text: string): void;
}

export default function Navbar({
  searchText,
  setSearchText,
  openModal,
  isModalOpen,
  setEditHero,
}: NavbarProps) {
  const handleAddHero = () => {
    setEditHero(null);
    openModal(true);
  };

  return (
    <nav className={s.navbar}>
      <span id={s.logo}>Superheroes</span>
      <SearchBar searchText={searchText} handleChange={setSearchText} />
      <button className={s.addButton} onClick={() => handleAddHero()}>
        <GrAddCircle
          size="26"
          style={{ marginRight: 6 }}
          className={s.addIcon}
        />
        Add Superhero
      </button>

      {!isModalOpen && (
        <div className="fixed-action-btn">
          <a
            href="_"
            className="btn-floating btn-large waves-effect waves-light red"
            onClick={(e) => {
              e.preventDefault();
              handleAddHero();
            }}
          >
            <i className="material-icons">add</i>
          </a>
        </div>
      )}
    </nav>
  );
}
