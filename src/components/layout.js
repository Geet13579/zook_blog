import HomeShorts from '@components/HomeShorts';

export default function MainLayout({ children }) {
  return (
    <>
      {children}

      <HomeShorts />
    </>
  );
}
