import React from "react";
import { ExternalLink } from "react-feather";

export default function LinkCard({ image, url, title, categories }) {
  const randomColor = Math.round(0xffffff * Math.random()).toString(16);
  return (
    <a
      href={url}
      target="_blank"
      className="z-0 relative bg-white block hover:bg-gray-50 p-5 shadow mb-5 rounded-lg max-w-full overflow-hidden"
    >
      <ExternalLink
        className="absolute right-1 top-1 text-gray-400"
        size={15}
      />
      <div className="flex items-center flex-row overflow-hidden">
        {!image ? (
          <span
            style={{
              minWidth: "80px",
              background: `#${randomColor}`,
            }}
            className="w-20 h-20 right-3 rounded-lg align-baseline block min-w-max"
          ></span>
        ) : (
          <img
            src={image}
            style={{ minWidth: "80px" }}
            className="w-20 h-20 border rounded-lg inline-block align-baseline object-cover min-w-max right-3"
          />
        )}
        <div className="ml-4 overflow-hidden">
          <p className="font-semibold text-lg truncate">{title}</p>
          {categories
            .split(",")
            .map((category) =>
              !category ? null : (
                <span className="mr-1 bg-gray-100 text-gray-600 mt-1 text-sm px-3 py-1 inline-block rounded-full">
                  {category}
                </span>
              )
            )}
        </div>
      </div>
    </a>
  );
}
