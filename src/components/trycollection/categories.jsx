import Image from "next/image";
import Link from "next/link";
import "./page.css";

const Categories = () => {
  return (
    <>
      <div className="flex w-[31.5rem] mx-auto h-[11rem] justify-around items-center md:w-full lg:w-full lg:max-w-[83.125rem] lg:mx-auto md:h-[20.6875rem]">
        <Link
          href="/rings"
          className="group w-[6.75rem] h-[8.56rem] text-center md:w-[10rem] md:h-[12.6875rem] lg:w-[18%] lg:h-[17.6875rem] lg:flex-shrink-0 flex flex-col items-center justify-center"
        >
          <div className="w-[5rem] h-[5rem] md:w-[180px] md:h-[180px] lg:w-[12rem] lg:h-[12rem] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/try/Ellipse 7.webp"
              width={108}
              height={108}
              alt="RING"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
          <p className="text-[0.75rem] mb-0 mt-[0.5rem] pb-0 text-[#334155] md:text-[1.125rem] md:mt-[0.75rem] lg:text-[1.125rem] lg:mt-[0.75rem]">
            RING
          </p>
        </Link>
        <Link
          href="/earrings"
          className="group w-[6.75rem] h-[8.56rem] text-center md:w-[10rem] md:h-[12.6875rem] lg:w-[18%] lg:h-[17.6875rem] lg:flex-shrink-0 flex flex-col items-center justify-center"
        >
          <div className="w-[5rem] h-[5rem] md:w-[180px] md:h-[180px] lg:w-[12rem] lg:h-[12rem] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/try/Ellipse 7_2.webp"
              width={108}
              height={108}
              alt="EARRINGS"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
          <p className="text-[0.75rem] mb-0 mt-[0.5rem] pb-0 text-[#334155] md:text-[1.125rem] md:mt-[0.75rem] lg:text-[1.125rem] lg:mt-[0.75rem]">
            EARRINGS
          </p>
        </Link>
        <Link
          href="/bangles"
          className="group w-[6.75rem] h-[8.56rem] text-center md:w-[10rem] md:h-[12.6875rem] lg:w-[18%] lg:h-[17.6875rem] lg:flex-shrink-0 flex flex-col items-center justify-center"
        >
          <div className="w-[5rem] h-[5rem] md:w-[180px] md:h-[180px] lg:w-[12rem] lg:h-[12rem] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/try/Ellipse 7_3.webp"
              width={108}
              height={108}
              alt="BANGLES"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
          <p className="text-[0.75rem] mb-0 mt-[0.5rem] pb-0 text-[#334155] md:text-[1.125rem] md:mt-[0.75rem] lg:text-[1.125rem] lg:mt-[0.75rem]">
            BANGLES
          </p>
        </Link>
        <Link
          href="/bracelets"
          className="group w-[6.75rem] h-[8.56rem] text-center md:w-[10rem] md:h-[12.6875rem] lg:w-[18%] lg:h-[17.6875rem] lg:flex-shrink-0 flex flex-col items-center justify-center"
        >
          <div className="w-[5rem] h-[5rem] md:w-[180px] md:h-[180px] lg:w-[12rem] lg:h-[12rem] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/try/Ellipse 7_4.webp"
              width={108}
              height={108}
              alt="BRACELETS"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
          <p className="text-[0.75rem] mb-0 mt-[0.5rem] pb-0 text-[#334155] md:text-[1.125rem] md:mt-[0.75rem] lg:text-[1.125rem] lg:mt-[0.75rem]">
            BRACELETS
          </p>
        </Link>
      </div>

      <div className="flex w-[31.5rem] mx-auto h-[11rem] justify-around items-center md:w-full lg:w-full lg:max-w-[83.125rem] lg:mx-auto md:h-[20.6875rem]">
        <Link
          href="/necklaces"
          className="group w-[6.75rem] h-[8.56rem] text-center md:w-[10rem] md:h-[12.6875rem] lg:w-[18%] lg:h-[17.6875rem] lg:flex-shrink-0 flex flex-col items-center justify-center"
        >
          <div className="w-[5rem] h-[5rem] md:w-[180px] md:h-[180px] lg:w-[12rem] lg:h-[12rem] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/try/Ellipse 7_5.webp"
              width={108}
              height={108}
              alt="NECKLACES"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
          <p className="text-[0.75rem] mb-0 mt-[0.5rem] pb-0 text-[#334155] md:text-[1.125rem] md:mt-[0.75rem] lg:text-[1.125rem] lg:mt-[0.75rem]">
            NECKLACES
          </p>
        </Link>
        <Link
          href="/nosepins"
          className="group w-[6.75rem] h-[8.56rem] text-center md:w-[10rem] md:h-[12.6875rem] lg:w-[18%] lg:h-[17.6875rem] lg:flex-shrink-0 flex flex-col items-center justify-center"
        >
          <div className="w-[5rem] h-[5rem] md:w-[180px] md:h-[180px] lg:w-[12rem] lg:h-[12rem] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/try/Ellipse 7_6.webp"
              width={108}
              height={108}
              alt="NOSE PINS"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
            />
          </div>
          <p className="text-[0.75rem] mb-0 mt-[0.5rem] pb-0 text-[#334155] md:text-[1.125rem] md:mt-[0.75rem] lg:text-[1.125rem] lg:mt-[0.75rem]">
            NOSE PINS
          </p>
        </Link>
        <Link
          href="/pendants"
          className="group w-[6.75rem] h-[8.56rem] text-center md:w-[10rem] md:h-[12.6875rem] lg:w-[18%] lg:h-[17.6875rem] lg:flex-shrink-0 flex flex-col items-center justify-center"
        >
          <div className="w-[5rem] h-[5rem] md:w-[180px] md:h-[180px] lg:w-[12rem] lg:h-[12rem] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/try/Ellipse 7_7.webp"
              width={108}
              height={108}
              alt="PENDANTS"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
          <p className="text-[0.75rem] mb-0 mt-[0.5rem] pb-0 text-[#334155] md:text-[1.125rem] md:mt-[0.75rem] lg:text-[1.125rem] lg:mt-[0.75rem]">
            PENDANTS
          </p>
        </Link>
        <Link
          href="/charms"
          className="group w-[6.75rem] h-[8.56rem] text-center md:w-[10rem] md:h-[12.6875rem] lg:w-[18%] lg:h-[17.6875rem] lg:flex-shrink-0 flex flex-col items-center justify-center"
        >
          <div className="w-[5rem] h-[5rem] md:w-[180px] md:h-[180px] lg:w-[12rem] lg:h-[12rem] rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/try/Ellipse 7_8.webp"
              width={108}
              height={108}
              alt="CHARMS"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>
          <p className="text-[0.75rem] mb-0 mt-[0.5rem] pb-0 text-[#334155] md:text-[1.125rem] md:mt-[0.75rem] lg:text-[1.125rem] lg:mt-[0.75rem]">
            CHARMS
          </p>
        </Link>
      </div>
    </>
  );
};

export default Categories;
