import React from "react";
import { ExternalLink } from "react-feather";

export default function LinkCard({ url, title, categories }) {
  return (
    <a
      href={url}
      className="z-0 relative bg-white block hover:bg-gray-50 p-5 shadow mb-5 rounded-lg max-w-full overflow-hidden"
    >
      <ExternalLink
        className="absolute right-1 top-1 text-gray-400"
        size={15}
      />
      <div className="flex items-center flex-row overflow-hidden">
        <span
          style={{ minWidth: "50px" }}
          className="w-12 h-12 right-3 rounded-lg align-baseline block min-w-max bg-purple-500"
        ></span>
        <div className="ml-2">
          <p className="font-semibold text-lg truncate">{title}</p>
          {categories.split(",").map((category) => (
            <span className="mr-1 bg-gray-100 text-gray-600 mt-1 text-sm px-3 py-1 inline-block rounded-full">
              {category}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
