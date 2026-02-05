"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Searchbar() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";

  const [search, setSearch] = useState(query);
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
