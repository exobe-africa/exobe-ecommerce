"use client";

interface VariantOption {
  name: string;
  value: string;
  image?: string;
  price?: number;
  stock: number;
}

interface ProductVariants {
  colors?: VariantOption[];
  sizes?: VariantOption[];
  storage?: VariantOption[];
  bands?: VariantOption[];
  [key: string]: VariantOption[] | undefined;
}

interface VariantSelectorProps {
  variants: ProductVariants;
  selectedVariants: Record<string, string>;
  onVariantChange: (variantType: string, value: string) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariants,
  onVariantChange,
}) => {
  if (!variants || Object.keys(variants).length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {Object.entries(variants).map(([variantType, options]) => (
        <div key={variantType} className="space-y-3">
          <h3 className="text-lg font-semibold text-[#000000] capitalize">
            {variantType === 'colors' ? 'Colour' : 
             variantType === 'sizes' ? 'Size' : 
             variantType === 'storage' ? 'Storage' :
             variantType === 'bands' ? 'Band' : variantType}
          </h3>
          
          {variantType === 'colors' ? (
            // Color swatches
            <div className="flex flex-wrap gap-3">
              {options?.map((option: VariantOption) => (
                <button
                  key={option.value}
                  onClick={() => onVariantChange(variantType, option.value)}
                  className={`group relative flex flex-col items-center justify-between p-3 rounded-xl border-2 transition-all w-24 h-24 ${
                    selectedVariants[variantType] === option.value
                      ? 'border-[#C8102E] bg-[#F6E2E0]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xl">
                    {option.image}
                  </div>
                  <span className="text-xs font-medium text-[#000000] text-center leading-tight">{option.name}</span>
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                    selectedVariants[variantType] === option.value ? 'bg-[#C8102E]' : 'bg-transparent'
                  } flex items-center justify-center`}>
                    {selectedVariants[variantType] === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            // Regular buttons for sizes, storage, etc.
            <div className="flex flex-wrap gap-3">
              {options?.map((option: VariantOption) => (
                <button
                  key={option.value}
                  onClick={() => onVariantChange(variantType, option.value)}
                  disabled={option.stock === 0}
                  className={`flex flex-col items-center justify-center min-w-[4rem] h-12 px-3 py-2 rounded-lg border-2 font-medium transition-all ${
                    selectedVariants[variantType] === option.value
                      ? 'border-[#C8102E] bg-[#C8102E] text-white'
                      : option.stock === 0
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 text-[#000000] hover:border-[#C8102E] hover:text-[#C8102E]'
                  }`}
                >
                  <span className="text-sm truncate">{option.name}</span>
                  {option.price !== undefined && option.price > 0 && (
                    <span className="text-xs whitespace-nowrap">
                      +R{option.price.toFixed(2)}
                    </span>
                  )}
                  {option.stock === 0 && (
                    <span className="text-xs">Out of Stock</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Selected Variant Summary */}
      {Object.keys(selectedVariants).length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-[#000000] mb-2">Selected Configuration:</h4>
          <div className="space-y-1">
            {Object.entries(selectedVariants).map(([type, value]) => {
              const typeOptions = variants[type];
              const option = typeOptions?.find(opt => opt.value === value);
              return (
                <div key={type} className="flex justify-between text-sm">
                  <span className="text-[#4A4A4A] capitalize">{type}:</span>
                  <span className="text-[#000000] font-medium">{option?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
