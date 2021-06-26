import axi from "config/axios";
import React from "react";
import { useQuery } from "react-query";
import LinkCard from "./LinkCard";
import Loader from "./Loader";

export default function UserLinks({ userId }) {
  const { isLoading, data } = useQuery("userLinks", () =>
    axi.get(`/user/${userId}/links`)
  );

  if (isLoading) {
    return <Loader />;
  }

  if (data.data.length === 0) {
    return (
      <div className="px-2 py-20 rounded-lg my-10 max-w-lg mx-auto bg-white shadow text-center">
        No links shared yet...
      </div>
    );
  }

  return (
    <div>
      {data.data.map((link) => (
        <LinkCard
          categories={link.category}
          title={link.title}
          url={link.url}
          image={link.image}
        />
      ))}
    </div>
  );
}
