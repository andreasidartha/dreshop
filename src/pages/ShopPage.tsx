import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import AdvancedSearch from "@/components/AdvancedSearch";
import { useSearchParams } from "react-router-dom";

const allProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: "photo-1618160702438-9b02ab6515c9",
    badge: "Best Seller",
    isNew: false,
    category: "Electronics",
    brand: "TechSound"
  },
  {
    id: 2,
    name: "Smart Home Speaker",
    price: 199,
    originalPrice: null,
    rating: 4.6,
    reviews: 89,
    image: "photo-1721322800607-8c38375eef04",
    badge: "New",
    isNew: true,
    category: "Electronics",
    brand: "SmartHome"
  },
  {
    id: 3,
    name: "Luxury Watch Collection",
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 67,
    image: "photo-1582562124811-c09040d0a901",
    badge: "Limited",
    isNew: false,
    category: "Fashion",
    brand: "LuxTime"
  },
  {
    id: 4,
    name: "Professional Camera",
    price: 1299,
    originalPrice: null,
    rating: 4.7,
    reviews: 156,
    image: "photo-1523712999610-f77fbcfc3843",
    badge: null,
    isNew: false,
    category: "Electronics",
    brand: "PhotoPro"
  },
  {
    id: 5,
    name: "Gaming Console",
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviews: 234,
    image: "photo-1500673922987-e212871fec22",
    badge: "Hot Deal",
    isNew: false,
    category: "Electronics",
    brand: "GameBox"
  },
  {
    id: 6,
    name: "Wireless Earbuds Pro",
    price: 179,
    originalPrice: null,
    rating: 4.5,
    reviews: 98,
    image: "photo-1649972904349-6e44c42644a7",
    badge: "New",
    isNew: true,
    category: "Electronics",
    brand: "AudioTech"
  },
  {
    id: 7,
    name: "Designer Sunglasses",
    price: 249,
    originalPrice: 329,
    rating: 4.4,
    reviews: 78,
    image: "photo-1488590528505-98d2b5aba04b",
    badge: null,
    isNew: false,
    category: "Fashion",
    brand: "StyleCo"
  },
  {
    id: 8,
    name: "Fitness Tracker",
    price: 129,
    originalPrice: null,
    rating: 4.3,
    reviews: 143,
    image: "photo-1531297484001-80022131f5a1",
    badge: "Popular",
    isNew: false,
    category: "Sports",
    brand: "FitTech"
  },
  {
    id: 9,
    name: "Smart Watch Pro",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    reviews: 89,
    image: "photo-1544117519-31a4b719223d",
    badge: "Sale",
    isNew: false,
    category: "Electronics",
    brand: "TechWear"
  },
  {
    id: 10,
    name: "Wireless Keyboard",
    price: 89,
    originalPrice: null,
    rating: 4.5,
    reviews: 67,
    image: "photo-1587829741301-dc798b83add3",
    badge: "New",
    isNew: true,
    category: "Electronics",
    brand: "KeyTech"
  },
  {
    id: 11,
    name: "Designer Handbag",
    price: 199,
    originalPrice: 299,
    rating: 4.6,
    reviews: 112,
    image: "photo-1584917865442-de89df76afd3",
    badge: "Sale",
    isNew: false,
    category: "Fashion",
    brand: "StyleCo"
  },
  {
    id: 12,
    name: "Bluetooth Speaker",
    price: 79,
    originalPrice: null,
    rating: 4.4,
    reviews: 95,
    image: "photo-1608043152269-423dbba4e7e1",
    badge: "New",
    isNew: true,
    category: "Electronics",
    brand: "AudioTech"
  }
];

const categories = ["All", "Electronics", "Fashion", "Sports"];
const brands = ["All", "TechSound", "SmartHome", "LuxTime", "PhotoPro", "GameBox", "AudioTech", "StyleCo", "FitTech", "TechWear", "KeyTech"];
const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "newest", label: "Newest First" }
];

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Read URL parameters on component mount
  useEffect(() => {
    const filter = searchParams.get("filter");
    const category = searchParams.get("category");
    
    if (filter === "new") {
      // Filter for new products
      setSelectedCategory("All");
      setSelectedBrand("All");
      setSearchQuery("");
      setPriceRange([0, 1500]);
      setSortBy("newest");
    } else if (filter === "sale") {
      // Filter for sale products (products with originalPrice)
      setSelectedCategory("All");
      setSelectedBrand("All");
      setSearchQuery("");
      setPriceRange([0, 1500]);
      setSortBy("relevance");
    } else if (category) {
      setSelectedCategory(category);
      setSelectedBrand("All");
      setSearchQuery("");
      setPriceRange([0, 1500]);
      setSortBy("relevance");
    }
  }, [searchParams]);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      // Handle special filters from URL
      const filter = searchParams.get("filter");
      if (filter === "new") {
        return matchesSearch && matchesCategory && matchesBrand && matchesPrice && product.isNew;
      } else if (filter === "sale") {
        return matchesSearch && matchesCategory && matchesBrand && matchesPrice && product.originalPrice !== null;
      }
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setPriceRange([0, 1500]);
    setSearchQuery("");
    setSortBy("relevance");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {searchParams.get("filter") === "new" ? "New Arrivals" :
           searchParams.get("filter") === "sale" ? "Sale Products" :
           searchParams.get("category") ? `${searchParams.get("category")} Products` :
           "Shop All Products"}
        </h1>
        <p className="text-muted-foreground">
          {searchParams.get("filter") === "new" ? "Discover our latest arrivals and newest products" :
           searchParams.get("filter") === "sale" ? "Find amazing deals and discounted products" :
           searchParams.get("category") ? `Explore our ${searchParams.get("category")} collection` :
           "Discover our complete collection of premium products"}
        </p>
      </div>

      {/* Advanced Search */}
      <div className="bg-card rounded-2xl p-6 shadow-lg mb-8">
        <AdvancedSearch
          products={allProducts}
          onSearchResults={(results) => {
            // Update the filtered products based on advanced search
            // This will be handled by the component's internal state
          }}
        />

          {/* View Toggle */}
        <div className="flex justify-end mt-4">
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-card rounded-2xl p-6 shadow-lg sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>

            {/* Category Filter */}
            <div className="space-y-3 mb-6">
              <h4 className="font-medium">Category</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Brand Filter */}
            <div className="space-y-3 my-6">
              <h4 className="font-medium">Brand</h4>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Price Range Filter */}
            <div className="space-y-4 mt-6">
              <h4 className="font-medium">Price Range</h4>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1500}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {filteredAndSortedProducts.length} of {allProducts.length} products
            </p>
            {(selectedCategory !== "All" || selectedBrand !== "All" || searchQuery || searchParams.get("filter")) && (
              <div className="flex flex-wrap gap-2">
                {searchParams.get("filter") === "new" && (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600 cursor-pointer" 
                         onClick={() => setSearchParams({})}>
                    New Arrivals ×
                  </Badge>
                )}
                {searchParams.get("filter") === "sale" && (
                  <Badge variant="default" className="bg-red-500 hover:bg-red-600 cursor-pointer" 
                         onClick={() => setSearchParams({})}>
                    Sale Products ×
                  </Badge>
                )}
                {selectedCategory !== "All" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("All")}>
                    {selectedCategory} ×
                  </Badge>
                )}
                {selectedBrand !== "All" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedBrand("All")}>
                    {selectedBrand} ×
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                    "{searchQuery}" ×
                  </Badge>
                )}
              </div>
            )}
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
