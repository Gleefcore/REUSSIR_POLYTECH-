export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: 'MSP1' | 'MSP2' | 'Cadet' | 'Admin';
  role: 'student' | 'admin';
  active: boolean;
  createdAt: string;
}

export interface HistoryEntry {
  id: string;
  title: string;
  type: 'TD' | 'Examen' | 'Correction' | 'Accès demandé' | 'Formations VIP';
  at: string;
}

export interface AccessRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  context: string;
  message: string;
  source: 'correction' | 'vip';
  at: string;
  status: 'new' | 'done';
}

const USERS_KEY = 'rp_users';
const SESSION_KEY = 'rp_session';
const HISTORY_KEY = (email: string) => `rp_history:${email}`;
const REQUESTS_KEY = 'rp_requests';

export const ADMIN_EMAIL = 'admin@reussir-polytech.com';
export const ADMIN_PASSWORD = 'Polytech2026!';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function seedAdmin(): void {
  const users = read<User[]>(USERS_KEY, []);
  if (!users.some((u) => u.email === ADMIN_EMAIL)) {
    users.push({
      id: 'admin',
      name: 'Équipe Administrative',
      email: ADMIN_EMAIL,
      phone: '672356441',
      level: 'Admin',
      role: 'admin',
      active: true,
      createdAt: new Date().toISOString(),
    });
    write(USERS_KEY, users);
  }
}

export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  seedAdmin();
  return read<User[]>(USERS_KEY, []);
}

export function registerUser(data: {
  name: string;
  email: string;
  phone: string;
  level: 'MSP1' | 'MSP2' | 'Cadet';
  password: string;
}): { ok: boolean; error?: string; user?: User } {
  const users = getUsers();
  const email = data.email.trim().toLowerCase();
  const phone = data.phone.trim();
  if (users.some((u) => u.email === email))
    return { ok: false, error: 'Un compte existe déjà avec cet email.' };
  if (users.some((u) => u.phone === phone && phone !== ''))
    return { ok: false, error: 'Un compte existe déjà avec ce numéro de téléphone.' };
  const user: User = {
    id: `u-${Date.now()}`,
    name: data.name.trim(),
    email,
    phone,
    level: data.level,
    role: 'student',
    active: true,
    createdAt: new Date().toISOString(),
  };
  users.push({ ...user });
  write(USERS_KEY, users);
  write(`${USERS_KEY}:pass`, { ...read<Record<string, string>>(`${USERS_KEY}:pass`, {}), [email]: btoa(data.password) });
  setSession(user);
  return { ok: true, user };
}

export function login(identifier: string, password: string): { ok: boolean; error?: string; user?: User } {
  const users = getUsers();
  const id = identifier.trim().toLowerCase();
  const user = users.find((u) => u.email === id || u.phone === identifier.trim());
  if (!user) return { ok: false, error: 'Aucun compte trouvé avec cet identifiant.' };
  if (!user.active) return { ok: false, error: 'Ce compte a été désactivé. Contactez l’équipe.' };
  const store = read<Record<string, string>>(`${USERS_KEY}:pass`, {});
  const stored = user.id === 'admin' ? btoa(ADMIN_PASSWORD) : store[user.email];
  if (stored !== btoa(password)) return { ok: false, error: 'Mot de passe incorrect.' };
  setSession(user);
  return { ok: true, user };
}

export function setSession(user: User) {
  write(SESSION_KEY, user);
}

export function getSession(): User | null {
  if (typeof window === 'undefined') return null;
  return read<User | null>(SESSION_KEY, null);
}

export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function updateUserProfile(email: string, patch: { name?: string; phone?: string; level?: 'MSP1' | 'MSP2' | 'Cadet' | 'Admin' }): void {
  const users = getUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) return;
  users[idx] = { ...users[idx], ...patch };
  write(USERS_KEY, users);
  const session = getSession();
  if (session && session.email === email) setSession(users[idx]);
}

export function getHistory(email: string): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  return read<HistoryEntry[]>(HISTORY_KEY(email), []);
}

export function addHistory(email: string, entry: Omit<HistoryEntry, 'id' | 'at'>) {
  if (typeof window === 'undefined') return;
  const list = getHistory(email);
  list.unshift({ ...entry, id: `h-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, at: new Date().toISOString() });
  write(HISTORY_KEY(email), list.slice(0, 100));
}

export function getRequests(): AccessRequest[] {
  if (typeof window === 'undefined') return [];
  return read<AccessRequest[]>(REQUESTS_KEY, []);
}

export function addRequest(req: Omit<AccessRequest, 'id' | 'at' | 'status'>): AccessRequest {
  const list = getRequests();
  const full: AccessRequest = {
    ...req,
    id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
    status: 'new',
  };
  list.unshift(full);
  write(REQUESTS_KEY, list);
  return full;
}
