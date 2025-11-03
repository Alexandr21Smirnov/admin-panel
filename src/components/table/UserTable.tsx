import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { SortConfig, SortField } from '@/types/table';
import { PaginationInfo } from './PaginationInfo';
import { SortableHeader } from './SortableHeader';
import { UserRow } from './UserRow';
import { compareValues, getSortValue, getPaginationRange } from '@/lib/utils';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  birthDate: string;
  weight: number;
  height: number;
}

interface UserTableProps {
  users: User[];
  currentPage: number;
  totalUsers: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const UserTable = ({
  users,
  currentPage,
  totalUsers,
  itemsPerPage,
  onPageChange,
}: UserTableProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'id',
    direction: 'asc',
  });

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedUsers = useMemo(
    () =>
      [...users].sort((a, b) =>
        compareValues(
          getSortValue(a, sortConfig.field),
          getSortValue(b, sortConfig.field),
          sortConfig.direction
        )
      ),
    [users, sortConfig]
  );

  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const paginationRange = useMemo(
    () => getPaginationRange(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <Card className='border-border'>
      <div className='p-6'>
        <h2 className='text-xl font-semibold mb-6 text-foreground'>
          User Data Table
        </h2>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader field='id' label='ID' onSort={handleSort} />
                <SortableHeader
                  field='firstName'
                  label='Name'
                  onSort={handleSort}
                />
                <SortableHeader
                  field='email'
                  label='Email'
                  onSort={handleSort}
                />
                <TableHead>Role</TableHead>
                <SortableHeader
                  field='birthDate'
                  label='Year of Birth'
                  onSort={handleSort}
                />
                <SortableHeader
                  field='weight'
                  label='Weight (kg)'
                  onSort={handleSort}
                />
                <SortableHeader
                  field='height'
                  label='Height (cm)'
                  onSort={handleSort}
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='mt-6 flex items-center justify-between'>
          <PaginationInfo
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalUsers={totalUsers}
          />
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => canGoPrevious && onPageChange(currentPage - 1)}
                  className={
                    canGoPrevious
                      ? 'cursor-pointer'
                      : 'pointer-events-none opacity-50'
                  }
                />
              </PaginationItem>
              {paginationRange.map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => onPageChange(pageNum)}
                    isActive={currentPage === pageNum}
                    className='cursor-pointer'
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => canGoNext && onPageChange(currentPage + 1)}
                  className={
                    canGoNext
                      ? 'cursor-pointer'
                      : 'pointer-events-none opacity-50'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Card>
  );
};
