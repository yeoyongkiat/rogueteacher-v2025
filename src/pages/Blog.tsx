import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { blogPosts } from "../data/blog";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownUp, ChevronDown, ChevronUp } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

// Add these types at the top of the file
type SortDirection = 'asc' | 'desc' | null;
type SortField = 'date' | 'category' | null;

export default function BlogPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isGridView, setIsGridView] = useState(true);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(blogPosts.map(post => post.category)));
    return ["all", ...uniqueCategories];
  }, []);

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Update the filteredPosts memo to include sorting
  const sortedAndFilteredPosts = useMemo(() => {
    let posts = [...filteredPosts];

    if (sortField && sortDirection) {
      posts.sort((a, b) => {
        if (sortField === 'date') {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return sortDirection === 'asc' 
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        }
        if (sortField === 'category') {
          return sortDirection === 'asc'
            ? a.category.localeCompare(b.category)
            : b.category.localeCompare(a.category);
        }
        return 0;
      });
    }

    return posts;
  }, [filteredPosts, sortField, sortDirection]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Helper component for sort header
  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead 
      className={`cursor-pointer hover:bg-neutral-50 transition-colors ${
        field === 'date' ? 'w-48' : field === 'category' ? 'w-32' : ''
      }`}
      onClick={() => toggleSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortField === field ? (
          sortDirection === 'asc' ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )
        ) : (
          <ArrowDownUp className="h-4 w-4 opacity-50" />
        )}
      </div>
    </TableHead>
  );

  return (
    <Layout>
      <section className="section-padding bg-[#f6f6f6] min-h-screen">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="mt-12">
                <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs 
                  font-medium bg-[rgb(217,233,233)] text-[rgb(43,154,154)] mb-4 md:mb-6 animate-fade-in"
                >
                  Blog
                </span>
                <h1 className="text-4xl md:text-6xl font-semibold mb-6">Thoughts & Insights</h1>
                <p className="text-sm md:text-base opacity-90 max-w-2xl mb-8">
                  Writing helps me organize my thoughts. Here are some of my reflections on technology,
                  education, and public service.
                </p>

                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 
                    rounded-lg hover:bg-black/90 transition-colors text-sm font-medium"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </button>
              </div>
            </motion.div>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search by title, category, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 py-6 bg-white shadow-md hover:shadow-lg transition-shadow"
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Category Filter */}
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger 
                    className="w-[200px] bg-white shadow-md hover:shadow-lg transition-shadow h-[62px]"
                  >
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {categories.map((category) => (
                      <SelectItem 
                        key={category} 
                        value={category}
                        className="hover:bg-neutral-100"
                      >
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-2">
                  <Toggle
                    pressed={isGridView}
                    onPressedChange={() => setIsGridView(true)}
                    size="sm"
                    className="data-[state=on]:bg-neutral-100"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Toggle>
                  <Toggle
                    pressed={!isGridView}
                    onPressedChange={() => setIsGridView(false)}
                    size="sm"
                    className="data-[state=on]:bg-neutral-100"
                  >
                    <List className="h-4 w-4" />
                  </Toggle>
                </div>
              </div>

              {/* Search Results Count */}
              <div className="text-center mt-4 text-sm text-neutral-600">
                Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                {selectedCategory !== "all" && (
                  <span> in {selectedCategory}</span>
                )}
              </div>
            </div>
          </div>

          {/* Blog Posts Container */}
          {isGridView ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedAndFilteredPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative p-8"
                >
                  {post.isOldArticle && (
                    <div className="absolute -top-3 -right-3 bg-black text-white text-xs font-medium px-3 py-1 
                      rounded-full shadow-lg transform rotate-12"
                    >
                      2023 Format
                    </div>
                  )}

                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <span className="text-xs text-neutral-500">{post.date}</span>
                      <span className="mx-2 text-neutral-300">•</span>
                      <span className="text-xs font-medium text-[rgb(43,154,154)]">{post.category}</span>
                    </div>
                    
                    <h3 className="font-semibold mb-3 text-xl">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-neutral-600 mb-4">{post.summary}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-block px-2 py-1 text-xs font-medium 
                            bg-neutral-100 text-neutral-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {post.content && (
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-[rgb(43,154,154)] 
                          hover:text-[rgb(43,154,154)]/80 transition-colors text-sm"
                      >
                        Read More
                        <svg 
                          className="w-4 h-4" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <SortableHeader field="date">Date</SortableHeader>
                    <TableHead>Article</TableHead>
                    <SortableHeader field="category">Category</SortableHeader>
                    <TableHead className="w-48">Tags</TableHead>
                    <TableHead className="w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAndFilteredPosts.map((post, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-sm text-neutral-500">
                        {post.date}
                      </TableCell>
                      <TableCell>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                          <p className="text-sm text-neutral-600">{post.summary}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium text-[rgb(43,154,154)]">
                          {post.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-block px-2 py-1 text-xs font-medium 
                                bg-neutral-100 text-neutral-600 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {post.content && (
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-[rgb(43,154,154)] 
                              hover:text-[rgb(43,154,154)]/80 transition-colors text-sm"
                          >
                            Read
                            <svg 
                              className="w-4 h-4" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </Layout>
  );
} 