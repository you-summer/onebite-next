import RecoItemSkeleton from "./reco-item-skeleton";

export default function RecoListSkeleton({ count }: { count: number }) {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => {
        return <RecoItemSkeleton key={`movie-item-skeleton-${idx}`} />;
      })}
    </>
  );
}
