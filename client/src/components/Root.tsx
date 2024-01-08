import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import { useRouter } from 'next/router';

export default function Root() {
  const router = useRouter();
  const { contractAddress } = router.query;

  return (
    <div className="flex flex-col text-black dark:text-white items-center justify-between p-[96px] gap-[72px]">
      <Navbar />
      <Hero contractAddress={contractAddress as string}/>
      <Footer />
    </div>
  );
}
