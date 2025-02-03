import { getBlogPost } from '@/utils/blogLoader';

export default function BlogArticle() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      getBlogPost(slug).then(setPost);
    }
  }, [slug]);

  if (!post) return null;

  return (
    // ... rest of the component
    <div className="prose prose-lg max-w-none" 
      dangerouslySetInnerHTML={{ __html: post.content || '' }} 
    />
  );
} 