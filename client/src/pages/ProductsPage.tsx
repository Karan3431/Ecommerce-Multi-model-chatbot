import { motion } from 'framer-motion';
import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, MeshDistortMaterial, Float } from '@react-three/drei';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Star, 
  ShoppingCart, 
  Heart, 
  Mic,
  Bot,
  Upload,
  Sparkles,
  Zap,
  Headphones,
  Camera,
  Smartphone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 3D Product Display Component
function Product3D({ color = "#8B5CF6" }) {
  return (
    <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5}>
      <Box args={[1.5, 1.5, 1.5]} scale={1}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.2}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Box>
    </Float>
  );
}

// Product Card Component
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
}

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03,
        rotateY: 2,
        rotateX: 2,
      }}
      className="perspective-1000 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <Card className="group overflow-hidden bg-gradient-to-br from-white/90 to-purple-50/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
        {/* 3D Preview */}
        <div className="relative h-48 overflow-hidden">
          <div className="h-full bg-gradient-to-br from-purple-400 to-pink-400 relative">
            <Canvas camera={{ position: [0, 0, 3] }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Product3D color={product.color} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
              </Suspense>
            </Canvas>
            
            {/* Overlay Icon */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-black/20"
              whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                {product.icon}
              </motion.div>
            </motion.div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {product.badge && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                {product.badge}
              </Badge>
            )}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`p-2 rounded-full ${isLiked ? 'bg-red-500' : 'bg-white/80'} shadow-lg`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'text-white fill-current' : 'text-gray-600'}`} />
            </motion.button>
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-white/90 text-gray-800 border-0">
              <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
              {product.rating}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs text-purple-600 border-purple-300">
              {product.category}
            </Badge>
          </div>
          
          <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-purple-600">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {product.reviews} reviews
            </div>
          </div>

          <motion.div 
            className="flex gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
              onClick={(e) => e.stopPropagation()}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'ai-assistants', name: 'AI Assistants' },
    { id: 'voice-tech', name: 'Voice Technology' },
    { id: 'smart-tools', name: 'Smart Tools' },
    { id: 'premium', name: 'Premium' }
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "AI Voice Assistant Pro",
      description: "Advanced voice recognition with natural language processing and document intelligence.",
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      reviews: 2547,
      category: "AI Assistants",
      icon: <Mic className="w-16 h-16 text-white" />,
      color: "#8B5CF6",
      badge: "🔥 Bestseller"
    },
    {
      id: 2,
      name: "Smart Document Reader",
      description: "Upload and analyze documents with AI-powered insights and intelligent search.",
      price: 199,
      originalPrice: 249,
      rating: 4.8,
      reviews: 1832,
      category: "Smart Tools",
      icon: <Upload className="w-16 h-16 text-white" />,
      color: "#EC4899",
      badge: "✨ New"
    },
    {
      id: 3,
      name: "Premium Bot Assistant",
      description: "24/7 intelligent shopping companion with personalized recommendations.",
      price: 399,
      rating: 5.0,
      reviews: 987,
      category: "Premium",
      icon: <Bot className="w-16 h-16 text-white" />,
      color: "#F59E0B",
      badge: "👑 Premium"
    },
    {
      id: 4,
      name: "Voice Commerce Suite",
      description: "Complete voice-enabled shopping experience with multi-platform integration.",
      price: 499,
      originalPrice: 699,
      rating: 4.7,
      reviews: 1456,
      category: "Voice Technology",
      icon: <Headphones className="w-16 h-16 text-white" />,
      color: "#10B981"
    },
    {
      id: 5,
      name: "AI Camera Assistant",
      description: "Visual product recognition and instant information with augmented reality.",
      price: 349,
      rating: 4.6,
      reviews: 892,
      category: "Smart Tools",
      icon: <Camera className="w-16 h-16 text-white" />,
      color: "#3B82F6"
    },
    {
      id: 6,
      name: "Mobile Voice Helper",
      description: "Pocket-sized AI assistant for on-the-go shopping and product discovery.",
      price: 149,
      originalPrice: 199,
      rating: 4.5,
      reviews: 2156,
      category: "Voice Technology",
      icon: <Smartphone className="w-16 h-16 text-white" />,
      color: "#EF4444"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-24 pb-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Products
            </Badge>
          </motion.div>

          <motion.h1 
            className="text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Smart Products
            </span>
            <br />
            <span className="text-white">for Smart Shopping</span>
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover our collection of AI-powered tools designed to revolutionize your shopping experience
          </motion.p>
        </div>
      </motion.section>

      {/* Search and Filter */}
      <motion.section 
        className="px-6 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-purple-500/30 text-white placeholder:text-gray-400"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0'
                        : 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Products Grid */}
      <motion.section 
        className="px-6 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="px-6 pb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/30"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-4xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Need Help Choosing?
            </motion.h3>
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Let our AI assistant help you find the perfect product for your needs
            </motion.p>
            <motion.div
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 text-lg px-8 py-6"
                >
                  <Bot className="w-5 h-5 mr-2" />
                  Ask AI Assistant
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-purple-500 text-purple-300 hover:bg-purple-500/10 text-lg px-8 py-6"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Compare Products
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
