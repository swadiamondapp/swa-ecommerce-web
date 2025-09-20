import HeroBanner from "@/components/hero-banner/hero-banner";
import Features from "@/components/features/features";
import ShopOnBudget from "@/components/shop-on-budget/shop-on-budget";
import NewArrivals from "@/components/new-arrivals-section/new-arrivals";
import BringTheParty from "@/components/bring-the-party/bring-the-party";
import TopDemanded from "@/components/top-demanded/top-demanded";
import Certificate from "@/components/certificate/certificate";
import DownloadOurAppImage from "@/components/download-our-app/download-our-app";
import Hero from "@/components/tryHero/page";
import Collection from "@/components/trycollection/page";
import Favcollection from "@/components/tryfavcollection/page";
import StoreComp from "@/components/trystore/page";
import SwaPromise from "@/components/tryswapromise/page";
import Newcollection from "@/components/trynewcollection/page";
import TopSellingCollection from "@/components/trytopsellingcollection/page";
import Ringcomponet from "@/components/tryringcomponet/page";
import Worldrec from "@/components/tryworldrecord/page";
import Galxypendant from "@/components/trygalaxypendent/page";
import Limelight from "@/components/trylimrlight/page";
import TFooter from "@/components/tryfooter/page";

export default async function Home() {
  return (
    <div className="flex flex-col">
      {/* <HeroBanner />
      <Features />
      <ShopOnBudget />
      <NewArrivals />
      <BringTheParty />
      <TopDemanded />
      <Certificate />
      <DownloadOurAppImage /> */}
      <Hero />
      <Collection />
      <Favcollection />
      <StoreComp />
      <SwaPromise />
      <Newcollection />
      <TopSellingCollection />
      <Ringcomponet />
      <Worldrec />
      <Galxypendant />
      <Limelight />
      <TFooter />
    </div>
  );
}
