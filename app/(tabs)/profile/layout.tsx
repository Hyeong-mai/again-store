export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className=" fixed top-0 w-full mx-auto max-w-screen-sm bg-white  p-5  shadow-inner_b">
        <h1 className="text-3xl font-bold italic">PROFILE</h1>
      </div>
      {children}
    </>
  );
}
