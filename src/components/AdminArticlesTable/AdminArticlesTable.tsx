import Link from 'next/link';
import { FC } from 'react';
import { BiTrashAlt } from 'react-icons/bi';
import { BsPencil } from 'react-icons/bs';
import { useTable } from 'react-table';

import { IAdminArticlesTableProps } from '@/components';

export const AdminArticlesTable: FC<IAdminArticlesTableProps> = ({
  columns,
  data,
  handleDeleteArticle,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} className='w-full '>
      <thead className='mb-2 border-b border-borderGrey text-left'>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={`header-group-${headerGroup.id}`}
          >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={`column-${column.id}`}>
                {column.render('Header')}
              </th>
            ))}
            <th className='text-right'>Actions</th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          const articleId = row.original.articleId;
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className='space-y-6'
              key={`rows-${row.id}`}
            >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} key={`cell-${cell.column}`}>
                  {cell.render('Cell')}
                </td>
              ))}
              <td className='flex flex-row justify-end gap-4 text-right'>
                <Link href={`/admin/edit/${articleId}`}>
                  <BsPencil />
                </Link>
                <button
                  type='button'
                  onClick={() => handleDeleteArticle(articleId)}
                  aria-label={`Delete article ${articleId}`}
                >
                  <BiTrashAlt />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
