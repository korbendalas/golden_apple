import './globals.css';
import { UserProvider } from '@/components/contexts/user-context/UserContext';
import ToastProvider from '@/components/toasts/ToastProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
          <ToastProvider />
        </UserProvider>
      </body>
    </html>
  );
}
