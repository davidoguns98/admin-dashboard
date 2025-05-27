import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="text-2xl flex flex-col items-center justify-center ">
        <p>Hello Dave </p>
        <div className="items-center justify-center">Your are welcome</div>
      </div>
    </>
  );
}
