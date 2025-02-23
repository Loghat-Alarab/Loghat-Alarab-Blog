import PostSkeleton from "@/components/main/post-skeleton";

const SpecialLoader = () => {
  return (
    <section id="special" className="my-10 sm:my-16 px-4">
      <h2 className="text-4xl font-bold text-primary">مميز</h2>
      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </section>
  );
};
export default SpecialLoader;
