import SearchLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import style from "./index.module.css";
import dummy from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.ran3_container}>
          {dummy.slice(0, 3).map((dummyM) => {
            return <MovieItem key={dummyM.id} {...dummyM} />;
          })}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_container}>
          {dummy.map((dummyM) => {
            return <MovieItem key={dummyM.id} {...dummyM} />;
          })}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
