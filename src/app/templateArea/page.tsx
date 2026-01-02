"use client";

import Image from "next/image";

// function will_h_overlap(
//   natural_w_image: number,
//   natural_h_image: number,
//   w_box: number,
//   h_box: number,
// ) {
//   if ((natural_h_image / natural_w_image) * w_box < h_box) {
//     const inverse_ratio = natural_w_image / natural_h_image;
//     return inverse_ratio * h_box;
//   } else return w_box;
// }
export default function GridExample() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="mt-4 grid h-[60vh] w-[min(100%,40rem)] grid-cols-[6fr_7fr_1fr_4fr] grid-rows-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,6fr)] bg-blue-500">
        <div className="border-2 border-red-400 bg-amber-200">
          <img
            alt=""
            src="https://tse4.mm.bing.net/th/id/OIP.WHTPV9sSLT-4r7R3kzSukAHaFX?pid=Api"
            className="h-full w-full object-cover"
          ></img>
        </div>
        <div className="col-span-2 row-span-2 border-2 border-red-400 bg-amber-500">
          <img
            alt=""
            src="https://tse3.mm.bing.net/th/id/OIP.CY9V6FhZlceQbJ5NS-k6GwHaLM?pid=Api"
            className="h-full w-full object-cover"
          ></img>
        </div>
        <div className="row-span-2 border-2 border-red-400 bg-amber-950">
          <img
            alt=""
            src="https://tse2.mm.bing.net/th/id/OIP.2cfU1zcUj2-q7-liF76ocgHaLH?pid=Api"
            className="h-full w-full object-cover"
          ></img>
        </div>
        <div className="row-span-2 border-2 border-red-400 bg-sky-200">
          <img
            alt=""
            src="https://tse3.mm.bing.net/th/id/OIP.ajzKe1wuDdMP7Uh4EXyACgAAAA?pid=Api"
            className="h-full w-full object-cover"
          ></img>
        </div>
        <div className="border-2 border-red-400 bg-sky-500">
          <img
            alt=""
            src="https://tse2.mm.bing.net/th/id/OIP.-bY50p-QtgibS9Kknc1tigHaKf?pid=Api"
            className="h-full w-full object-cover"
          ></img>
        </div>
        <div className="col-span-2 border-2 border-red-400 bg-sky-950">
          <img
            alt=""
            src="https://tse3.mm.bing.net/th/id/OIP.7osXhfQl_cXFtvbcqMa6lAHaLH?pid=Api"
            className="h-full w-full object-cover"
          ></img>
        </div>
      </div>
    </div>
  );
}
