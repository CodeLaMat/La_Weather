"use client";

import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Moon, Search, Sun, UserCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../thunks/fetchWeather";
import { AppDispatch } from "../store/store";
import Link from "next/link";
import { CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavigationProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  toggleTheme,
  isDarkTheme,
}) => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    if (city) {
      dispatch(fetchWeather(0, 0, city));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <NavigationMenu className="mx-10 ">
        <NavigationMenuList className="flex items-center justify-between w-full">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>
                <div className="top-1 relative">
                  <CardTitle className="text-3xl cursor-pointer text-darkText dark:text-lightText ">
                    LaWeather
                  </CardTitle>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex justify-between">
        <NavigationMenu className="mx-10">
          <NavigationMenuList className="flex items-center justify-between w-full">
            <NavigationMenuItem className="flex-1">
              <div className="relative w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Search for city..."
                  className="pl-10  text-darkText dark:text-lightText"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={handleSearch}
                />
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu className="mx-10 ">
          <NavigationMenuList className="flex items-center align-middle justify-between w-full">
            <NavigationMenuItem>
              <button onClick={toggleTheme} className="ml-4">
                {isDarkTheme ? (
                  <Moon className="h-8 w-8 text-gray-500 hover:text-gray-800" />
                ) : (
                  <Sun className="h-8 w-8 text-yellow-500 hover:text-gray-800" />
                )}
              </button>
            </NavigationMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="ml-6">
                  <UserCircle className="h-8 w-8 text-gray-500 hover:text-gray-800" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/login">Login/Logout</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/favorites">Favorite Locations</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/history">Search History</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
};

export default Navigation;
