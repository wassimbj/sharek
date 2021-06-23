import Link from "next/link";
import { useRef, useState } from "react";
import cn from "classnames";
import Image from "next/image";
import { Button, Dropdown, Flex, IconButton } from "gestalt";
import AddLinkModal from "./AddLinkModal";
import Router from "next/router";
import { useMutation, useQuery } from "react-query";
import axi from "config/axios";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openAddLink, setOpenAddLink] = useState(false);
  const anchorRef = useRef(null);

  const { isLoading, data, isError, error } = useQuery(
    "getLoggedInUser",
    () => {
      return axi.get("/isauth");
    }
  );
    // console.log(isLoading, isError)
  const logOut = useMutation(() => axi.post("/logout"), {
    onError: (err, _, __) => {
      console.log("Logging out error: ", err);
    },
    onSuccess: (data) => {
      // console.log(data);
      Router.reload();
    },
  });

  return (
    <>
      <header className="bg-gray-600">
        <div className="flex flex-wrap items-center justify-between lg:container px-4 py-3 mx-auto md:flex-no-wrap md:px-6">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-lg md:text-xl font-bold ml-3 text-white">
                Sharek
              </a>
            </Link>
          </div>
          <ul
            className={cn(
              "md:flex flex-col md:flex-row md:items-center md:justify-center text-sm w-full md:w-auto"
            )}
          >
            {isLoading || isError ? (
              <li className="mx-2">
                <Link href="/login">
                  {/* <Button text="Login" color="blue" /> */}
                  Login
                </Link>
              </li>
            ) : !data.data ? (
              <li className="mx-2">
                <Link href="/login">
                  Login
                  {/* <Button text="Login" color="blue" /> */}
                </Link>
              </li>
            ) : (
              <>
                <li className="mx-2 text-white">
                  <Flex justifyContent="center">
                    <IconButton
                      accessibilityControls="me"
                      accessibilityExpanded={open}
                      accessibilityHaspopup
                      accessibilityLabel="Me"
                      bgColor="gray"
                      icon="person"
                      iconColor="white"
                      onClick={() => setOpen((prevVal) => !prevVal)}
                      ref={anchorRef}
                      selected={open}
                      size="md"
                    />
                    {open && (
                      <Dropdown
                        anchor={anchorRef.current}
                        id="sections-dropdown-example"
                        onDismiss={() => setOpen(false)}
                      >
                        <Dropdown.Link
                          href={`/u/${data.data.id}`}
                          selected={false}
                          option={{ label: "Profile" }}
                        />
                        <Dropdown.Item
                          option={{ label: "Logout" }}
                          // logOut.mutate()
                          onSelect={() => logOut.mutate()}
                        />
                      </Dropdown>
                    )}
                  </Flex>
                </li>
                <li className="mx-2">
                  <IconButton
                    accessibilityControls="add-link"
                    accessibilityExpanded={open}
                    accessibilityHaspopup
                    accessibilityLabel="Add link"
                    bgColor="gray"
                    icon="add"
                    iconColor="white"
                    onClick={() => setOpenAddLink(true)}
                    ref={anchorRef}
                    selected={openAddLink}
                    size="md"
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
      {openAddLink && (
        <AddLinkModal
          onDismiss={() => setOpenAddLink(false)}
          onSuccess={() => {
            setOpenAddLink(false);
          }}
        />
      )}
    </>
  );
}
