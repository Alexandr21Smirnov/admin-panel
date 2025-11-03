import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, TrendingUp, Activity, Scale } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { UserChart } from '@/components/UserChart';
import { UserTable } from '@/components/table/UserTable';
import { User, UsersResponse } from '@/types/user';
import { toast } from 'sonner';

const fetchUsers = async (
  page: number,
  limit: number
): Promise<UsersResponse> => {
  const skip = (page - 1) * limit;
  const response = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

const calculateMedian = (numbers: number[]): number => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

const calculateAverage = (numbers: number[]): number => {
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', currentPage, itemsPerPage],
    queryFn: () => fetchUsers(currentPage, itemsPerPage),
  });

  if (error) {
    toast.error('Failed to load user data');
  }

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='text-center space-y-4'>
          <Activity className='w-12 h-12 animate-pulse text-primary mx-auto' />
          <p className='text-muted-foreground'>Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!data?.users) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background'>
        <div className='text-center'>
          <p className='text-destructive'>Failed to load user data</p>
        </div>
      </div>
    );
  }

  const users = data.users;
  const ages = users.map((user) => {
    const birthDate = new Date(user.birthDate);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear();
  });

  const stats = {
    totalUsers: users.length,
    medianAge: calculateMedian(ages),
    avgWeight: calculateAverage(users.map((u) => u.weight)),
    avgHeight: calculateAverage(users.map((u) => u.height)),
  };

  return (
    <div className='min-h-screen bg-background'>
      <header className='border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10'>
        <div className='container mx-auto px-4 py-6'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
            User Admin Panel
          </h1>
          <p className='text-muted-foreground mt-2'>
            Comprehensive analytics and user management dashboard
          </p>
        </div>
      </header>

      <main className='container mx-auto px-4 py-8 space-y-8'>
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatCard
            title='Total Users'
            value={stats.totalUsers}
            icon={Users}
            description='Active users in system'
          />
          <StatCard
            title='Median Age'
            value={`${stats.medianAge} years`}
            icon={TrendingUp}
            description='Middle age value'
          />
          <StatCard
            title='Average Weight'
            value={`${stats.avgWeight.toFixed(1)} kg`}
            icon={Scale}
            description='Mean user weight'
          />
          <StatCard
            title='Average Height'
            value={`${stats.avgHeight.toFixed(1)} cm`}
            icon={Activity}
            description='Mean user height'
          />
        </section>

        <section>
          <UserChart users={users} />
        </section>

        <section>
          <UserTable
            users={users}
            currentPage={currentPage}
            totalUsers={data.total}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
