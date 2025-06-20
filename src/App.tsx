import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import SplashScreen from "./components/SplashScreen";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import LessonScreen from "./components/LessonScreen";
import StoryHub from "./components/StoryHub";
import EnhancedLeaderboard from "./components/EnhancedLeaderboard";
import Profile from "./components/Profile";
import NotFound from "./pages/NotFound";
import OnboardingScreen from "./components/OnboardingScreen";
import ChallengeHub from "./components/ChallengeHub";
import Settings from "./components/Settings";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Check if user is authenticated (mock)
      const savedUser = localStorage.getItem('lingua_user');
      const onboardingData = localStorage.getItem('lingua_onboarding');
      
      setIsAuthenticated(!!savedUser);
      setNeedsOnboarding(!!savedUser && !onboardingData);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setNeedsOnboarding(false);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return (
      <LanguageProvider>
        <LoginScreen onLogin={setIsAuthenticated} />
      </LanguageProvider>
    );
  }

  if (needsOnboarding) {
    return (
      <LanguageProvider>
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/lesson/:lessonId" element={<LessonScreen />} />
              <Route path="/stories" element={<StoryHub />} />
              <Route path="/challenges" element={<ChallengeHub />} />
              <Route path="/leaderboard" element={<EnhancedLeaderboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default App;
