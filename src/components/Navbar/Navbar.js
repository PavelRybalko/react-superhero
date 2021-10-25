import s from './Navbar.module.css';
import { GrAddCircle } from 'react-icons/gr';

export default function Navbar({ openModal }) {
  return (
    <nav className={s.navbar}>
      <span id={s.logo}>Superheroes</span>

      <button className={s.addButton} onClick={()=>openModal(true)}>
        <GrAddCircle size="26" style={{ marginRight: 6 }} />
        Add
      </button>
    </nav>
  );
}
