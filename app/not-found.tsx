import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <section>
      <h1 className="text-center my-20 text-5xl">Error 404</h1>
      <p className="text-2xl text-center">هذه الصفحة غير موجودة</p>
      <div className="my-10 flex items-center justify-center">
        <Link href="/">
          <Button>العودة للصفحة الرئيسية</Button>
        </Link>
      </div>
    </section>
  );
};
export default NotFound;
