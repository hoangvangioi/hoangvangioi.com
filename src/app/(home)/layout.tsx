export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <main className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16">
      {children}
    </main>
  );
}
