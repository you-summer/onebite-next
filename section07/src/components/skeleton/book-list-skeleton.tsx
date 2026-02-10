import BookItemSkeleton from "./book-item-skeleton";

export default function BookListSkeleton({ count }: { count: number }) {
  return new Array(count).fill(0).map((_, idx) => {
    return <BookItemSkeleton key={`book-item-skeleton-${idx}`} />;
  });
}
//일단 0이라는 값으로 채워진 count길이의 배열이 자동 생성됨
