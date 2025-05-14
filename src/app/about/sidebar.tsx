import Link from "next/link";
import React from "react";

export default function Sidebar({
  menuItems,
  handleItemClick,
  activeItem,
}: {
  menuItems: {
    path: string;
    name: string;
  }[];
  handleItemClick: (path: string) => void;
  activeItem: string | undefined;
}) {
  return (
    <div className="sticky top-0 h-190 flex-col items-center bg-[green]">
      <div className="flex flex-col items-center pt-5">
        <div className="mx-2 flex w-60 pl-2 text-2xl text-white">About</div>
        {menuItems.map((item, id) => (
          <Link
            key={id}
            className={`mx-2 flex w-60 pl-2 text-xl text-white hover:rounded-[5px] hover:bg-green-500 ${item.path == activeItem ? "bg-[red]" : null}`}
            onClick={() => handleItemClick(item.path)}
            href={item.path}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
