interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, link, description or tag"
        aria-label="Search saved links"
      />
      <span className="search-bar__count">
        {resultCount} {resultCount === 1 ? 'entry' : 'entries'}
      </span>
    </div>
  );
}
