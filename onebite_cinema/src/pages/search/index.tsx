import SearchLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import dummy from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import fetchMovies from "@/lib/fetch-movies";

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const q = context.query.q;
  const movies = await fetchMovies(q as string);

  return {
    props: {
      movies,
    },
  };
};

export default function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      {movies.map((movie) => {
        return <MovieItem key={movie.id} {...movie} />;
      })}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
