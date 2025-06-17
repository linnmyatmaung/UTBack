export type SelectionRequest = {
  name: string;
  gender: string;
  major: string;
  hobby: string;
  profileImg?: string;
};

export type SelectionResponse = {
  id: number;
  name: string;
  gender: string;
  profileImg?: string;
  major: string;
  hobby: string;
};
