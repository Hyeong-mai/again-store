export default function MenuBar() {
  return (
    <div className="w-full gird grid-cols-3 grid-flow-row">
      <button className="border-r-2 text-green-400 font-bold">전체</button>
      <button>패션의류/잡화</button>
      <button>가전디지털</button>
      <button>주방용품</button>
      <button>홈인테이러</button>
    </div>
  );
}
