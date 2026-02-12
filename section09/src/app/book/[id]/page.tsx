import NotFound from "@/app/not-fount";
import style from "./page.module.css";
import { BookData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";

// export const dynamicParams = false;
export async function generateStaticParams() {
  // 정적인 파라미터를 생성하는 함수
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const books: BookData[] = await response.json();

  return books.map((book) => ({
    id: book.id.toString(),
  }));

  // return [{ id: "1" }, { id: "2" }, { id: "3" }];
  /**
   * 주의할점
   * 1. 파라미터값을 명시할때는 무조건 문자열""
   * 2. generateStaticParams() 함수를 내보내주게 되면 페이지 컴포넌트 내부에 데이터 캐싱이 설정되지 않은
   *    이러한 데이터 패칭이 존재하게 될지라도 무조건 해당하는 페이지가 스태틱 페이지로서 강제로 설정이 됨
   */
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
    { cache: "force-cache" },
  );
  if (!response.ok) {
    console.log("Error status:", response.status); // 확인용
    if (response.status === 404) {
      console.log("✅ notFound() 호출됨!"); // 이게 찍히는지 확인!
      NotFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image
          src={coverImgUrl}
          height={300}
          width={240}
          alt={`도서 ${title}의 표지 이미지`}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } },
  );
  if (!response.ok) {
    throw new Error(`review fetch faild : ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => {
        return <ReviewItem key={`review-item-${review.id}`} {...review} />;
      })}
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    { cache: "force-cache" },
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const book: BookData = await response.json();

  return {
    title: `${book.title} - 한입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
