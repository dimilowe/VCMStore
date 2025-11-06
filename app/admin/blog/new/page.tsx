import { BlogPostEditor } from "@/components/BlogPostEditor";

export default function NewBlogPostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create New Blog Post</h1>
        <p className="text-muted-foreground">Write and publish your blog content</p>
      </div>
      
      <BlogPostEditor />
    </div>
  );
}
