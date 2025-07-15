import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter, X, Star } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { useDebounce } from "@/hooks/usePerformance";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  isNew: boolean;
  category?: string;
  brand?: string;
}

interface AdvancedSearchProps {
  products: Product[];
  onSearchResults: (results: Product[]) => void;
}

const AdvancedSearch = ({ products, onSearchResults }: AdvancedSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const { addSearchHistory } = useStore();
  
  // Debounce search query for performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Get unique categories and brands
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  // Filter and search products
  useEffect(() => {
    let filteredProducts = [...products];

    // Text search with debounced query
    if (debouncedSearchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    // Price range filter
    filteredProducts = filteredProducts.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Category filter
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.category && selectedCategories.includes(product.category)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.brand && selectedBrands.includes(product.brand)
      );
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        selectedRatings.some(rating => Math.floor(product.rating) >= rating)
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Relevance - keep original order
        break;
    }

    onSearchResults(filteredProducts);
  }, [debouncedSearchQuery, priceRange, selectedCategories, selectedBrands, selectedRatings, sortBy, products, onSearchResults]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      addSearchHistory(searchQuery.trim());
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setSortBy("relevance");
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search products, categories, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        <Button onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedRatings.length > 0 || searchQuery) && (
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchQuery}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            </Badge>
          )}
          {selectedCategories.map(category => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {category}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => toggleCategory(category)}
              />
            </Badge>
          ))}
          {selectedBrands.map(brand => (
            <Badge key={brand} variant="secondary" className="flex items-center gap-1">
              {brand}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => toggleBrand(brand)}
              />
            </Badge>
          ))}
          {selectedRatings.map(rating => (
            <Badge key={rating} variant="secondary" className="flex items-center gap-1">
              {rating}+ Stars
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => toggleRating(rating)}
              />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground"
          >
            Clear All
          </Button>
        </motion.div>
      )}

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="border rounded-lg p-4 space-y-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Sort Options */}
            <div>
              <Label className="text-sm font-medium">Sort By</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  { value: "relevance", label: "Relevance" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "rating", label: "Highest Rated" },
                  { value: "newest", label: "Newest First" }
                ].map(option => (
                  <Button
                    key={option.value}
                    variant={sortBy === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy(option.value)}
                    className="justify-start"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                min={0}
                step={10}
                className="mt-2"
              />
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div>
                <Label className="text-sm font-medium">Categories</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={category} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Brands */}
            {brands.length > 0 && (
              <div>
                <Label className="text-sm font-medium">Brands</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                      <Label htmlFor={brand} className="text-sm">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ratings */}
            <div>
              <Label className="text-sm font-medium">Minimum Rating</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={() => toggleRating(rating)}
                    />
                    <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center gap-1">
                      {rating}+ <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch; 