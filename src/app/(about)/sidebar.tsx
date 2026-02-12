import Link from "next/link";

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
    <div className="sticky top-0 h-screen flex-col items-center border-l-2">
      <div className="flex flex-col items-center pt-5">
        <div className="mx-2 flex w-60 pl-2 text-2xl text-white">About</div>
        {menuItems.map((item, id) => (
          <Link
            key={id}
            className={`mx-2 flex w-60 rounded-sm pl-2 text-xl hover:bg-gray-800 ${item.path == activeItem ? "bg-gray-800 text-emerald-500" : null}`}
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
