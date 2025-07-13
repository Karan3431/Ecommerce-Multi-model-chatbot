import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Settings, 
  ShoppingBag, 
  Heart, 
  ArrowLeft,
  Camera,
  Edit,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Star,
  Package,
  MessageCircle,
  Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Karan Singh',
    email: 'karan@gmail.com',
    phone: '+91 8777452135',
    location: 'Kolkata, West Bengal',
    joinDate: 'March 2025',
    bio: 'Tech enthusiast and early adopter of AI technologies. Love shopping with voice assistants!'
  });

  const orderHistory = [
    {
      id: '#ORD-001',
      date: '2024-01-15',
      amount: '$299',
      status: 'Delivered',
      items: 'AI Voice Assistant Pro',
      rating: 5
    },
    {
      id: '#ORD-002',
      date: '2024-01-10',
      amount: '$199',
      status: 'Delivered',
      items: 'Smart Document Reader',
      rating: 4
    },
    {
      id: '#ORD-003',
      date: '2024-01-05',
      amount: '$399',
      status: 'Processing',
      items: 'Premium Bot Assistant',
      rating: null
    }
  ];

  const wishlistItems = [
    {
      id: 1,
      name: 'Advanced AI Analytics',
      price: '$599',
      image: 'chart',
      inStock: true
    },
    {
      id: 2,
      name: 'Voice Commerce Suite',
      price: '$899',
      image: 'mic',
      inStock: false
    },
    {
      id: 3,
      name: 'Smart Recommendation Engine',
      price: '$449',
      image: 'brain',
      inStock: true
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

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
              My Profile
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <MessageCircle className="w-4 h-4 mr-2" />
              Support
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <div className="text-center">
                <motion.div 
                  className="relative inline-block mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <motion.button
                    className="absolute bottom-0 right-0 bg-purple-500 rounded-full p-2 text-white hover:bg-purple-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera className="w-4 h-4" />
                  </motion.button>
                </motion.div>
                
                <h2 className="text-xl font-bold text-white mb-2">{profileData.name}</h2>
                <p className="text-gray-400 mb-4">{profileData.email}</p>
                
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Badge className="bg-purple-500 text-white border-0">
                    <Award className="w-3 h-3 mr-1" />
                    Premium Member
                  </Badge>
                </div>
                
                <div className="text-center text-sm text-gray-400 mb-4">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Joined {profileData.joinDate}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-lg font-bold text-purple-400">12</div>
                    <div className="text-xs text-gray-400">Orders</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-lg font-bold text-pink-400">4.9</div>
                    <div className="text-xs text-gray-400">Avg Rating</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-sm">
                <TabsTrigger value="profile" className="text-white data-[state=active]:bg-purple-500">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="orders" className="text-white data-[state=active]:bg-purple-500">
                  <Package className="w-4 h-4 mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="text-white data-[state=active]:bg-purple-500">
                  <Heart className="w-4 h-4 mr-2" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger value="ai-assistant" className="text-white data-[state=active]:bg-purple-500">
                  <Bot className="w-4 h-4 mr-2" />
                  AI Assistant
                </TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">Personal Information</CardTitle>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
                      >
                        {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                        {isEditing ? 'Save' : 'Edit'}
                      </Button>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          disabled={!isEditing}
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            disabled={!isEditing}
                            className="bg-white/5 border-white/20 text-white pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            disabled={!isEditing}
                            className="bg-white/5 border-white/20 text-white pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-white">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            disabled={!isEditing}
                            className="bg-white/5 border-white/20 text-white pl-10"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-white">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        disabled={!isEditing}
                        className="bg-white/5 border-white/20 text-white min-h-[100px]"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Orders Tab */}
              <TabsContent value="orders" className="mt-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orderHistory.map((order, index) => (
                        <motion.div
                          key={order.id}
                          className="p-4 bg-white/5 rounded-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="font-medium text-white">{order.id}</div>
                              <div className="text-sm text-gray-400">{order.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-purple-400">{order.amount}</div>
                              <Badge className={`${
                                order.status === 'Delivered' ? 'bg-green-500' : 
                                order.status === 'Processing' ? 'bg-yellow-500' : 'bg-gray-500'
                              } text-white border-0`}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">{order.items}</span>
                            {order.rating && (
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < order.rating! ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="mt-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">My Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlistItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          className="bg-white/5 rounded-lg p-4"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mb-3 flex items-center justify-center">
                            <Bot className="w-16 h-16 text-white" />
                          </div>
                          <h3 className="font-medium text-white mb-2">{item.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-purple-400">{item.price}</span>
                            <Badge className={`${item.inStock ? 'bg-green-500' : 'bg-red-500'} text-white border-0`}>
                              {item.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                          </div>
                          <Button 
                            className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                            disabled={!item.inStock}
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* AI Assistant Tab */}
              <TabsContent value="ai-assistant" className="mt-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">AI Assistant Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="font-medium text-white mb-3">Voice Settings</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Voice Speed</span>
                            <Badge className="bg-purple-500 text-white border-0">Normal</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Language</span>
                            <Badge className="bg-purple-500 text-white border-0">English (US)</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Voice Gender</span>
                            <Badge className="bg-purple-500 text-white border-0">Female</Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="font-medium text-white mb-3">AI Preferences</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Recommendation Level</span>
                            <Badge className="bg-blue-500 text-white border-0">High</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Learning Mode</span>
                            <Badge className="bg-green-500 text-white border-0">Enabled</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Privacy Mode</span>
                            <Badge className="bg-yellow-500 text-white border-0">Standard</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="font-medium text-white mb-3">Usage Statistics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-purple-400">1,247</div>
                          <div className="text-sm text-gray-400">Voice Commands</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-pink-400">89</div>
                          <div className="text-sm text-gray-400">Documents Analyzed</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-400">156</div>
                          <div className="text-sm text-gray-400">Conversations</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-400">98.7%</div>
                          <div className="text-sm text-gray-400">Accuracy Rate</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
