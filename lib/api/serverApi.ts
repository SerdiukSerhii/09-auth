import { FetchNotesResponse, Note } from '@/types/note';
import { api } from './api';
import { cookies } from 'next/headers';

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

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${noteId}`);
  return res.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};
