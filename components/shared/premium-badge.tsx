import { Lock } from "lucide-react";

export function PremiumBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-navy-700">
      <Lock size={12} />
      Assinantes
    </span>
  );
}
