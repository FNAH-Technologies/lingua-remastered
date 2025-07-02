
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface LoginScreenProps {
  onLogin: (authenticated: boolean) => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication
    setTimeout(() => {
      const userData = {
        id: '1',
        name: 'Learner',
        email,
        xp: 150,
        streak: 5,
        languages: ['Ewondo', 'Duala']
      };

      localStorage.setItem('lingua_user', JSON.stringify(userData));
      
      toast({
        title: isSignUp ? "Compte créé!" : "Connecté!",
        description: "Bienvenue dans Lingua",
      });

      onLogin(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-slide-up">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto bg-lingua-gradient rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">L</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {isSignUp ? 'Créer un compte' : 'Se connecter'}
          </CardTitle>
          <CardDescription>
            {isSignUp 
              ? 'Commencez votre voyage linguistique' 
              : 'Continuez votre apprentissage'
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div>
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-lingua-gradient hover:opacity-90 text-white"
              disabled={loading}
            >
              {loading ? 'Chargement...' : (isSignUp ? 'Créer le compte' : 'Se connecter')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-orange-600 hover:text-orange-700 text-sm"
            >
              {isSignUp 
                ? 'Déjà un compte? Se connecter' 
                : 'Pas de compte? Créer un compte'
              }
            </button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
