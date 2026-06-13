import { FetchNotesResponse, NewNoteBody, Note } from '@/types/note';
import { api } from './api';
import { User } from '@/types/user';

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>(`/notes`, {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });

  return res.data;
};

export const createNote = async (newNote: NewNoteBody) => {
  const res = await api.post<Note>('/notes', newNote);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await api.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${noteId}`);
  return res.data;
};

export const register = async (registerData: RegisterRequest) => {
  const res = await api.post<User>(`/auth/register`, registerData);
  return res.data;
};

export const login = async (loginData: LoginRequest) => {
  const res = await api.post<User>('/auth/login', loginData);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const res = await api.get<User>('/auth/me');
  return res.data;
};
