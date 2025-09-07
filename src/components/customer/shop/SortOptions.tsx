import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '../../ui/select';
  
  interface SortOptionsProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  export default function SortOptions({ value, onChange }: SortOptionsProps) {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name (A-Z)</SelectItem>
          <SelectItem value="price-low">Price (Low to High)</SelectItem>
          <SelectItem value="price-high">Price (High to Low)</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
        </SelectContent>
      </Select>
    );
  }