import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type BlogPost = {
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  link?: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "The Future of Education: AI as a Teaching Assistant",
    date: "March 15, 2024",
    category: "EdTech",
    tags: ["AI", "Education", "Teaching"],
    summary: "Exploring how AI can augment teaching capabilities while maintaining the human touch in education.",
    link: "#"
  },
  {
    title: "Building Trust in Government Digital Services",
    date: "March 1, 2024",
    category: "Public Service",
    tags: ["GovTech", "Digital Transformation", "User Trust"],
    summary: "Insights on how to design digital government services that citizens can trust and rely on.",
    link: "#"
  },
  {
    title: "Healthcare Innovation: A Product Manager's Perspective",
    date: "February 20, 2024",
    category: "HealthTech",
    tags: ["Healthcare", "Product Management", "Innovation"],
    summary: "Lessons learned from building digital products in the healthcare sector.",
    link: "#"
  },
  {
    title: "From Chemistry Teacher to Tech Lead",
    date: "February 10, 2024",
    category: "Career",
    tags: ["Career Switch", "Personal Growth", "Leadership"],
    summary: "My journey of transitioning from teaching chemistry to leading tech teams, and the surprising similarities between both roles.",
    link: "#"
  },
  {
    title: "Large Language Models in Education",
    date: "January 25, 2024",
    category: "EdTech",
    tags: ["AI", "LLMs", "Education Technology"],
    summary: "How large language models are reshaping education and what it means for teachers and students alike.",
    link: "#"
  },
  {
    title: "The Art of Technical Communication",
    date: "January 15, 2024",
    category: "Leadership",
    tags: ["Communication", "Technical Writing", "Knowledge Sharing"],
    summary: "Strategies for explaining complex technical concepts to diverse audiences, from students to stakeholders.",
    link: "#"
  }
];

export default function Blog() {
  const navigate = useNavigate();

  return (
    <section id="blog" className="section-padding bg-[#f6f6f6]">
      <div className="container mx-auto">
        {/* Header Card */}
        <div className="bg-[rgb(43,154,154)] rounded-2xl p-8 md:p-12 mb-12 shadow-lg 
          hover:shadow-xl transition-shadow text-white">
          <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 text-white mb-4">
            Blog
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 leading-tight">
            Latest Thoughts
          </h2>
          <p className="text-lg text-white-600">
            Writing helps me organize my thoughts. Here are some of my recent reflections on technology, education, and public service.
          </p>
        </div>

        {/* View All Button */}
        <div className="flex justify-end mb-8">
          <button 
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 
              rounded-lg hover:bg-black/90 transition-colors text-sm font-medium
              transform hover:scale-105 transition-all duration-200"
          >
            View All Posts
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="text-xs text-neutral-500">{post.date}</span>
                  <span className="mx-2 text-neutral-300">•</span>
                  <span className="text-xs font-medium text-[rgb(43,154,154)]">{post.category}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                
                <p className="text-sm text-neutral-600 mb-4 flex-grow">{post.summary}</p>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {post.link && (
                    <a 
                      href={post.link}
                      className="inline-flex items-center gap-2 text-[rgb(43,154,154)] hover:text-[rgb(43,154,154)]/80 transition-colors text-sm"
                    >
                      Read more
                      <svg 
                        className="w-4 h-4" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 