import ServerComponent from "@/components/server-component";
import ClientComponent from "../../components/client-component";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스 페이지
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}

// 서버에서 할수있었던 보안작업 데이터패칭작업을 진행할수잇는데
// 브라우저에서만 할수있는일들은 컴포넌트에서 할 수 없음 (ex리액트 훅스 useEffect 이런거)

// 상호작용이 있어야하면 - 클라이언트
// 그렇지 않다면 서버!

// ex) 한입북스
/**
 * 헤더나 추천도서섹션 모든도서 섹션 서버컴포넌트
 * 북아이템 서버컴포넌트 - 클릭하니까 상호작용아닌가요?-> LINK는 HTML고유의 기능이라서
 * 자바스크립트 기능을 활용하는 상호작용은 아님
 * 클라이언트 -> 서치바!
 *
 */
