import React from "react";
import { Hero } from "../hero/Hero";

export const Home = ({ movies }) => {
  return( 
  <Hero movies={movies} />
  );
};
