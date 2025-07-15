import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { User, Package, MapPin, CreditCard, Settings, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const orders = [
    { id: "#12345", date: "2024-01-15", status: "Delivered", total: "$299.99" },
    { id: "#12344", date: "2024-01-10", status: "Shipped", total: "$199.99" },
    { id: "#12343", date: "2024-01-05", status: "Processing", total: "$399.99" }
  ];

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

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="grid lg:grid-cols-4 gap-8"
      >
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-muted-foreground">john.doe@example.com</p>
            </div>
            
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === tab.id 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            {activeTab === "profile" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Profile Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <Button className="mt-6">Save Changes</Button>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Order History</h3>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{order.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered" ? "bg-green-100 text-green-700" :
                          order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{order.date}</span>
                        <span>{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Saved Addresses</h3>
                <div className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Home</h4>
                      <p className="text-muted-foreground">
                        123 Main Street<br />
                        Anytown, ST 12345<br />
                        United States
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline">Add New Address</Button>
              </div>
            )}

            {activeTab === "payment" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Payment Methods</h3>
                <div className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">•••• •••• •••• 1234</h4>
                      <p className="text-muted-foreground">Expires 12/26</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline">Add New Card</Button>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Account Settings</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Notifications</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Email notifications</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Order updates</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span>Marketing emails</span>
                      </label>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">Danger Zone</h4>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
