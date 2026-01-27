import SearchLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import dummy from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";
import fetchMovies from "@/lib/fetch-movies";
import { InferGetServerSidePropsType } from "next";
import fetchRandomMovies from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
  // const allMovies = await fetchMovies();
  // const recoMovies = await fetchRandomMovies();
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.ran3_container}>
          {recoMovies.map((movie) => {
            return <MovieItem key={movie.id} {...movie} />;
          })}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_container}>
          {allMovies.map((movie) => {
            return <MovieItem key={movie.id} {...movie} />;
          })}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
