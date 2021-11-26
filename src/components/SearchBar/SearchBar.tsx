import s from './SearchBar.module.css';

interface SearchBarProps {
  searchText: string;
  handleChange(text: string): void;
}

export default function SearchBar({
  searchText,
  handleChange,
}: SearchBarProps) {
  return (
    <div>
      <input
        autoComplete="off"
        id={s.searchBar}
        type="search"
        placeholder="Find by nickname"
        onChange={(e) => handleChange(e.target.value)}
        value={searchText}
      />
    </div>
  );
}
