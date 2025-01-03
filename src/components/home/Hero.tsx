"use client";

import Link from "next/link";
import Button from "../Button";
import Image from "next/image";
import Slider from "react-slick";

const ImageUnderlay = () => (
  <div className="absolute w-full h-full hidden lg:flex flex-col justify-between max-w-[1440px] p-3 lg:px-5 xl:px-12 mx-auto top-0 py-[120px]">
    <div className="flex justify-between px-16 xl:px-20">
      <Image src="/ellipse1.png" width={103} height={103} alt="" />
      <Image src="/ellipse4.png" width={103} height={103} alt="" />
    </div>
    <div className="flex justify-between">
      <Image src="/ellipse2.png" width={103} height={103} alt="" />
      <Image src="/ellipse5.png" width={103} height={103} alt="" />
    </div>
    <div className="flex justify-between px-16 xl:px-20">
      <Image src="/ellipse3.png" width={103} height={103} alt="" />
      <Image src="/ellipse6.png" width={103} height={103} alt="" />
    </div>
  </div>
);

const Hero = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 5000,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          speed: 6000,
        },
      },
    ],
  };

  const logos = [
    "/hyde.svg",
    "/iogc.svg",
    "/asiko.svg",
    "/seplat.svg",
    "/chimons.svg",
    "./nlpga.svg",
  ];

  return (
    <>
      <section
        id="home"
        className="bg-[#FFF9F8] flex items-center justify-center py[150px] relative hero"
      >
        <ImageUnderlay />
        <div className="w-full md:max-w-[90%] lg:max-w-[650px] xl:max-w-[866px] p-5 lg:px-5 z-[1] flex flex-col gap-6">
          <h1 className="text-[40px] leading-[48px] lg:text-5xl lg:leading-[55px] xl:text-6xl xl:leading-[72px] font-medium italic text-center">
            STOP operating your Oil and Gas Business in the dark!
          </h1>
          <p className="text-lg lg:text-xl text-center lg:leading-[30px] font-normal xl:px-11">
            HydroCIS is the most inclusive platform that helps you reduce your
            overall cost of operations; improve the visibility on your entire
            Plant operations; and provides up-to-date information that matters
            most to you as a Business owner in the Oil and Gas sector.
          </p>
          <div className="mt-8 flex justify-center gap-6 md:gap-10">
            <Link href="/sign-up">
              <Button size="lg" className="font-normal xl:w-[192px] px-6 gap-3">
                Start Free Trial{" "}
                <Image src="/arrow-right.svg" width={18} height={14.4} alt="" />
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                btnType="light"
                size="lg"
                className="font-normal xl:w-[192px] px-6"
              >
                Get A Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="py10">
        <h3 className="app-width text-xl lg:text-2xl text-center font-semibold py-10">
          You are in good company. Trusted by 100+ Oil and Gas Businesses like
          You
        </h3>
        <div className="bg-[#FFEEEB] py-4">
          <div className="app-width slider-container h-full">
            <Slider {...settings}>
              {logos.map((i, idx) => (
                <div key={idx} className="!flex items-center min-h-[90px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={i} className="bg-blue200" alt="" />
                  
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
