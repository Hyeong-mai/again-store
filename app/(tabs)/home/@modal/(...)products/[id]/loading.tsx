import CloseButton from "@/Components/CloseButton";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <div className="absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-60 left-0 top-0">
      <CloseButton />
      <div className="max-w-screen-sm bg-white h-1/auto flex-col flex justify-center w-full p-5">
        <div className="animate-pulse flex-row flex gap-10">
          <div className="aspect-square border-white-700 text-gray-200 border-4 border-dashed rounded-md flex justify-center items-center">
            <PhotoIcon className="h-28" />
          </div>
          <div className="flex gap-2 items-center">
            <div className="size-14 rounded-full bg-neutral-200" />
            <div className="flex flex-col gap-1">
              <div className="h-5 w-40 bg-neutral-200 rounded-md" />
              <div className="h-5 w-20 bg-neutral-200 rounded-md" />
            </div>
          </div>
          <div className="h-10 w-80 bg-neutral-200 rounded-md" />
        </div>
      </div>
    </div>
  );
}
