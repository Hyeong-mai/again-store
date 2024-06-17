// "use client";
// import Header from "@/Components/header";
// import MenuBar from "@/Components/menu-bar";
// import SearchBox from "@/Components/search-box";
import TabBar from "@/Components/tab-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
