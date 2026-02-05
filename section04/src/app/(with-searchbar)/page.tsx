import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "no-store" },
    // no-store : 데이터 페칭의 결과를 저장하지 않는 옵션, 캐싱을 아예 하지 않도록 설정하는 옵션
    // force-cache : 요청의 결과를 무조건 캐싱함, 한번 호출 된 이후에는 다시는 호출되지 않음
    // revalidate : 특정 시간을 주기로 캐시를 업데이트함, 마치 Page Router의 ISR방식과 유사함
    // next:{tags:['a']} : On-Demand Revalidate , 요청이 들어왔을 때 데이터를 최신화함
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => {
        return <BookItem key={book.id} {...book} />;
      })}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } },
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((recoBook) => {
        return <BookItem key={recoBook.id} {...recoBook} />;
      })}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
