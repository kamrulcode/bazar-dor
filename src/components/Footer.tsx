import Link from "next/link";
import React from "react";
import { FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-footer text-main_color pb-10">
      <div className="main-container text-base font-normal px-4 py-6 flex justify-between">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
      <div className="main-container flex justify-between items-center">
        <p className="text-xs">
          <span className="px-4 border-r">শর্তাবলী </span>
          <span className="px-4 border-r">গোপনীয়তা নীতি </span>
          <span className="px-4 border-r">সাহায্য কেন্দ্র </span>
          <span className="px-4">যোগাযোগ </span>
        </p>
        <div className=" flex gap-3 items-center">
          <Link
            href={"/"}
            className="flex justify-center items-center w-8 h-8 rounded-4xl bg-sky-900"
          >
            <FaFacebookF size={20} />
          </Link>
          <Link
            href={"/"}
            className="flex justify-center items-center w-8 h-8 rounded-4xl bg-sky-900"
          >
            <FaWhatsapp size={20} />
          </Link>
          <Link
            href={"/"}
            className="flex justify-center items-center w-8 h-8 rounded-4xl bg-sky-900"
          >
            <FaYoutube size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
