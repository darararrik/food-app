import { Outlet } from "react-router";

import styles from "./App.module.scss";
import Header from "@/components/Header";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
