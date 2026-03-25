import React from 'react';
import { DollarSign, Home, Utensils, Bus, Zap, Film, Calculator, Sparkles } from 'lucide-react';

interface CostItem {
  category: string;
  amount: string;
}

interface CostOfLivingSectionProps {
  destination: any;
  costOfLivingContent?: string; // JSON string like: [{ category: 'Accommodation', amount: 'AUD $150-400/week' }]
}

const iconMap: Record<string, JSX.Element> = {
  accommodation: <Home className="h-6 w-6 text-white" />,
  food: <Utensils className="h-6 w-6 text-white" />,
  transport: <Bus className="h-6 w-6 text-white" />,
  utilities: <Zap className="h-6 w-6 text-white" />,
  entertainment: <Film className="h-6 w-6 text-white" />,
};

const CostOfLivingSection = ({ destination }: CostOfLivingSectionProps) => {
  let costItems: CostItem[] = [];

  try {
    const parsed = JSON.parse(destination?.cost_of_living_info || '[]');
    if (Array.isArray(parsed)) {
      costItems = parsed;
    }
  } catch {
    // fallback: no render
  }

  if (costItems.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 lg:py-20 px-4 bg-white relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-[#fa8500]/5 to-orange-300/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-[#023047]/5 to-blue-400/5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          {/* Floating badge */}
          <div className="inline-flex items-start w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
            <Calculator className="w-4 h-4 mr-2" />
            Budget Planning
          </div>
          {/* Main title with modern typography */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-transparent bg-clip-text bg-primary mb-4 leading-tight">
            Cost of Living
          </h2>

          {/* Animated underline */}
          <div className="relative mx-auto w-32 h-1 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fa8500] to-orange-400 rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-[#fa8500] rounded-full animate-pulse"></div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Smart budgeting for your studies in{' '}
            <span className="font-bold text-[#023047] relative">
              {destination?.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#fa8500] to-orange-400"></span>
            </span>
          </p>
        </div>

        {/* Cost Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {costItems.map((item, index) => {
            const icon = iconMap[item.category.toLowerCase()] || <DollarSign className="h-6 w-6 text-white" />;

            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#fa8500]/20 to-[#023047]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-105"></div>

                {/* Main card */}
                <div className="relative bg-gradient-to-br from-slate-50 via-white to-gray-50 rounded-3xl p-5 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#fa8500]/30 group-hover:scale-105 group-hover:-translate-y-2">

                  {/* Icon section */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#023047] to-[#034663] shadow-xl flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                      {icon}
                    </div>
                    {/* Floating indicator */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#fa8500] to-orange-400 rounded-full shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Category title */}
                  <h3 className="text-lg font-bold text-[#023047] capitalize mb-4 group-hover:text-[#fa8500] transition-colors duration-300 text-center">
                    {item.category}
                  </h3>

                  {/* Amount display */}
                  <div className="text-center relative">
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fa8500] to-orange-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {item.amount}
                    </div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                      Weekly Budget
                    </div>
                  </div>

                  {/* Animated bottom accent */}
                  <div className="mt-6 mx-auto h-1 w-0 group-hover:w-16 bg-gradient-to-r from-[#fa8500] to-orange-400 rounded-full transition-all duration-700"></div>

                  {/* Corner decorations */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-[#fa8500]/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"></div>
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-[#023047]/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 group-hover:scale-150"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="mt-10 sm:mt-14 lg:mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse shadow-sm"></div>
              <span className="text-sm font-semibold text-gray-700">Estimates based on student lifestyle</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Demo component with sample data
const Demo = () => {
  const sampleData = {
    destinationName: "Australia",
    costOfLivingContent: JSON.stringify([
      { category: 'Accommodation', amount: 'AUD $150-400' },
      { category: 'Food', amount: 'AUD $80-200' },
      { category: 'Transport', amount: 'AUD $30-60' },
      { category: 'Utilities', amount: 'AUD $35-50' },
      { category: 'Entertainment', amount: 'AUD $80-150' }
    ])
  };

  return <CostOfLivingSection destination={sampleData} />;
};

export default CostOfLivingSection;