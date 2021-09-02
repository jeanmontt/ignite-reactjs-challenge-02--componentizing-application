import { useContext } from "react";
import { NavigationContext } from "../contexts/NavigationContext";

import '../styles/header.scss';

export function Header() {
  const { selectedGenre } = useContext(NavigationContext);

  return (
    <header>
      <span className="category">
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>
  );
}