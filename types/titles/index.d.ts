export type TitleResults = {
  page: number;
  results: Array<ObjectDetails>;
  total_pages: number;
  total_results: number;
};

export type Title = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string?;
  name: string?;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: Array<number>;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};


export interface ModifiedTitle {
  id: number;
  title: string;
  type: string;
  released: Date | null;
  vote_average: number | null;
  genres: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
}