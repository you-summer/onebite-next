import SearchLayout from "@/components/searchable-layout";
import { ReactNode } from "react";

export default function Home() {
  return (
    <>
      <h1>ONEBITE CINEMAddd</h1>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
