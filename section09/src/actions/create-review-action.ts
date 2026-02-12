"use server";

import { revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  // console.log("server action cold");
  // console.log(formData);
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  //   console.log(bookId, content, author);

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      },
    );
    console.log(response.status);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`); // 넥스트 서버가 자동으로 재검증(다시생성)하게됨
    // // 오직 서버측에서만 쓸수있음

    // // 2. 특정 경로의 모든 동작 페이지를 재검증
    // revalidatePath("/book/[id]", "page");

    // // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath("/(with-searchbar)", "layout");

    // // 4. 모든 데이터 재검증
    // revalidatePath("/", "layout");

    // 5. 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    // console.error(err);
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다 : ${err}`,
    };
  }
}
