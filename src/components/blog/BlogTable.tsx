import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { SortOption } from "@/lib/blog";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface BlogTableProps {
  posts: BlogPost[];
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
}

export function BlogTable({ posts, sortBy, setSortBy }: BlogTableProps) {
  const navigate = useNavigate();

  const toggleSort = (column: 'title' | 'date') => {
    if (column === 'title') {
      setSortBy(sortBy === 'title-asc' ? 'title-desc' : 'title-asc');
    } else if (column === 'date') {
      setSortBy(sortBy === 'date-asc' ? 'date-desc' : 'date-asc');
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button 
              variant="ghost" 
              onClick={() => toggleSort('title')}
              className="flex items-center gap-1 h-8 px-2"
            >
              Title
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>Category</TableHead>
          <TableHead>
            <Button 
              variant="ghost" 
              onClick={() => toggleSort('date')}
              className="flex items-center gap-1 h-8 px-2"
            >
              Date
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow 
            key={post.id}
            className="cursor-pointer hover:bg-neutral-50"
            onClick={() => navigate(`/blog/${post.slug}`)}
          >
            <TableCell>
              <div>
                <div className="font-medium">{post.title}</div>
                <div className="text-sm text-neutral-500 line-clamp-1">
                  {post.summary}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-neutral-50">
                {post.category}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(post.date)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 