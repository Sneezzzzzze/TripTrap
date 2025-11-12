import RootLayoutThatConfiguresAmplifyOnTheClient from "./components/ConfigureAmplifyOnTheClient";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <RootLayoutThatConfiguresAmplifyOnTheClient>
        <body>
          {children}
        </body>
      </RootLayoutThatConfiguresAmplifyOnTheClient>
    </html>
  );
}
