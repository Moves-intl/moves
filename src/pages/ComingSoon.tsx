import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, ArrowLeft, Sparkles, Globe, BookOpen, Zap, Star, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set target date (30 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const floatingIcons = [
    { Icon: Star, delay: 0, x: '10%', y: '20%' },
    { Icon: Zap, delay: 1000, x: '85%', y: '15%' },
    { Icon: Rocket, delay: 2000, x: '15%', y: '70%' },
    { Icon: Globe, delay: 3000, x: '80%', y: '75%' },
    { Icon: BookOpen, delay: 1500, x: '90%', y: '45%' },
    { Icon: Sparkles, delay: 2500, x: '5%', y: '50%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000 opacity-40"></div>
        <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-indigo-500/30 rounded-full blur-2xl animate-pulse delay-500 opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-violet-500/15 rounded-full blur-2xl animate-pulse delay-2000 opacity-30"></div>
      </div>

      {/* Floating animated icons */}
      {mounted && floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <div
          key={index}
          className="absolute animate-pulse opacity-20"
          style={{
            left: x,
            top: y,
            animationDelay: `${delay}ms`,
            animationDuration: '4s'
          }}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col justify-center items-center text-center">
        {/* Enhanced Header with animations */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-purple-400 mr-4 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-tight bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text">
              Coming Soon
            </h1>
            <div className="relative">
              <Sparkles className="h-12 w-12 text-purple-400 ml-4 animate-pulse" />
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-500"></div>
            </div>
          </div>
          <p className="text-xl md:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
            We're crafting something <span className="font-semibold text-purple-400">extraordinary</span> for your educational journey
          </p>
        </div>

        {/* Enhanced Countdown Timer */}
        <div className="mb-10 sm:mb-16 animate-scale-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <Card key={unit} className="glass border-white/30 p-4 sm:p-8 text-center hover-scale relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg"></div>
                <div className="relative z-10">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-white/80 text-sm uppercase tracking-widest font-medium">
                    {unit}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-center text-white/80">
            <Clock className="h-6 w-6 mr-3 animate-pulse" />
            <span className="text-lg font-medium">Launch countdown in progress</span>
          </div>
        </div>

        {/* Enhanced Email Subscription */}
        <div className="mb-10 sm:mb-16 w-full max-w-lg animate-fade-in delay-300">
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-6">
              <div className="text-white mb-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text">
                  Get Exclusive Access
                </h3>
                <p className="text-white/80 text-lg">Be among the first to experience the future of education!</p>
              </div>
              <div className="relative">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-14 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-purple-400 focus:bg-white/15 text-lg pr-4 backdrop-blur-sm"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="h-14 bg-purple-600 hover:bg-purple-700 text-white px-8 font-semibold text-lg shadow-elegant hover-scale"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Notify Me
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-green-500/20 border border-green-400/40 rounded-xl p-5 sm:p-8 text-white backdrop-blur-sm animate-scale-in">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <Mail className="h-8 w-8 mr-3 text-green-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-2xl font-bold">Thank You!</span>
              </div>
              <p className="text-lg text-green-100">You're now on our exclusive launch list. Get ready for something amazing!</p>
            </div>
          )}
        </div>

        {/* Enhanced Feature Preview */}
        <div className="mb-10 sm:mb-16 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 max-w-6xl animate-fade-in delay-500">
          <Card className="glass border-white/30 p-5 sm:p-8 text-center hover-scale group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Globe className="h-16 w-16 text-purple-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-white mb-3">Global Network</h3>
              <p className="text-white/80 leading-relaxed">Connect with prestigious institutions and opportunities worldwide</p>
            </div>
          </Card>
          <Card className="glass border-white/30 p-5 sm:p-8 text-center hover-scale group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <BookOpen className="h-16 w-16 text-purple-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-white mb-3">Expert Guidance</h3>
              <p className="text-white/80 leading-relaxed">Personalized counseling from certified education experts</p>
            </div>
          </Card>
          <Card className="glass border-white/30 p-5 sm:p-8 text-center hover-scale group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-white mb-3">Premium Experience</h3>
              <p className="text-white/80 leading-relaxed">Next-generation platform with AI-powered recommendations</p>
            </div>
          </Card>
        </div>

       
      </div>
    </div>
  );
};

export default ComingSoon;