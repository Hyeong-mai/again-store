export default function UpdateForm() {
  return (
    <div className="fixed flex flex-col gap-4 bottom-0 bg-white w-full mx-auto max-w-screen-sm  shadow-inner_t p-5   *:text-green">
      <div className="w-full h-full flex  item-center  gap-5 items-center  justify-center text-lg">
        <form className="w-full">
          <button className="bg-black w-full  px-9 py-2.5 rounded-md text-white font-semibold">
            게시물 수정하기
          </button>
        </form>
      </div>
    </div>
  );
}
