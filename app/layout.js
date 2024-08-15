// app/layout.js
import "./globals.css";
import ProfileMenu from "./components/ProfileMenu.js";
import Typography from "@mui/material/Typography";


export const metadata = {
  title: "Echo",
  description: "Your App Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* Add any custom metadata or link tags here */}</head>
      <body>
        
        {children}
      </body>
    </html>
  );
}
