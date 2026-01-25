import SearchLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import dummy from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";

export default function Page() {
  const router = useRouter();
  const q = router.query.q as string | undefined;
  const searchMovie = dummy.filter((movie) => {
    return movie.title.includes(q as string);
  });

  return (
    <div className={style.container}>
      {searchMovie.map((movie) => {
        return <MovieItem key={movie.id} {...movie} />;
      })}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
