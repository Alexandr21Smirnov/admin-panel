import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { User } from "@/types/user";

interface UserChartProps {
  users: User[];
}

export const UserChart = ({ users }: UserChartProps) => {
  const birthYearData = users.reduce((acc, user) => {
    const year = new Date(user.birthDate).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const chartData = Object.entries(birthYearData)
    .map(([year, count]) => ({
      year: parseInt(year),
      users: count,
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <Card className="p-6 border-border">
      <h2 className="text-xl font-semibold mb-6 text-foreground">User Distribution by Birth Year</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="year"
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="users"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', r: 5 }}
            activeDot={{ r: 7 }}
            name="Number of Users"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
