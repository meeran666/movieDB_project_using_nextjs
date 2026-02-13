import Image from "next/image";

function ImageTag(imageLink: string, i: number) {
  // imageLink = "/image.jpg";
  return (
    <Image
      key={i}
      src={`${imageLink}`}
      width={30}
      height={50}
      alt={`Image ${i}`}
      className="h-full w-full object-cover"
    />
  );
}

export default function ImageGrid({ imgLinks }: { imgLinks: string[] }) {
  return (
    <>
      <div
        className={`mt-10 mb-8 grid h-[30vh] w-[min(100%,40rem)] grid-cols-[6fr_7fr_1fr_4fr] grid-rows-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,6fr)] sm:h-[60vh] md:h-[40vh]`}
      >
        <div className="overflow-hidden rounded-tl-2xl bg-blue-200">
          {ImageTag(imgLinks[0], 1)}
        </div>
        <div className="col-span-2 row-span-2 overflow-hidden bg-blue-700">
          {ImageTag(imgLinks[1], 0)}
        </div>

        <div className="row-span-2 overflow-hidden rounded-tr-2xl bg-blue-900">
          {ImageTag(imgLinks[2], 2)}
        </div>
        <div className="row-span-2 overflow-hidden rounded-bl-2xl bg-blue-500">
          {ImageTag(imgLinks[3], 3)}
        </div>

        <div className="overflow-hidden bg-blue-300">
          {ImageTag(imgLinks[4], 4)}
        </div>
        <div className="col-span-2 overflow-hidden rounded-br-2xl bg-blue-700">
          {ImageTag(imgLinks[5], 5)}
        </div>
      </div>
    </>
  );
}
