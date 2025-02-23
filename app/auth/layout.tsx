import Image from "next/image";

import authBg from "@/public/auth.svg";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <section id="auth" className="flex flex-col md:flex-row-reverse">
      <div className="bg-primary rounded-b-4xl md:rounded-none w-full h-[30dvh] md:h-full md:w-1/2 flex items-center justify-center">
        <Image
          src={authBg}
          alt="Auth"
          className="object-contain w-full h-full"
        />
      </div>
      <div className="py-14 w-full md:w-1/2 flex items-center justify-center">
        {children}
      </div>
    </section>
  );
};
export default AuthLayout;
