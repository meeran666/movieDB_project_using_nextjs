import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { imgPropertyObj } from "../api/types";
function ImageTag(imageLink: string, i: number, width: number) {
  // imageLink = "/image.jpg";
  return (
    <img
      key={i}
      src={`${imageLink}`}
      alt={`Image ${i}`}
      style={{ width: `${width}px`, height: "auto" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  );
}
function px_calc(x: number, y: number): number[] {
  const result = [x * 4, y * 4];
  return result;
}
function will_h_overlap(
  natural_w_image: number,
  natural_h_image: number,
  w_box: number,
  h_box: number,
) {
  if ((natural_h_image / natural_w_image) * w_box < h_box) {
    const inverse_ratio = natural_w_image / natural_h_image;
    return inverse_ratio * h_box;
  } else return w_box;
}
function percentage_cal(val: number, ratio_numerator: number) {
  return val / (ratio_numerator / 100);
}
const slots: number[][] = [
  [43.8, 39.55],
  [43.8, 73.45],
  [63.364, 64.41],
  [38.836, 64.41],
  [53.144, 48.59],
  [49.056, 48.59],
];
const grid_w = 584;
const grid_h = 452;
const val1 = percentage_cal(slots[0][0], 146);
const val2 =
  percentage_cal(slots[2][0], 146) + percentage_cal(slots[3][0], 146);
const val3 = percentage_cal(slots[2][0], 102.2);
const val4 = percentage_cal(slots[3][0], 102.2);
const val5 = percentage_cal(slots[4][0], 102.2);
const val6 = percentage_cal(slots[5][0], 102.2);
const val7 = percentage_cal(slots[0][1], 113);
const val8 = percentage_cal(slots[1][1], 113);
const val9 = percentage_cal(slots[3][1], 113);
const val10 = percentage_cal(slots[5][1], 113);
const x_partition_arr = [val1, val2, val3, val4, val5, val6];
const y_partition_arr = [val7, val8, val9, val10];
// const x_partition_arr = [30, 70, 62, 38, 52, 48];
// const y_partition_arr = [35, 65, 57, 43];

export default function ImageGrid({
  isLoadedLink,
  imgPropertyArr,
  isLoadedProperty,
  setImgPropertyArr,
  setIsLoadedProperty,
}: {
  isLoadedLink: boolean;
  imgPropertyArr: imgPropertyObj[];
  isLoadedProperty: boolean;
  setImgPropertyArr: Dispatch<SetStateAction<imgPropertyObj[]>>;
  setIsLoadedProperty: Dispatch<SetStateAction<boolean>>;
}) {
  const [isLoadedDim, setIsLoadedDim] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoadedLink) return;
    const new_slots: number[][] = [];
    for (const slot of slots) {
      new_slots.push(px_calc(slot[0], slot[1]));
    }
    const width_info: number[] = [];
    for (let i = 0; i < new_slots.length; i++) {
      const result = will_h_overlap(
        imgPropertyArr[i].imgDim[0],
        imgPropertyArr[i].imgDim[1],
        new_slots[i][0],
        new_slots[i][1],
      );
      width_info.push(result);
    }
    setImgPropertyArr((prev) =>
      prev.map((obj, index) => {
        return { ...obj, realWidthImg: width_info[index] + 5 };
      }),
    );
    debugger;
    setIsLoadedProperty(true);
    setIsLoadedDim(false);
  }, [isLoadedDim]);

  useEffect(() => {
    if (imgPropertyArr.length === 0) {
      return;
    }
    const loadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setImgPropertyArr((prev) => {
            return prev.map((obj) =>
              obj.imageLink === src
                ? { ...obj, imgDim: [img.naturalWidth, img.naturalHeight] }
                : obj,
            );
          });
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });

    Promise.all(imgPropertyArr.map((obj) => loadImage(obj.imageLink))).then(
      () => {
        setIsLoadedDim(true);
      },
    );
    setImgPropertyArr((prev) => {
      return prev;
    });
  }, [isLoadedLink]);

  return (
    <>
      {isLoadedProperty && (
        <div
          className={`mt-8 mb-8 grid h-113 w-146 rounded-2xl`}
          style={{
            gridTemplateColumns: `${x_partition_arr[0]}% ${x_partition_arr[1]}%`,
          }}
        >
          <div
            className={`grid`}
            style={{
              gridTemplateRows: `${y_partition_arr[0]}% ${y_partition_arr[1]}%`,
            }}
          >
            <div className="relative overflow-hidden rounded-tl-2xl bg-blue-200">
              {ImageTag(
                imgPropertyArr[0].imageLink,
                1,
                imgPropertyArr[0].realWidthImg,
              )}
            </div>
            <div className="relative overflow-hidden rounded-bl-2xl bg-blue-700">
              {ImageTag(
                imgPropertyArr[1].imageLink,
                0,
                imgPropertyArr[1].realWidthImg,
              )}
            </div>
          </div>
          <div
            className={`grid`}
            style={{
              gridTemplateRows: `${y_partition_arr[2]}% ${y_partition_arr[3]}%`,
            }}
          >
            <div
              className={`grid`}
              style={{
                gridTemplateColumns: `${x_partition_arr[2]}% ${x_partition_arr[3]}%`,
              }}
            >
              <div className="relative overflow-hidden bg-blue-900">
                {ImageTag(
                  imgPropertyArr[2].imageLink,
                  2,
                  imgPropertyArr[2].realWidthImg,
                )}
              </div>
              <div className="relative overflow-hidden rounded-tr-2xl bg-blue-500">
                {ImageTag(
                  imgPropertyArr[3].imageLink,
                  3,
                  imgPropertyArr[3].realWidthImg,
                )}
              </div>
            </div>
            <div
              className={`grid`}
              style={{
                gridTemplateColumns: `${x_partition_arr[4]}% ${x_partition_arr[5]}%`,
              }}
            >
              <div className="relative overflow-hidden bg-blue-300">
                {ImageTag(
                  imgPropertyArr[4].imageLink,
                  4,
                  imgPropertyArr[4].realWidthImg,
                )}
              </div>
              <div className="relative overflow-hidden rounded-br-2xl bg-blue-700">
                {ImageTag(
                  imgPropertyArr[5].imageLink,
                  5,
                  imgPropertyArr[5].realWidthImg,
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
