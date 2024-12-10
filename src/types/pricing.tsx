export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  featured: boolean;
  features: string[];
}