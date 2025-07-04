
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
import ErrorBoundary from "./components/common/ErrorBoundary";
import BottomNavigation from "./components/navigation/BottomNavigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

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
      
      if (savedUser) {
        setIsAuthenticated(true);
        // Check if onboarding is needed
        setNeedsOnboarding(!onboardingData);
        
        // If onboarding is complete, set the target language for lessons
        if (onboardingData) {
          const { language } = JSON.parse(onboardingData);
          if (language) {
            // Import and set the target language dynamically
            import('./services/lessonDataService').then(({ lessonDataService }) => {
              lessonDataService.setTargetLanguage(language);
            });
          }
        }
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Check if user needs onboarding
    const onboardingData = localStorage.getItem('lingua_onboarding');
    setNeedsOnboarding(!onboardingData);
  };

  const handleOnboardingComplete = () => {
    setNeedsOnboarding(false);
    // Set the target language after onboarding completion
    const onboardingData = localStorage.getItem('lingua_onboarding');
    if (onboardingData) {
      const { language } = JSON.parse(onboardingData);
      if (language) {
        import('./services/lessonDataService').then(({ lessonDataService }) => {
          lessonDataService.setTargetLanguage(language);
        });
      }
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <LanguageProvider>
          <LoginScreen onLogin={handleLogin} />
        </LanguageProvider>
      </ErrorBoundary>
    );
  }

  if (needsOnboarding) {
    return (
      <ErrorBoundary>
        <LanguageProvider>
          <OnboardingScreen onComplete={handleOnboardingComplete} />
        </LanguageProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="pb-20"> {/* Add bottom padding for navigation */}
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
              </div>
              <BottomNavigation />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;
