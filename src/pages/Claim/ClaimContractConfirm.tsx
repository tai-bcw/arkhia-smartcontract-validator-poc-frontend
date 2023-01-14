import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import {
    Button,
    IconButton,
    Card as MuiCard,
    Stack,
    Avatar,
    CardContent,
    CardHeader,
    TextField,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

import SectionCard from "@/components/Card/SectionCard";
import { desktopBreakpoint } from '@/providers/themeProvider';

const Card = styled(MuiCard)(({ theme }) => ({
    cursor: `pointer`,
    transition: `0.1s ease-in`,
    '&:hover': {
        transform: `scale(1.01)`,
        boxShadow: theme.shadows[1],
    },
}));

interface ContractIdentity {
    key: string;
    value: string;
}

export const ClaimContractConfirm = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up(desktopBreakpoint));

    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [identities, setIdentities] = useState<ContractIdentity[]>([{
        key: `Hello1`, value: `World`
    },{
        key: `Hello2`, value: `World`
    },{
        key: `Hello3`, value: `World`
    }]);
    
    const handleSetKey = ({ key, value }: ContractIdentity) => {
        // should check for uniqueness

        setIdentities(
            identities.map((identity) => {
                if (identity.value === value) {
                    return {
                        ...identity, key
                    };
                }

                return identity;
            })
        );
    };
    
    const handleSetValue = ({ key, value }: ContractIdentity) => {
        setIdentities(
            identities.map((identity) => {
                if (identity.key === key) {
                    return {
                        ...identity, value
                    };
                }

                return identity;
            })
        );
    };

    const handleDeleteIdentity = (key: string) => {
        if (!isDeleteMode) return;

        const filteredArray = identities.filter((identity) => identity.key !== key);
        setIdentities(filteredArray);
    };

    const handleNewIdentity = () => {
        if (identities.findIndex(identity => identity.key === ``) === -1)
            setIdentities(
                [...identities, {
                    key: ``, value: ``
                }]
            );
    };

    return (
        (
            <Stack
                direction="column"
                spacing={3}
                sx={{ p: 3 }}
            >
                <SectionCard
                    cardHeaderProps={{
                        title: (
                            <Typography variant="body2">
                                Submit Contract Identity
                            </Typography>
                        ),
                        action: (
                            <IconButton
                                onClick={() => setIsDeleteMode(!isDeleteMode)}
                            >
                                {isDeleteMode ? <CloseIcon /> : <DeleteIcon />}
                            </IconButton>
                        )
                    }}
                >
                    <Grid item xs={12}>
                        <Stack direction="column" spacing={2}>
                            { identities?.map((identity, index) => (
                                <Card
                                    sx={{
                                        display: `flex`,
                                        width: `100%`,
                                        flexDirection: isDesktop ? `row` : `column`,
                                    }}
                                    variant="outlined"
                                >
                                    <CardHeader
                                        disableTypography
                                        sx={{ flexWrap: isDesktop ? `wrap` : `nowrap` }}
                                        title={(
                                            <Avatar
                                                onClick={() => handleDeleteIdentity(identity.key)}
                                                sx={{ bgcolor: isDeleteMode ? theme.palette.error.main : theme.palette.primary.light }}
                                            >
                                                {isDeleteMode ? <RemoveIcon /> :String(index+1)}
                                            </Avatar>
                                        )}
                                    />
                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            pt: theme.spacing(isDesktop ? 3 : 1),
                                            pb: `${theme.spacing(3)} !important`,
                                        }}
                                    >
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="key-id"
                                                    label="Key"
                                                    onChange={(e) => handleSetKey({
                                                        key: e.target.value, value: identity.value
                                                    })}
                                                    value={identity.key}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="value-id"
                                                    label="Value"
                                                    onChange={(e) => handleSetValue({
                                                        key: identity.key, value: e.target.value
                                                    })}
                                                    value={identity.value}
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            ))}
                            <Card
                                onClick={handleNewIdentity}
                                sx={{
                                    display: `flex`,
                                    width: `100%`,
                                    flexDirection: isDesktop ? `row` : `column`,
                                    border: `1px dashed ${theme.palette.grey[800]}`
                                }}
                                variant="outlined"
                            >
                                <CardContent
                                    sx={{
                                        flexGrow: 1,
                                        pt: theme.spacing(isDesktop ? 3 : 1),
                                        pb: `${theme.spacing(3)} !important`,
                                    }}
                                >
                                    <Stack alignItems="center" direction="row" justifyContent="center" spacing={2}>
                                        <Typography variant="button">
                                            Add a new identity
                                        </Typography>
                                        <AddCircleOutlineIcon />
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            disabled={identities.length === 0} // more checks needed
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Grid>
                </SectionCard>
            </Stack>
        )
    );
};
