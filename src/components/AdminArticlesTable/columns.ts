export const columns = [
  {
    Header: 'Article title',
    accessor: 'title',
  },
  {
    Header: 'Perex',
    accessor: 'perex',
  },
] as const;

export type ColumnsType = typeof columns;
