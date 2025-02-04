import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid2X2, List, Search, LayoutGrid } from "lucide-react";
import { SortOption, ViewType } from "@/lib/blog";

interface FilterBarProps {
  viewType: ViewType;
  setViewType: (type: ViewType) => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
  search: string;
  setSearch: (search: string) => void;
  category?: string;
  setCategory: (category: string | undefined) => void;
  categories: string[];
}

export function FilterBar({
  viewType,
  setViewType,
  sortBy,
  setSortBy,
  search,
  setSearch,
  category,
  setCategory,
  categories
}: FilterBarProps) {
  return (
    <div className="space-y-4 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <Input
          type="text"
          placeholder="Search posts, categories & tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex justify-between items-center gap-4">
        <Select
          value={category || 'all'}
          onValueChange={(value) => setCategory(value === 'all' ? undefined : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-white border shadow-md">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Button
            variant={viewType === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewType('grid')}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewType === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewType('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 