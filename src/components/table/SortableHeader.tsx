import { SortField } from '@/types/table';
import { ArrowUpDown } from 'lucide-react';

import { TableHead } from '../ui/table';
import { Button } from '../ui/button';

export const SortableHeader = ({
  field,
  label,
  onSort,
}: {
  field: SortField;
  label: string;
  onSort: (field: SortField) => void;
}) => (
  <TableHead>
    <Button
      variant='ghost'
      onClick={() => onSort(field)}
      className='font-semibold hover:bg-blue-100 hover:text-blue-800 hover:shadow-sm transition-colors duration-200'
    >
      {label}
      <ArrowUpDown className='ml-2 h-4 w-4' />
    </Button>
  </TableHead>
);
