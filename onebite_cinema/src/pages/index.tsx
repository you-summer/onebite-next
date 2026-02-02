import SearchLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import MovieItem from "@/components/movie-item";
import fetchMovies from "@/lib/fetch-movies";
import { InferGetStaticPropsType } from "next";
import fetchRandomMovies from "@/lib/fetch-random-books";
import Head from "next/head";

export const getStaticProps = async () => {
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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입무비</title>
        <meta property="og:image" content="/ththumbnail,png" />
        <meta property="og:title" content="한입무비" />
        <meta
          property="og:description"
          content="한입 무비에 등록된 영화들을 만나보세요"
        />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
