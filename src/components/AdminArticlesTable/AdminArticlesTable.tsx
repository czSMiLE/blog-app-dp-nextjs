/* eslint-disable react/jsx-key */
import Link from 'next/link';
import { BiTrashAlt } from 'react-icons/bi';
import { BsPencil } from 'react-icons/bs';
import { useTable } from 'react-table';

import { Article } from '@/types/ArticlesType';

type AdminArticlesTableProps = {
  columns: any;
  data: Article[];
  handleDeleteArticle: (articleId: string) => void;
};

const AdminArticlesTable = ({
  columns,
  data,
  handleDeleteArticle,
}: AdminArticlesTableProps) => {
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()} className='w-full '>
      <thead className='mb-2 border-b border-borderGrey text-left'>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
            <th className='text-right'>Actions</th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          const articleId = (row.original as any).articleId;
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className='space-y-6'>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
              <td className='flex flex-row justify-end gap-4 text-right'>
                <Link href={`/admin/edit/${articleId}`}>
                  <BsPencil />
                </Link>
                <button
                  type='button'
                  onClick={() => handleDeleteArticle(articleId)}
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

export default AdminArticlesTable;
