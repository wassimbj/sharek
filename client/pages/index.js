import Image from "next/image";
import { ExternalLink } from "react-feather";

export default function IndexPage() {
  return (
    <div className="max-w-lg mx-auto">
      <a href="#" className="z-0 relative block hover:bg-gray-50 p-5 shadow mb-5 rounded-lg max-w-full overflow-hidden">
        <ExternalLink className="absolute right-1 top-1 text-gray-400" size={15} />
        <div className="flex items-center flex-row overflow-hidden">
          <span style={{minWidth: "50px"}} className="w-12 h-12 right-3 rounded-lg align-baseline block min-w-max bg-purple-500"></span>
          <div className="ml-2">
            <p className="font-semibold text-lg truncate"> A Complete Beginner's Guide to Next.js </p>
            <span className="bg-gray-100 text-gray-600 mt-1 text-sm px-3 py-1 inline-block rounded-full">Software</span>
          </div>
        </div>
      </a>
    </div>
    //   {/* <Image
    //     src="/team-of-critters.svg"
    //     alt="Four one-eyed aliens playing"
    //     width={576}
    //     height={429.734}
    //     priority
    //   />

    //   <h2 className="p-3 font-bold bg-yellow-300 md:text-2xl">
    //     Hi! Welcome to your first Next.js site.
    //   </h2> */}
    // {/* </div> */}
  );
}
