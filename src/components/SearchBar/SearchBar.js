import s from './SearchBar.module.css';

export default function SearchBar({ searchText, handleChange }) {
  return (
    <div>
      <input
        id={s.searchBar}
        type="search"
        placeholder="Type in hero"
        onChange={handleChange}
        value={searchText}
      />
    </div>
  );
}
