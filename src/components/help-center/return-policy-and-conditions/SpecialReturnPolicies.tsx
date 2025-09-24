"use client";

const defaultSpecialPolicies = [
  {
    id: 'electronics',
    category: 'Electronics',
    rules: [
      'Must include all original accessories',
      'Software/apps must be unregistered',
      '15-day return period for opened items'
    ]
  },
  {
    id: 'clothing-footwear',
    category: 'Clothing & Footwear',
    rules: [
      'Tags must be attached',
      'No signs of wear or washing',
      'Original packaging preferred'
    ]
  },
  {
    id: 'home-garden',
    category: 'Home & Garden',
    rules: [
      'Large items may require special pickup',
      'Assembly instructions must be included',
      'No damage from outdoor use'
    ]
  },
  {
    id: 'books-media',
    category: 'Books & Media',
    rules: [
      'Books must be in sellable condition',
      'DVDs/CDs must be unscratched',
      'Digital content non-returnable'
    ]
  }
];

interface SpecialPolicy {
  id: string;
  category: string;
  rules: string[];
}

interface SpecialReturnPoliciesProps {
  title?: string;
  policies?: SpecialPolicy[];
  columns?: number;
}

const SpecialReturnPolicies: React.FC<SpecialReturnPoliciesProps> = ({
  title = "Special Return Policies",
  policies = defaultSpecialPolicies,
  columns = 2
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[2]} gap-6`}>
        {policies.map((policy) => (
          <div key={policy.id} className="p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-[#000000] mb-3">{policy.category}</h3>
            <ul className="space-y-2 text-[#4A4A4A] text-sm">
              {policy.rules.map((rule, index) => (
                <li key={index}>• {rule}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialReturnPolicies;
