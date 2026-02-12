import Link from "next/link";

export default function DropDown({ dropClicked }: { dropClicked: boolean }) {
  return (
    <>
      <div
        className={`grid overflow-hidden duration-300 ease-in-out ${dropClicked ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0">
          <Link
            href="/Introduction"
            className="block pl-7 text-[1.3rem] text-(--hamberger_child_color) hover:bg-(--sidebar_hover_color)"
          >
            Introduction
          </Link>
          <Link
            href="/DatabaseDesign"
            className="block pl-7 text-[1.3rem] text-(--hamberger_child_color) hover:bg-(--sidebar_hover_color)"
          >
            Database Design
          </Link>
          <Link
            href="/LLMSearch"
            className="block pl-7 text-[1.3rem] text-(--hamberger_child_color) hover:bg-(--sidebar_hover_color)"
          >
            LLM Search
          </Link>
        </div>
      </div>
    </>
  );
}
