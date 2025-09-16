import HeroBanner from "@/components/hero-banner/hero-banner";
import Features from "@/components/features/features";
import ShopOnBudget from "@/components/shop-on-budget/shop-on-budget";
import NewArrivals from "@/components/new-arrivals-section/new-arrivals";
import BringTheParty from "@/components/bring-the-party/bring-the-party";
import TopDemanded from "@/components/top-demanded/top-demanded";
import Certificate from "@/components/certificate/certificate";
import DownloadOurAppImage from "@/components/download-our-app/download-our-app";

export default async function Home() {
  return (
    <div className="flex flex-col gap-2">
      
      <HeroBanner />
      <Features />
      <ShopOnBudget />
      <NewArrivals />
      <BringTheParty />
      <TopDemanded />
      <Certificate />
      <DownloadOurAppImage />
    </div>
  );
}
