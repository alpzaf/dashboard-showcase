import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export const Layout = ({ children }: JSX.Element) => {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </ThemeProvider>
      <ThemeSwitcher />
      <Analytics />
      <Toaster />
    </>
  );
};
