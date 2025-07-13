import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share, 
  ArrowLeft,
  MessageCircle,
  Mic,
  Bot,
  Sparkles,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const product = {
    id: 1,
    name: "AI Voice Shopping Assistant Pro",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviews: 2547,
    inStock: true,
    description: "Revolutionary AI-powered voice assistant that transforms your shopping experience with natural language processing and document intelligence.",
    features: [
      "Advanced voice recognition with 99.9% accuracy",
      "Document upload and intelligent analysis",
      "Real-time product recommendations",
      "Multi-language support (12 languages)",
      "24/7 AI customer support",
      "Seamless integration with major e-commerce platforms"
    ],
    specifications: {
      "Voice Recognition": "Advanced neural networks",
      "Languages": "12 supported languages", 
      "Response Time": "< 200ms",
      "Accuracy": "99.9%",
      "Platform": "Web, iOS, Android",
      "Storage": "Unlimited cloud storage"
    },
    images: [
      "https://via.placeholder.com/600x400/8B5CF6/ffffff?text=AI+Voice+Assistant",
      "https://via.placeholder.com/600x400/EC4899/ffffff?text=Dashboard+View",
      "https://via.placeholder.com/600x400/06B6D4/ffffff?text=Mobile+App"
    ]
  };

  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely amazing! The voice recognition is incredibly accurate and the document analysis feature saved me hours of work.",
      date: "2 days ago",
      verified: true
    },
    {
      id: 2,
      user: "Michael Chen",
      rating: 5,
      comment: "Best purchase I've made this year. The AI is so intuitive and the response time is lightning fast.",
      date: "1 week ago",
      verified: true
    },
    {
      id: 3,
      user: "Emma Davis",
      rating: 4,
      comment: "Great product overall. The voice RAG feature is game-changing for my business workflows.",
      date: "2 weeks ago",
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              LuxeBot Store
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Support
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart (0)
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-6">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 h-96 mb-4">
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Bot className="w-32 h-32 text-white" />
                </motion.div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500 text-white border-0">
                    25% OFF
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((_, index) => (
                  <motion.div
                    key={index}
                    className="aspect-square rounded-lg bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mic className="w-8 h-8 text-white" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-green-500 text-white border-0">
                  ✓ In Stock
                </Badge>
                <Badge className="bg-blue-500 text-white border-0">
                  AI Powered
                </Badge>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                    />
                  ))}
                </div>
                <span className="text-white font-semibold">{product.rating}</span>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-purple-400">${product.price}</span>
                <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                <Badge className="bg-red-500 text-white border-0">Save ${product.originalPrice - product.price}</Badge>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
                  >
                    -
                  </Button>
                  <span className="text-white font-medium px-4">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 text-lg py-6"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`border-2 py-6 ${isLiked ? 'border-red-500 text-red-400' : 'border-purple-500 text-purple-300'} hover:bg-purple-500/10`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-purple-500 text-purple-300 hover:bg-purple-500/10 py-6"
                  >
                    <Share className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <div className="text-center">
                <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-sm text-white">Secure Payment</div>
              </div>
              <div className="text-center">
                <Truck className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-white">Free Delivery</div>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm text-white">30 Day Returns</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-sm">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-500">Overview</TabsTrigger>
              <TabsTrigger value="features" className="text-white data-[state=active]:bg-purple-500">Features</TabsTrigger>
              <TabsTrigger value="specs" className="text-white data-[state=active]:bg-purple-500">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-purple-500">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Product Overview</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Experience the future of e-commerce with our AI-powered voice assistant. This revolutionary tool 
                    combines advanced natural language processing with document intelligence to create an unparalleled 
                    shopping experience. Whether you're browsing products, analyzing documents, or seeking personalized 
                    recommendations, our AI assistant is your perfect companion.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Sparkles className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specs" className="mt-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Technical Specifications</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="font-medium text-white">{key}</span>
                        <span className="text-gray-300">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        className="p-4 bg-white/5 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">{review.user[0]}</span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-white">{review.user}</span>
                                {review.verified && (
                                  <Badge className="bg-green-500 text-white border-0 text-xs">
                                    ✓ Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                                  />
                                ))}
                                <span className="text-gray-400 text-sm ml-2">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
