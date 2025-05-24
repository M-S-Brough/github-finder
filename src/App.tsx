import { useState, useEffect } from 'react';
import './index.css';
import Search from './components/Search';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  description: string;
  language: string;
}

function App() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleSearch = async (username: string) => {
    try {
      setLoading(true);
      setError(null);
      setUser(null);
      setRepos([]);
      setPage(1);
      setCurrentUser(username);

      //  Fetch from backend
      const res = await fetch(`http://localhost:5000/api/github/${username}`);
      if (!res.ok) throw new Error('User not found');

      const data = await res.json();
      setUser(data.profile);
      setRepos(data.repos);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!currentUser) return;

  const fetchReposFromBackend = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/github/${currentUser}?page=${page}`);
      if (!res.ok) throw new Error('Failed to fetch repositories');
      const data = await res.json();
      setRepos(data.repos);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  fetchReposFromBackend();
}, [page]);


  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 p-6">
      {/* Dark mode toggle */}
      <div className="flex justify-end max-w-md mx-auto mb-4">
        <button
          onClick={() => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem(
              'theme',
              document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            );
          }}
          className="px-3 py-1 text-sm rounded bg-slate-300 dark:bg-slate-700 dark:text-white hover:bg-slate-400 dark:hover:bg-slate-600"
        >
          Toggle Dark Mode
        </button>
      </div>

      <h1 className="text-5xl font-extrabold text-center text-indigo-700 dark:text-indigo-300 drop-shadow-sm mb-6">
        GitHub Finder
      </h1>

      <Search onSearch={handleSearch} loading={loading} />

      {loading && (
        <div className="flex flex-col items-center mt-6">
          <div className="w-10 h-10 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Searching GitHub...</p>
        </div>
      )}

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      {user && (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl shadow-md ring-1 ring-slate-200 dark:ring-slate-700 text-center">
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-28 h-28 mx-auto rounded-full shadow mb-4"
          />
          <h2 className="text-2xl font-semibold">{user.name || user.login}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">@{user.login}</p>
          <p className="mb-4">{user.bio}</p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            View GitHub Profile →
          </a>

          <div className="grid grid-cols-3 gap-4 text-sm text-center mt-6">
            <div>
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{user.public_repos}</p>
              <p className="text-slate-500 dark:text-slate-400">Repos</p>
            </div>
            <div>
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{user.followers}</p>
              <p className="text-slate-500 dark:text-slate-400">Followers</p>
            </div>
            <div>
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{user.following}</p>
              <p className="text-slate-500 dark:text-slate-400">Following</p>
            </div>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className="max-w-md mx-auto mt-6 space-y-4">
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 text-center mb-2">
            Repositories – Page {page}
          </h3>

          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow ring-1 ring-slate-100 dark:ring-slate-700 hover:shadow-md transition"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                {repo.name}
              </a>
              {repo.language && (
                <p className="text-sm text-slate-500 dark:text-slate-400">Language: {repo.language}</p>
              )}
              <p className="text-sm text-slate-700 dark:text-slate-300">{repo.description}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                ⭐ {repo.stargazers_count}
              </p>
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-white rounded hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-50"
            >
              ← Prev
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
