export type AgendaRequest = {
  time?: string;
  title: string;
  name: string;
  info: string;
  current?: boolean;
};

export type AgendaResponse = {
  id: number;
  time: string;
  title: string;
  name: string;
  info: string;
  current: boolean;
};
export type CurrentAgendaRequest = {
  time: string;
  current: boolean;
};
