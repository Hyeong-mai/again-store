export default function SearchPage() {
  return (
    <div className="mt-7 w-full p-5 flex flex-col gap-5 item-center justify-center">
      <div className="flex flex-col w-full">
        <h1 className="text-xl font-bold">최근 검색어</h1>
        <div className="flex items-center justify-between gap-3 p-5">
          <div className="px-5 py-2 text-base bg-gray-100 rounded-full">
            검색어
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h1 className="text-xl font-bold">추천 검색어</h1>
        <div className=" grid grid-cols-2 w-full p-5">
          <div className="text-base p-2 flex items-center justify-star">
            <div className="flex items-center gap-1 justify-center">
              <h1 className="text-xl font-bold">1.</h1>
              <span className="text-lg">검색어</span>
            </div>
          </div>
          <div className="text-base flex p-2 items-center justify-start">
            <div className="flex items-center gap-1 justify-center">
              <h1 className="text-xl font-bold">1.</h1>
              <span className="text-lg">검색어</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
