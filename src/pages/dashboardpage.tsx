import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar'; // Custom Sidebar
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Settings, Users, BarChart3, LogOut, Bell } from 'lucide-react';

const DashboardPage = () => {
  console.log('DashboardPage loaded');

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: <Home className="h-4 w-4 mr-2" /> },
    { name: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 className="h-4 w-4 mr-2" /> },
    { name: "Users", href: "/dashboard/users", icon: <Users className="h-4 w-4 mr-2" /> },
    { name: "Settings", href: "/dashboard/settings", icon: <Settings className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar className="bg-white border-r"> {/* Sidebar remains white explicitly */}
        <div className="p-4 border-b">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <img src="https://via.placeholder.com/40/3B82F6/FFFFFF?Text=Logo" alt="App Logo" className="h-8 w-8" />
            <span className="font-semibold text-xl">MyApp</span>
          </Link>
        </div>
        <NavigationMenu orientation="vertical" className="p-4">
          <NavigationMenuList className="flex flex-col space-y-1 w-full">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name} className="w-full">
                <Link to={item.href} className={`${navigationMenuTriggerStyle()} w-full justify-start`}>
                  {item.icon} {item.name}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="mt-auto p-4 border-t">
           <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/login">
                <LogOut className="h-4 w-4 mr-2" /> Logout
            </Link>
           </Button>
        </div>
      </Sidebar>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm sticky top-0 z-10"> {/* Header remains white explicitly */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard Overview</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Avatar>
                <AvatarImage src="https://source.unsplash.com/random/40x40?face" alt="User Avatar" />
                <AvatarFallback>UD</AvatarFallback> {/* User Dashboard / User Default */}
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6"> {/* This area will now have black background */}
          <Card> {/* Cards will use their own background (white in light mode) */}
            <CardHeader>
              <CardTitle>Welcome Back!</CardTitle>
              <CardDescription>Here's a quick overview of your application.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is a placeholder dashboard page. You can customize this area with relevant application data, charts, summaries, and actions.</p>
              <img src="https://via.placeholder.com/800x300/E0E7FF/3B82F6?Text=Main+Content+Area" alt="Dashboard content placeholder" className="mt-4 rounded-lg" />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistic 1</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,234</p>
                <p className="text-sm text-muted-foreground">+10% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Statistic 2</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">567</p>
                <p className="text-sm text-muted-foreground">-5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Action</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Perform Action</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};\n
export default DashboardPage;