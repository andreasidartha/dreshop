import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/PageContainer";
import { Users, Award, Heart, Globe } from "lucide-react";

const AboutPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stats = [
    { value: "10K+", label: "Happy Customers" },
    { value: "50+", label: "Countries Served" },
    { value: "24/7", label: "Customer Support" },
    { value: "100%", label: "Satisfaction Rate" }
  ];

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction above all else."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Assured",
      description: "Every product undergoes rigorous quality checks before reaching you."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion Driven",
      description: "Our team is passionate about delivering the best shopping experience."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "We serve customers worldwide with fast and reliable shipping."
    }
  ];

  const team = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Jane Smith",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Mike Johnson",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <PageContainer
      title="Our Story"
      description="We're on a mission to revolutionize online shopping with innovative products and exceptional customer service."
    >
      {/* Stats Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {stat.value}
            </div>
            <div className="text-muted-foreground">
              {stat.label}
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Values Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="text-primary mb-4 flex justify-center">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="p-6 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center"
      >
        <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
          <h2 className="text-2xl font-bold mb-4">
            Join Our Journey
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experience the difference of shopping with a company that truly cares about its customers.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="group"
            onClick={() => window.location.href = '/shop'}
          >
            Start Shopping
          </Button>
        </Card>
      </motion.div>
    </PageContainer>
  );
};

export default AboutPage;
