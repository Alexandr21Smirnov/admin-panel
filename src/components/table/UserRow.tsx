import { User } from "@/types/user";
import { TableCell, TableRow } from "../ui/table";
import { Badge } from '@/components/ui/badge';
import { getBirthYear } from "@/lib/utils";

export const UserRow = ({ user }: { user: User }) => (
  <TableRow className="hover:bg-muted/50">
    <TableCell className="font-medium">{user.id}</TableCell>
    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
    <TableCell className="text-muted-foreground">{user.email}</TableCell>
    <TableCell>
      <Badge
        variant={user.role === 'admin' ? 'default' : 'secondary'}
        className="capitalize"
      >
        {user.role}
      </Badge>
    </TableCell>
    <TableCell>{getBirthYear(user.birthDate)}</TableCell>
    <TableCell>{user.weight.toFixed(1)}</TableCell>
    <TableCell>{user.height.toFixed(1)}</TableCell>
  </TableRow>
);
