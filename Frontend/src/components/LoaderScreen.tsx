import { Loader } from "lucide-react";

function LoaderScreen() {
  return (
    <div className="flex justify-center items-center h-screen gap-2">
      <Loader className="animate-spin" size={30} />
      <div className="loader">Loading...</div>
    </div>
  );
}

export default LoaderScreen;
