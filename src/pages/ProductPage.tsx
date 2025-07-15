import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, Star, Minus, Plus, Share2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    images: [
      "photo-1618160702438-9b02ab6515c9",
      "photo-1649972904349-6e44c42644a7",
      "photo-1488590528505-98d2b5aba04b"
    ],
    badge: "Best Seller",
    description: "Experience premium sound quality with our latest wireless headphones featuring noise cancellation and 30-hour battery life.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium sound quality",
      "Comfortable fit",
      "Quick charge technology"
    ],
    specs: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      "Weight": "250g"
    }
  },
  {
    id: 2,
    name: "Smart Home Speaker",
    price: 199,
    originalPrice: null,
    rating: 4.6,
    reviews: 89,
    images: [
      "photo-1721322800607-8c38375eef04",
      "photo-1531297484001-80022131f5a1",
      "photo-1526374965328-7f61d4dc18c5"
    ],
    badge: "New",
    description: "Transform your home with our intelligent speaker featuring voice control and premium audio.",
    features: [
      "Voice Assistant",
      "Multi-room audio",
      "Smart home control",
      "Premium speakers",
      "Wi-Fi connectivity"
    ],
    specs: {
      "Dimensions": "150 x 150 x 200mm",
      "Weight": "1.2kg",
      "Connectivity": "Wi-Fi, Bluetooth",
      "Power": "30W",
      "Voice Assistant": "Built-in"
    }
  }
];

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<typeof products[0] | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id || '0'));
    setProduct(foundProduct || null);
    setIsLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity} ${product?.name} added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Redirecting to checkout",
      description: "Taking you to the checkout page...",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const discount = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/")}
        className="mb-6 group hover:bg-primary/10"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
        Back to Home
      </Button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg">
            <img
              src={`https://images.unsplash.com/${product?.images[selectedImage]}?auto=format&fit=crop&w=800&q=80`}
              alt={product?.name}
              className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
            {product?.badge && (
              <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary">
                {product.badge}
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600">
                -{discount}%
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {product?.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                  selectedImage === index 
                    ? "ring-2 ring-primary scale-105" 
                    : "hover:scale-105 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=200&q=80`}
                  alt={`${product?.name} ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(product?.rating || 0) 
                        ? "text-yellow-400 fill-current" 
                        : "text-gray-300"
                    }`} 
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product?.rating} ({product?.reviews} reviews)
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-primary">${product?.price}</span>
              {product?.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <p className="text-muted-foreground text-lg">{product?.description}</p>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="hover:bg-primary/10"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="hover:bg-primary/10"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                size="lg" 
                className="flex-1 group"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Add to Cart
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={`transition-colors duration-200 ${
                  isLiked ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100" : ""
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="features" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="mt-4">
              <ul className="space-y-2">
                {product?.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specs" className="mt-4">
              <div className="space-y-2">
                {product?.specs && Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium">{key}:</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
