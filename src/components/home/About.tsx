"use client";

import Link from "next/link";
import Button from "../Button";
import Image from "next/image";
import Slider from "react-slick";

const slider1 = [
  {
    name: "LPG News",
    description:
      "Never worry about being out of touch, as you get updated News on the LPG Industry, Social Media updates, and latest Industry developments. ",
    icon: "/lpg.svg",
  },
  {
    name: "HSEQ",
    description:
      "Get detailed Quarterly product quality test results across Nigeria (West Africa) to align your Business to standard Health, Safety, Environmental, and Quality practices ",
    icon: "/hseq.svg",
  },
  {
    name: "Pricing",
    description:
      "Access granular supply and demand pricing to make informed Business decisions.",
    icon: "/pricing.svg",
  },
  {
    name: "Terminals",
    description:
      "Get information on major Gas Terminals: Location, Capacity, Operational activity, and Inventory.",
    icon: "/terminals.svg",
  },
  {
    name: "Shipping",
    description:
      "Track important cargo by cargo information: ship call ports and jetty information.",
    icon: "/shipping.svg",
  },
];

const slider2 = [
  {
    name: "Producer",
    description:
      "Want to get information on major Gas Processing plants? We show you the production centre’s information, both inland and coastal.",
    icon: "/producer.svg",
  },
  {
    name: "Refinery",
    description:
      "Get updated details on the Refinery Operational status,and loading activities.",
    icon: "/refinery.svg",
  },
  {
    name: "Trucking",
    description:
      "Calculate LGP Logistics cost; track Gas products movement by Trucks; see available LGP Trucks population and Truck type.",
    icon: "/trucking.svg",
  },
  {
    name: "Plants",
    description:
      "Spot both Wholesales and Retails Pricing by plants; Access nation-wide Gas plants information by location and capacity.",
    icon: "/plants.svg",
  },
  {
    name: "Market",
    description:
      "Get insight to Market Reports by Region, State, LGA, etc. Switch between different Product types, Cylinder types, etc.",
    icon: "/market.svg",
  },
];

const About = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 5000,
        settings: {
          slidesToShow: 3,
        },
      },

      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          speed: 7000,
        },
      },
    ],
  };

  return (
    <>
      <section id="about" className="flex items-center justify-center py-12">
        <div className="w-full md:max-w-[90%] lg:max-w-[650px] xl:max-w-[866px] p-5 lg:px-5 z-[1] flex flex-col gap-6">
          <h1 className="text-[40px] leading-[48px] lg:leading-[52.5px] font-bold text-center">
            Empower Your Business with real-time Market Insights and In-Depth
            Analytics 
          </h1>
          <p className="text-lg lg:text-xl lg:leading-[30px] text-center font-normal xl:px-11">
            Get accurate and timely Industry data across Nigeria (West Africa)
            delivered to you. Our Market Information Services are designed to
            equip your Business with the right data and insights you need to
            navigate the complex landscape in the Oil and Gas industry in
            Nigeria (Africa)
          </p>
        </div>
      </section>
      <section className="pb-12">
        <div className="app-width flex flex-col gap-6">
          <Slider {...settings}>
            {slider1.map((i, idx) => (
              <div key={idx} className="px-3">
                <div className="border border-[#003366] shadow-xs rounded-md p-4 min-h-[190px]">
                  <div className="flex items-center gap-3">
                    <Image
                      src={i.icon ?? "/hseq.svg"}
                      width={43}
                      height={43}
                      alt=""
                    />
                    <h5 className="text-2xl text-black font-bold">{i.name}</h5>
                  </div>
                  <p className="mt-3 text-black">{i.description}</p>
                </div>
              </div>
            ))}
          </Slider>
          <Slider {...settings} rtl={true}>
            {slider2.map((i, idx) => (
              <div key={idx} className="px-3">
                <div className="border border-[#003366] shadow-xs rounded-md p-4 min-h-[190px]">
                  <div className="flex items-center gap-3">
                    <Image
                      src={i.icon ?? "/hseq.svg"}
                      width={43}
                      height={43}
                      alt=""
                    />
                    <h5 className="text-2xl text-black font-bold">{i.name}</h5>
                  </div>
                  <p className="mt-3 text-black">{i.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default About;
