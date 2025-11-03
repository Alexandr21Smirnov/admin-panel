export const PaginationInfo = ({
  currentPage,
  itemsPerPage,
  totalUsers
}: {
  currentPage: number;
  itemsPerPage: number;
  totalUsers: number;
}) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalUsers);

  return (
    <p className="text-sm text-muted-foreground">
      Showing {start} to {end} of {totalUsers} users
    </p>
  );
};
