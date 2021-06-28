import React from "react";
import { ExternalLink } from "react-feather";

export default function LinkCard({
  image,
  url,
  title,
  categories,
  userName,
  userId,
}) {
  const randomColor = Math.round(0xffffff * Math.random()).toString(16);
  return (
    <div className="bg-white p-5 shadow mb-5 rounded-lg max-w-full">
      <div className="z-0 relative block overflow-hidden max-w-full">
        <ExternalLink
          className="absolute right-1 top-1 text-gray-400"
          size={15}
        />
        <div className="flex flex-row overflow-hidden">
          <img
            src={!!image ? image : '/link.png'}
            style={{ minWidth: "80px" }}
            className="w-20 h-20 border rounded-lg inline-block align-baseline object-cover min-w-max right-3"
          />
          <div className="ml-4 overflow-hidden text-left">
            <a
              href={url}
              target="_blank"
              className="font-semibold text-lg truncate hover:text-blue-700 block"
            >
              {title}
            </a>
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
      </div>
      {userId && userName && (
        <div className="mt-1 text-right">
          <span className="text-gray-500">shared by</span>
          <a
            href={`/user/${userId}`}
            className="inline-block font-semibold text-gray-700 ml-1 hover:opacity-75"
          >
            {userName}
          </a>
        </div>
      )}
    </div>
  );
}
