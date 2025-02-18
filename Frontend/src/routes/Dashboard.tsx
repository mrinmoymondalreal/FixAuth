import Header from "@/components/Header";
import { setTitle } from "@/components/PageTitle";
import { userObject } from "@/lib/types";
import { redirect, useLoaderData } from "react-router-dom";

export async function loader() {
  const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
    credentials: "include",
  });
  if (resp.status === 200) return { user: await resp.json() };
  return redirect("/auth/sign-in");
}

function Page() {
  const { user } = useLoaderData() as { user: userObject };

  console.log(user);

  setTitle("Dashboard");

  return (
    <>
      <Header user={user} />
      <main className="mt-6 px-6 md:px-4 max-w-7xl mx-auto flex flex-col">
        <div className="flex justify-between">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 w-fit">
            Profile
          </h2>
        </div>
        <div className="my-6 grid gap-4 justify-start">
          <div className="text-xl font-bold">This is a protected Route</div>
          <div>
            <span className="font-bold">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-bold">Username:</span> {user.username}
          </div>
          <div>
            <span className="font-bold">Email:</span> {user.email}
          </div>
        </div>
      </main>
    </>
  );
}

export const element = <Page />;
