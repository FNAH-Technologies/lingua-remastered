
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Award, AlertCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { advancedAnalyticsService, AIInsight } from '@/services/advancedAnalyticsService';

const AIInsightsWidget = () => {
  const { language } = useLanguage();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);

  useEffect(() => {
    // Mock user stats for demonstration
    const mockUserStats = {
      streak: 15,
      xp: 850,
      accuracy: 0.82,
      lessonsCompleted: 24
    };

    const newInsights = advancedAnalyticsService.generateAIInsights('user123', mockUserStats);
    setInsights(newInsights);
  }, []);

  const handleNextInsight = () => {
    if (insights.length === 0) return;
    setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return <TrendingUp className="w-5 h-5" />;
      case 'achievement': return <Award className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      case 'celebration': return <Sparkles className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'recommendation': return 'from-blue-50 to-cyan-100 border-blue-200';
      case 'achievement': return 'from-yellow-50 to-orange-100 border-yellow-200';
      case 'warning': return 'from-red-50 to-pink-100 border-red-200';
      case 'celebration': return 'from-purple-50 to-pink-100 border-purple-200';
      default: return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'recommendation': return 'text-blue-600 bg-blue-100';
      case 'achievement': return 'text-yellow-600 bg-yellow-100';
      case 'warning': return 'text-red-600 bg-red-100';
      case 'celebration': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (insights.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-100 border-indigo-200 shadow-ios-card">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="font-bold text-indigo-800 mb-2">
            {language === 'fr' ? 'IA en Apprentissage' : 'AI Learning'}
          </h3>
          <p className="text-sm text-indigo-600">
            {language === 'fr' 
              ? 'Continuez à apprendre pour recevoir des insights personnalisés!'
              : 'Keep learning to receive personalized insights!'
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentInsight = insights[currentInsightIndex];

  return (
    <Card className={`bg-gradient-to-br ${getInsightColor(currentInsight.type)} shadow-ios-card animate-ios-fade-in`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getIconColor(currentInsight.type)}`}>
              {getInsightIcon(currentInsight.type)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {language === 'fr' ? 'Insights IA' : 'AI Insights'}
              </h3>
              <p className="text-sm text-gray-600 capitalize">
                {currentInsight.type}
              </p>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-white/70">
            {currentInsightIndex + 1}/{insights.length}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Insight Content */}
        <div className="space-y-3">
          <h4 className="text-xl font-bold text-gray-800">
            {language === 'fr' ? currentInsight.titleFr : currentInsight.title}
          </h4>
          
          <p className="text-gray-700 leading-relaxed">
            {language === 'fr' ? currentInsight.descriptionFr : currentInsight.description}
          </p>
          
          {/* Cultural Relevance Score */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              {language === 'fr' ? 'Pertinence Culturelle:' : 'Cultural Relevance:'}
            </span>
            <div className="flex space-x-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < currentInsight.culturalRelevance 
                      ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {currentInsight.culturalRelevance}/10
            </span>
          </div>
        </div>

        {/* Action Button */}
        {currentInsight.actionable && (
          <Button
            variant="outline"
            className="w-full mt-4 hover:scale-105 transition-transform"
          >
            {language === 'fr' ? 'Appliquer Conseil' : 'Apply Suggestion'}
          </Button>
        )}

        {/* Navigation */}
        {insights.length > 1 && (
          <Button
            onClick={handleNextInsight}
            variant="ghost"
            className="w-full mt-2"
          >
            {language === 'fr' ? 'Insight Suivant' : 'Next Insight'} →
          </Button>
        )}

        {/* Timestamp */}
        <div className="text-xs text-gray-500 text-center pt-2">
          {language === 'fr' ? 'Généré' : 'Generated'}: {currentInsight.timestamp.toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightsWidget;
