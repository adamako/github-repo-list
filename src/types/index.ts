export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  created_at: string;
  owner: Owner;
}

export interface Owner {
  login: string;
  avatar_url: string;
  html_url: string;
}
