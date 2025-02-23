import Image from "next/image";

// import whiteLogo from "@/public/logo-white.svg";
import blackLogo from "@/public/logo-black.svg";
import mainLogo from "@/public/logo-main.svg";

const Logo = () => {
  return (
    <>
      <Image
        src={mainLogo}
        alt="Logo"
        width={150}
        className="hidden dark:inline w-[150px]"
      />
      <Image
        src={blackLogo}
        alt="Logo"
        width={150}
        className="dark:hidden w-[150px]"
      />
    </>
  );
};
export default Logo;
