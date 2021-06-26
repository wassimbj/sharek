import Loader from "@components/Loader";
import UserLinks from "@components/UserLinks";
import axi from "config/axios";
// import axi from "config/axios";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
// import { useQuery } from "react-query";

export default function Profile(props) {
  const router = useRouter();
  const userId = router.query.id;
  const { isLoading, data: user } = useQuery("userProfile", () =>
    axi.get(`/user/${userId}`)
  );

  if (isLoading || !router.isReady) {
    return <Loader />;
  }

  return (
    <div className="max-w-xl mx-auto text-center mt-10">
      <div className="px-2 py-5 shadow bg-white rounded-lg mb-10">
        <img
          src={`https://picsum.photos/200/300?random=${user.data.id}`}
          className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
        />
        <span className="block font-semibold text-xl">{user.data.name}</span>
        <span className="block text-lg text-gray-500 mt-5">
          Joined on {String(user.data.created_at).substr(0, 10)}
        </span>
      </div>
      <UserLinks userId={userId} />
    </div>
  );
}
