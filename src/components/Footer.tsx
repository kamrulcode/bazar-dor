import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-footer_gradient text-slate-300 ">
      <div className="border-b border-sky-900">
        <div className="main-container text-sm font-normal px-4 py-4 flex justify-between">
          <p className="flex items-center">
            <Image src={"/logo.png"} alt="logo footer" width={30} height={30} />
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </div>
      <div className="">
        <div className="main-container flex justify-between items-center py-5">
          <p className="text-xs cursor-pointer">
            <span className="px-4 border-r">শর্তাবলী </span>
            <span className="px-4 border-r">গোপনীয়তা নীতি </span>
            <span className="px-4 border-r">সাহায্য কেন্দ্র </span>
            <span className="px-4">যোগাযোগ </span>
          </p>
          <div className=" flex gap-3 items-center">
            <Link
              href={"https://www.facebook.com/kamrulliislam"}
              target="_blank"
              className="flex justify-center items-center w-8 h-8 rounded-4xl bg-sky-900"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href={"https://www.facebook.com/kamrulliislam"}
              target="_blank"
              className="flex justify-center items-center w-8 h-8 rounded-4xl bg-sky-900"
            >
              <FaWhatsapp size={20} />
            </Link>
            <Link
              href={"https://www.facebook.com/kamrulliislam"}
              target="_blank"
              className="flex justify-center items-center w-8 h-8 rounded-4xl bg-sky-900"
            >
              <FaYoutube size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
