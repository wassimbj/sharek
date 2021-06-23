import LinkCard from "@components/LinkCard";
import axi from "config/axios";
import { Spinner } from "gestalt";
import { useEffect, useState } from "react";
// import Image from "next/image";
// import { ExternalLink } from "react-feather";
import { useQuery, useQueryClient } from "react-query";

export default function IndexPage() {
  const [page, setPage] = useState(0);
  const { isLoading, data, isError, error, isFetching } = useQuery(
    ["fetchLinks", page],
    () =>
      axi.get("/links", {
        params: { page },
      }),
    { keepPreviousData: true, staleTime: Infinity }
  );
  const LIMIT = 5;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(["fetchLinks", page + LIMIT], () =>
        axi.get("/links", {
          params: { page: page + LIMIT },
        })
      );
    }
  }, [data, page]);


  if (isLoading) {
    return (
      <div className="py-14 px-2">
        <Spinner show accessibilityLabel="Loading..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 px-2">
        <p className="p-2 bg-red-50 text-red-600 rounded-md">
          Something went wrong, please come back later...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-20 pb-20">
      {data.data.map((link) => (
        <LinkCard
          categories={link.category}
          title={link.title}
          url={link.url}
        />
      ))}

      {isFetching ? (
        <div className="py-5 flex items-center justify-center">
          <Spinner show accessibilityLabel="Loading..." />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          {page === 0 ? (
            <span className="bg-gray-200 text-gray-700 opacity-60 py-2 px-5 rounded-full font-semibold inline-block">
              Prev
            </span>
          ) : (
            <span
              onClick={() => setPage(page - LIMIT)}
              className="bg-gray-200 text-gray-700 cursor-pointer hover:opacity-80 py-2 px-5 rounded-full font-semibold inline-block"
            >
              Prev
            </span>
          )}
          {data.data.length == LIMIT ? (
            <span
              onClick={() => setPage(page + LIMIT)}
              className="bg-blue-500 text-white cursor-pointer hover:opacity-80 py-2 px-5 rounded-full font-semibold inline-blockF"
            >
              Next
            </span>
          ) : (
            <span className="bg-blue-500 bg-opacity-70 text-white py-2 px-5 rounded-full font-semibold inline-blockF">
              Next
            </span>
          )}
        </div>
      )}
    </div>
  );
}
