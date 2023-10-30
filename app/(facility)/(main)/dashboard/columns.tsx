'use client';

import { DrugItem } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<DrugItem>[] = [
  {
    accessorKey: 'brandName',
    header: 'Brand Name',
  },
  {
    accessorKey: 'genericName',
    header: 'Generic Name',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'BWP',
      }).format(amount);

      return <div className=''>{formatted}</div>;
    },
  },
];
