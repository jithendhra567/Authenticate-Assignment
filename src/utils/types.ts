export type MovieType = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  watchListName?: string
}

export type UserDetailsType = {
  watchList: string[]
  movieList: MovieType[]
  movieMap: any
}