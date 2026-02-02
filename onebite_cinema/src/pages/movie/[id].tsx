import { useRouter } from "next/router";
import style from "./[id].module.css";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";
import { notFound } from "next/navigation";
import Head from "next/head";

// const mockData = {
//   id: 3,
//   title: "아이유 콘서트 : 더 위닝",
//   releaseDate: "2025-01-24",
//   company: "CGV ICECON, CJ 4DPLEX",
//   genres: ["공연실황"],
//   subTitle:
//     "최초의 아이콘 아이유, 100번째 콘서트로 완성된 찬란한 기록",
//   description:
//     "최초의 아이콘 아이유, 100번째 콘서트로 완성된 찬란한 기록. 'Love wins all', '홀씨', 'Shopper', 'Celebrity', 'Last Fantasy' 등 수많은 명곡으로 서울월드컵경기장을 가득 채운 아이유와 유애나의 뜨거운 에너지와 함성. 상암 하늘을 수놓은 환상적인 드론쇼까지! 승리를 위해 달려온 여정의 마지막 챕터가 지금 스크린에서 펼쳐진다!",
//   runtime: 124,
//   posterImgUrl:
//     "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20250108_174%2F1736328720692tngqd_JPEG%2Fmovie_image.jpg",
// };

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입무비</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입무비" />
          <meta
            property="og:description"
            content="한입 무비에 등록된 영화들을 만나보세요"
          />
        </Head>
        <div>로딩중입니다</div>
      </>
    );
  }
  if (!movie) return "문제가 발생했습니다 다시 시도하세요";

  const {
    id,
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>
          {releaseDate}/{genres}
        </div>
        <div className={style.company}>{company}</div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
