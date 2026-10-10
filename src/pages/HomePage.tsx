import DatePage from "@/components/Date";
import AllProductsSection from "@/components/sections/AllProductsSection";
import PriceDecreaseSection from "@/components/sections/PriceDecreaseSection";
import PriceIncreaseSection from "@/components/sections/PriceIncreaseSection";
import ProductGridSkeleton from "@/components/skeletons/ProductGridSkeleton";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const HomePage = () => {
  return (
    <main>
      <section className="my-10 bg-primary_gradient rounded-xl">
        <div className="sm:flex p-6 justify-between ">
          <div className="flex flex-col justify-center text-center sm:text-left">
            <Suspense fallback="loading..">
              <span className="self-start bg-accent_color/10 py-1 px-3 text-sm rounded-2xl">
                <DatePage color="text-accent_color" />
              </span>
            </Suspense>
            <h1 className="sm:text-4xl text-2xl font-bold my-2 max-w-sm">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="sm:text-lg text-sm font-normal mt-2 sm:mb-10 mb-6 max-w-lg text-base-content/70">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <Link
              href="#সব-পণ্য"
              className="sm:self-start  py-px px-4 bg-accent_color text-base text-main_color flex items-center rounded-lg font-medium leading-5 h-10 hover:opacity-90 justify-center"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
          <div className=" flex justify-center items-center mt-4 sm:mt-0">
            <Image
              src="/bannerImg.png"
              width={400}
              height={400}
              alt="banner Image"
            />
          </div>
        </div>
      </section>

      <Suspense fallback={<ProductGridSkeleton />}>
        <PriceIncreaseSection />
      </Suspense>

      <Suspense fallback={<ProductGridSkeleton />}>
        <PriceDecreaseSection />
      </Suspense>

      <Suspense fallback={<ProductGridSkeleton />}>
        <AllProductsSection />
      </Suspense>
    </main>
  );
};

export default HomePage;
