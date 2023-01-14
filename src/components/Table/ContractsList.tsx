import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

import SectionCard from '../Card/SectionCard';

import {
    ContractsEntity,
    HederaContractsResponse,
    useGetContracts
} from '@/api/useGetContracts';
import { NetworkIcon } from '@/assets/networks/networkIcon';
import { timestampToDatetime } from '@/utils/hederaUtils';
import { fetcher, pathToMirrorNode } from '@/utils/apiHandler';

interface HeadCell {
    id: keyof ContractsEntity;
    label: string;
    numeric: boolean;
    minWidth?: number;
}

const headCells: readonly HeadCell[] = [
    {
        id: `contract_id`,
        numeric: false,
        label: `Contract ID`,
    },
    {
        id: `created_timestamp`,
        numeric: false,
        label: `Creation Date`,
        minWidth: 150,
    },
    {
        id: `expiration_timestamp`,
        numeric: false,
        label: `Expiration Date`,
        minWidth: 150,
    },
    {
        id: `file_id`,
        numeric: false,
        label: `File ID`,
    },
    {
        id: `obtainer_id`,
        numeric: false,
        label: `Obtainer ID`,
    },
    {
        id: `memo`,
        numeric: false,
        label: `Memo`,
    },
];

export const ContractsList = () => {
    const {
        data: hederaContracts,
        isError,
        isLoading,
    } = useGetContracts();

    const [rows, setRows] = useState<ContractsEntity[]>([] as ContractsEntity[]);
    const [nextPageLink, setNextPageLink] = useState(``);
    const [page, setPage] = useState(0);
    const [traversed, setTraversed] = useState(0);

    const rowsPerPage = 25;

    useEffect(() => {
        if (isLoading || isError) return;

        if (hederaContracts?.contracts && hederaContracts.links) {
            setRows(hederaContracts.contracts);
            setTraversed(hederaContracts.contracts.length);

            setNextPageLink(hederaContracts.links.next);
        }
    }, [hederaContracts, isError, isLoading]);

    const handleChangePage = (event: unknown, newPage: number) => {
        const getNextContracts = async () => {
            if (!nextPageLink) return;

            const url = pathToMirrorNode(nextPageLink);
            const res = await fetcher<HederaContractsResponse>({ queryKey: [url, undefined] });

            if (!res.contracts) return;

            if (traversed <= (newPage * rowsPerPage)) {
                const data = rows.concat(res.contracts);

                setRows(data);
                setNextPageLink(res.links.next);
            }
        };

        getNextContracts();
        setPage(newPage);
    };


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <SectionCard
            cardContentProps={{ sx: { pr: 0 } }}
            cardHeaderProps={{
                title: (
                    <Typography variant="body2">
                        Smart Contracts
                    </Typography>
                ),
                icon: <NetworkIcon isAvatar chainId={295} />
            }}
        >
            <Paper sx={{
                width: `100%`,
                mb: 2,
            }}
            >
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size="medium"
                        sx={{ minWidth: 1024 }}
                    >
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? `right` : `left`}
                                        size="small"
                                        sx={{
                                            minWidth: headCell.minWidth,
                                            fontWeight: 600
                                        }}
                                    >
                                        {headCell.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            key={row.contract_id}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                {row.contract_id}
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">
                                                    {timestampToDatetime(row.created_timestamp)[0]}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">
                                                    {timestampToDatetime(row.expiration_timestamp)[0]}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{row.file_id}</TableCell>
                                            <TableCell>{row.obtainer_id}</TableCell>
                                            <TableCell>
                                                <Typography variant="caption">
                                                    {row.memo}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{ height: (53) * emptyRows, }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={-1}
                    onPageChange={handleChangePage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[25]}
                />
            </Paper>
        </SectionCard>
    );
};
