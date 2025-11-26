"use client";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div 
      className="relative bg-gradient-to-br from-white to-[#F9FBFD] rounded-xl p-6 transition-all duration-300 hover:shadow-xl border border-[#C1DAF6]/30 group cursor-pointer overflow-hidden"
      style={{
        boxShadow: "0 4px 12px rgba(34, 117, 195, 0.08)"
      }}
    >
      <div className="relative space-y-3">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2275C3] to-[#2275C3] flex items-center justify-center group-hover:shadow-md transition-all duration-300 flex-shrink-0"
          >
            <span className="text-2xl">{icon}</span>
          </div>

          <h3 className="font-semibold text-base text-[#3F4756] group-hover:text-[#2275C3] transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
        </div>

        <p className="text-sm text-[#3F4756]/70 leading-relaxed pl-0">
          {description}
        </p>

        <div className="mt-3 h-0.5 bg-gradient-to-r from-[#2275C3] via-[#2275C3] to-transparent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
      </div>
    </div>
  );
}
