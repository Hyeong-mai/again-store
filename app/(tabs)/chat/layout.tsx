export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className=" fixed top-0 mx-auto max-w-screen-sm  bg-white w-full  p-5  shadow-inner_b">
        <h1 className="text-3xl font-bold italic">CHAT</h1>
      </div>
      {children}
    </>
  );
}
