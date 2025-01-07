"use client";

import Link from "next/link";
import Button from "../Button";
import Image from "next/image";
import Slider from "react-slick";

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
      <section id="home" className="flex-center flex-col relative py-[60px] bg-[url('/mask.png')] bg-no-repeat bg-top">
        <div className="w-full md:max-w[90%] lg:max-w-[625px] p-5 lg:px-0 z-[1] flex flex-col gap-6">
          <h1 className="text-[34px] leading-[1.3em] lg:text-[42px] lg:leading-[55px] font-medium text-center">
            Your Gateway to Seamless{" "}
            <span className="italic text-primary-500">Learning</span> Anywhere,
            Anytime.
          </h1>
          <p className="text-lg lg:text-2xl text-center text-grey-200 lg:leading-[30px] font-[300] xl:px11">
            Empowering Nigerian Students with Innovative E-Learning
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/sign-up">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
        <div className="flex-center">
          <img src="mock.png" alt="mock dashboard" />
        </div>
      </section>
    </>
  );
};

export default Hero;
