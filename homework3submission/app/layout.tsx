import "./globals.css";
import styles from "./page.module.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.titleHeader}>
          <h3>Movie Explorer</h3>
        </div>
        {children}
      </body>
    </html>
  );
}