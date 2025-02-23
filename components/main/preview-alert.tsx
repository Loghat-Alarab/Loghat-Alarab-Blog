import Link from "next/link";

const PreviewAlert = () => {
  return (
    <div className="mb-4 bg-destructive text-destructive-foreground p-4 text-2xl text-center rounded-md space-y-4">
      <p>انت الآن في وضع العرض !</p>
      <p>
        <Link
          href="/api/disable-draft"
          className="underline duration-300 transition-colors hover:text-primary"
        >
          العودة للوضع العادي
        </Link>
      </p>
    </div>
  );
};
export default PreviewAlert;
