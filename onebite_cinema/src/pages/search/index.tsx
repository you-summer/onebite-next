import SearchLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import dummy from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types";
import Head from "next/head";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext,
// ) => {
//   const q = context.query.q;
//   const movies = await fetchMovies(q as string);

//   return {
//     props: {
//       movies,
//     },
//   };
// };

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchMovies(q as string);
    setMovies(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div className={style.container}>
      <Head>
        <title>한입무비 - 검색결과</title>
        <meta property="og:image" content="/ththumbnail,png" />
        <meta property="og:title" content="한입무비 - 검색결과" />
        <meta
          property="og:description"
          content="한입 무비에 등록된 영화들을 만나보세요"
        />
      </Head>
      {movies.map((movie) => {
        return <MovieItem key={movie.id} {...movie} />;
      })}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
