import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function loader() {
  return null;
}

function Header() {
  return (
    <div className="border-b border-gray-400 w-full flex flex-row gap-8 gap-x-12 md:py-8 py-4 px-6 md:px-4 justify-between items-center max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <Link to="/">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            FixAuth
          </h1>
        </Link>
        <span>|</span>
        <h2 className="text-lg md:text-xl font-semibold tracking-tight">
          Home
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <Button className="bg-red-500 text-white" asChild>
          <Link to="/auth/sign-in">Get Started</Link>
        </Button>
        <Button asChild>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary-background">
      <Header />
      <div className="flex flex-col items-center justify-center h-full gap-8  w-full">
        <div className="text-6xl font-bold text-center space-y-3">
          <div>Auth Trial</div>
          <div>Showcase skills of individual</div>
        </div>
        <div>
          <Button size={"lg"} asChild>
            <Link to="/auth/sign-in">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const element = <Page />;
