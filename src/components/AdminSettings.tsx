import { useEffect, useState, useRef } from 'react';
import { X, Plus, Pin, Trash2, Eye, EyeOff, Lock } from 'lucide-react';
import { supabase, type Example, type AnalyticsLog } from '../lib/supabase';

// Access token split across vars to avoid obvious string literals
const _t1 = 'c2Z0';
const _t2 = 'ZXI2';
const _t3 = 'Nzg5';
const _ak = _t1 + _t2 + _t3;

function verify(input: string): boolean {
  try { return btoa(input) === _ak; } catch { return false; }
}

interface AdminSettingsProps {
  onClose: () => void;
}

type Tab = 'examples' | 'analytics';

const emptyForm = { name: '', website_link: '', business_type: '', pricing_chosen: '' };

export default function AdminSettings({ onClose }: AdminSettingsProps) {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const [tab, setTab] = useState<Tab>('examples');
  const [examples, setExamples] = useState<Example[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const pwRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    pwRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!authed) return;
    loadExamples();
    loadAnalytics();
  }, [authed]);

  async function loadExamples() {
    setLoading(true);
    const { data } = await supabase
      .from('examples')
      .select('*')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false });
    setExamples(data ?? []);
    setLoading(false);
  }

  async function loadAnalytics() {
    const { data } = await supabase
      .from('analytics_logs')
      .select('*')
      .order('visited_at', { ascending: false })
      .limit(200);
    setAnalytics(data ?? []);
  }

  function handlePwSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (verify(pwInput)) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
      setPwInput('');
    }
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleAddExample(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.website_link || !form.business_type || !form.pricing_chosen) {
      setFormError('All fields are required.');
      return;
    }
    setFormError('');
    setSubmitting(true);
    const { error } = await supabase.from('examples').insert({
      name: form.name,
      website_link: form.website_link,
      business_type: form.business_type,
      pricing_chosen: form.pricing_chosen,
      pinned: false,
    });
    if (!error) {
      setForm(emptyForm);
      await loadExamples();
    }
    setSubmitting(false);
  }

  async function togglePin(ex: Example) {
    await supabase.from('examples').update({ pinned: !ex.pinned }).eq('id', ex.id);
    await loadExamples();
  }

  async function deleteExample(id: string) {
    await supabase.from('examples').delete().eq('id', id);
    await loadExamples();
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-900">
            <Lock size={16} className="text-gray-500" />
            <span className="font-semibold text-sm">Admin Panel</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {!authed ? (
          /* Password Gate */
          <div className="flex-1 flex items-center justify-center p-8">
            <form onSubmit={handlePwSubmit} className="w-full max-w-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">Enter Password</h2>
              <p className="text-sm text-gray-500 text-center mb-6">This area is restricted.</p>
              <div className="relative mb-3">
                <input
                  ref={pwRef}
                  type={showPw ? 'text' : 'password'}
                  value={pwInput}
                  onChange={(e) => setPwInput(e.target.value)}
                  placeholder="Password"
                  className={`w-full border rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 transition ${
                    pwError ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-gray-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {pwError && (
                <p className="text-xs text-red-500 mb-3 text-center">Incorrect password.</p>
              )}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors"
              >
                Unlock
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {(['examples', 'analytics'] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors capitalize ${
                    tab === t
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {t === 'examples' ? 'Manage Projects' : 'Visitor Analytics'}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto">
              {tab === 'examples' && (
                <div className="p-6 space-y-6">
                  {/* Add form */}
                  <form onSubmit={handleAddExample} className="bg-gray-50 rounded-xl p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Add New Project</h3>
                    {[
                      { name: 'name', placeholder: 'Project Name' },
                      { name: 'website_link', placeholder: 'Website Link (https://...)' },
                      { name: 'business_type', placeholder: 'Kind of Business' },
                      { name: 'pricing_chosen', placeholder: 'Pricing Plan Chosen' },
                    ].map(({ name, placeholder }) => (
                      <input
                        key={name}
                        name={name}
                        value={form[name as keyof typeof form]}
                        onChange={handleFormChange}
                        placeholder={placeholder}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition bg-white"
                      />
                    ))}
                    {formError && <p className="text-xs text-red-500">{formError}</p>}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-1.5 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                      <Plus size={14} /> {submitting ? 'Adding...' : 'Done'}
                    </button>
                  </form>

                  {/* List */}
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
                    </div>
                  ) : examples.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-6">No projects yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {examples.map((ex) => (
                        <div
                          key={ex.id}
                          className="bg-white rounded-xl border border-gray-200 p-4 flex items-start justify-between gap-4"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-gray-900">{ex.name}</span>
                              {ex.pinned && (
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                  Pinned
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{ex.business_type} · {ex.pricing_chosen}</p>
                            <a
                              href={ex.website_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-500 hover:underline mt-0.5 block truncate max-w-xs"
                            >
                              {ex.website_link}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => togglePin(ex)}
                              title={ex.pinned ? 'Unpin' : 'Pin'}
                              className={`p-1.5 rounded-lg transition-colors ${
                                ex.pinned
                                  ? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              <Pin size={14} />
                            </button>
                            <button
                              onClick={() => deleteExample(ex.id)}
                              title="Delete"
                              className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === 'analytics' && (
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Visitor Logs ({analytics.length} entries)
                  </h3>
                  {analytics.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-8">No visits recorded yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="pb-2 pr-4 font-semibold text-gray-500 whitespace-nowrap">Time</th>
                            <th className="pb-2 pr-4 font-semibold text-gray-500">Page</th>
                            <th className="pb-2 pr-4 font-semibold text-gray-500 whitespace-nowrap">Device</th>
                            <th className="pb-2 font-semibold text-gray-500">User Agent</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analytics.map((log) => (
                            <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">
                                {formatDate(log.visited_at)}
                              </td>
                              <td className="py-2 pr-4 text-gray-900 font-medium">{log.path}</td>
                              <td className="py-2 pr-4 text-gray-500 whitespace-nowrap capitalize">
                                {log.device_type ?? '—'}
                              </td>
                              <td className="py-2 text-gray-400 max-w-[200px] truncate" title={log.user_agent ?? ''}>
                                {log.user_agent ?? '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
