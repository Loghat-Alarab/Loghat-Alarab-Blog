import LoadingPosts from "@/components/main/loading-posts";

const LatestLoader = () => {
  return (
    <section className="my-10 sm:my-16 px-4">
      <h2 className="text-4xl font-bold text-primary">أحدث الأعمال</h2>
      <LoadingPosts />
    </section>
  );
};
export default LatestLoader;
