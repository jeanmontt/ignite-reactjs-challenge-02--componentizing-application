import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface NavigationContextProviderProps {
  children: ReactNode;
}

interface NavigationContextProps {
  selectedGenreId: number;
  movies: MovieProps[];
  selectedGenre: GenreResponseProps;
  setSelectedGenreId: (id: number) => void;
}

export const NavigationContext = createContext({} as NavigationContextProps);

export function NavigationContextProvider({ children }: NavigationContextProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <NavigationContext.Provider value={
      {
        selectedGenreId,
        movies,
        selectedGenre,
        setSelectedGenreId,
      }
    }>
      {children}
    </NavigationContext.Provider>
  );
}