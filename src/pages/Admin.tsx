import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  Loader2,
  RefreshCw,
  Inbox,
  Phone,
  User,
  MessageSquare,
  Calendar,
  ArrowLeft,
  Eye,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface FormEntry {
  operation_id: string;
  timestamp?: string;
  name?: string;
  phone?: string;
  message?: string;
  [key: string]: unknown;
}

export default function Admin() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<FormEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState<FormEntry | null>(null);
  const [error, setError] = useState("");
  const limit = 20;

  const fetchCount = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/getFormsCount`, {
        headers: { Authorization: SECRET_KEY },
      });
      if (res.ok) {
        const data = await res.json();
        setTotalCount(data.count || 0);
      }
    } catch {
      // ignore
    }
  }, []);

  const fetchEntries = useCallback(async (currentOffset: number) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${API_BASE_URL}/getFormsData?limit=${limit}&offset=${currentOffset}`,
        {
          headers: { Authorization: SECRET_KEY },
        },
      );
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      if (data.error) {
        setEntries([]);
        setTotalCount(0);
      } else if (Array.isArray(data)) {
        setEntries(data);
      } else {
        setEntries([]);
      }
    } catch {
      setError("Не удалось загрузить заявки. Проверьте SECRET-KEY.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchCount();
      fetchEntries(0);
    }
  }, [authenticated, fetchCount, fetchEntries]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem("stroyregion_admin", "true");
    } else {
      setError("Неверный пароль");
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("stroyregion_admin") === "true";
    if (isAuth) setAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("stroyregion_admin");
    setAuthenticated(false);
    setPassword("");
  };

  const handlePageChange = (newOffset: number) => {
    if (newOffset < 0) return;
    setOffset(newOffset);
    fetchEntries(newOffset);
  };

  const formatDate = (timestamp?: string) => {
    if (!timestamp) return "—";
    try {
      const d = new Date(parseInt(timestamp) * 1000);
      return d.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return timestamp;
    }
  };

  // Login page
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-card p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-2xl font-bold text-brown uppercase mb-2">
              Стройрегион57
            </h1>
            <p className="text-[#555555] text-sm">Панель управления заявками</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brown mb-2 uppercase tracking-wider">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-green-accent focus:ring-1 focus:ring-green-accent transition-colors"
                placeholder="Введите пароль"
                autoFocus
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="btn-primary w-full">
              Войти
            </button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="mt-4 flex items-center justify-center gap-2 text-[#555555] hover:text-brown transition-colors text-sm w-full"
          >
            <ArrowLeft size={16} />
            На сайт
          </button>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-brown hover:text-green-accent transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-playfair text-xl font-bold text-brown uppercase">
              Стройрегион57 — Заявки
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                fetchCount();
                fetchEntries(offset);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded bg-green-accent text-white text-sm hover:bg-green-dark transition-colors"
            >
              <RefreshCw size={16} />
              Обновить
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[#555555] hover:text-red-500 transition-colors text-sm"
            >
              <LogOut size={16} />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-accent/10 flex items-center justify-center">
              <Inbox size={24} className="text-green-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-brown">{totalCount}</p>
              <p className="text-sm text-[#555555]">Всего заявок</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Calendar size={24} className="text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-brown">
                {entries.length > 0 && entries[0]?.timestamp
                  ? formatDate(entries[0].timestamp).split(",")[0]
                  : "—"}
              </p>
              <p className="text-sm text-[#555555]">Последняя заявка</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <MessageSquare size={24} className="text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-brown">{entries.length}</p>
              <p className="text-sm text-[#555555]">На странице</p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-green-accent" />
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-20">
              <Inbox size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-[#555555]">Заявок пока нет</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-[#555555] uppercase tracking-wider">
                        ID
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-[#555555] uppercase tracking-wider">
                        Дата
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-[#555555] uppercase tracking-wider">
                        Имя
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-[#555555] uppercase tracking-wider">
                        Телефон
                      </th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-[#555555] uppercase tracking-wider">
                        Сообщение
                      </th>
                      <th className="text-right px-6 py-4 text-xs font-semibold text-[#555555] uppercase tracking-wider">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {entries.map((entry) => (
                      <tr
                        key={entry.operation_id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-[#555555] font-mono">
                          #{entry.operation_id.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#555555] whitespace-nowrap">
                          {formatDate(entry.timestamp)}
                        </td>
                        <td className="px-6 py-4 text-sm text-brown font-medium">
                          {entry.name || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#555555]">
                          {entry.phone || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#555555] max-w-xs truncate">
                          {entry.message || "—"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setSelectedEntry(entry)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-sm bg-green-accent/10 text-green-accent hover:bg-green-accent hover:text-white transition-colors"
                          >
                            <Eye size={14} />
                            Открыть
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <p className="text-sm text-[#555555]">
                  Показано {offset + 1}–{Math.min(offset + limit, totalCount)}{" "}
                  из {totalCount}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(offset - limit)}
                    disabled={offset === 0}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => handlePageChange(offset + limit)}
                    disabled={offset + limit >= totalCount}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedEntry && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          onClick={() => setSelectedEntry(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-playfair text-xl font-bold text-brown">
                Заявка #{selectedEntry.operation_id.slice(0, 8)}
              </h3>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-[#555555] hover:text-brown transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-green-accent mt-0.5" />
                <div>
                  <p className="text-xs text-[#555555] uppercase">Дата</p>
                  <p className="text-brown">
                    {formatDate(selectedEntry.timestamp)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User size={18} className="text-green-accent mt-0.5" />
                <div>
                  <p className="text-xs text-[#555555] uppercase">Имя</p>
                  <p className="text-brown">{selectedEntry.name || "—"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="text-green-accent mt-0.5" />
                <div>
                  <p className="text-xs text-[#555555] uppercase">Телефон</p>
                  <a
                    href={`tel:${selectedEntry.phone}`}
                    className="text-green-accent hover:underline"
                  >
                    {selectedEntry.phone || "—"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare size={18} className="text-green-accent mt-0.5" />
                <div>
                  <p className="text-xs text-[#555555] uppercase">Сообщение</p>
                  <p className="text-brown whitespace-pre-wrap">
                    {selectedEntry.message || "—"}
                  </p>
                </div>
              </div>

              {/* Raw data */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-[#555555] uppercase mb-2">
                  Все данные
                </p>
                <pre className="bg-gray-50 rounded p-3 text-xs text-[#555555] overflow-auto max-h-40">
                  {JSON.stringify(selectedEntry, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
