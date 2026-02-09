import style from "./reco-item-skeleton.module.css";

export default function RecoItemSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.cover_img}></div>
    </div>
  );
}
