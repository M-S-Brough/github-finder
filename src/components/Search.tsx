import { useState } from 'react';

// Props include the search handler and loading status
interface SearchProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

// Search input + submit form
const Search = ({ onSearch, loading }: SearchProps) => {
  const [username, setUsername] = useState('');

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed) {
      onSearch(trimmed);
      setUsername('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto flex items-center justify-center gap-3 bg-white dark:bg-slate-800 p-4 shadow ring-1 ring-slate-200 dark:ring-slate-700 rounded-lg"
    >
      <input
        type="text"
        placeholder="Enter GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
        className="flex-grow px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-slate-900 dark:text-white disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
