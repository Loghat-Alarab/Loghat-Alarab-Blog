import { getSpecialPosts } from "@/lib/data/posts";

import PostCard from "@/components/main/post-card";

const SpecialPosts = async () => {
  const posts = await getSpecialPosts();

  return (
    <section id="special" className="my-10 sm:my-16 px-4">
      <h2 className="text-4xl font-bold text-primary">مميز</h2>
      {posts.length > 0 ? (
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {posts.map((blog) => (
            <PostCard key={blog.fields.slug} post={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center my-20 text-lg">لا يوجد بيانات لعرضها</div>
      )}
    </section>
  );
};
export default SpecialPosts;
