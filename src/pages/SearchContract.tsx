import {
    Button,
    Collapse,
    Grid,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import Stack from "@mui/material/Stack";
import React, {
    useContext,
    useEffect,
    useState
} from "react";
import {
    Outlet,
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";

import SectionCard from "@/components/Card/SectionCard";
import { ContractContext } from "@/providers/contractContext";

export const SearchContract = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { contractId: id } = useParams();

    const {
        contractId,
        setContractId,
        contractInfo,
        errorMessage,
        handleSubmitContractId,
    } = useContext(ContractContext);

    const [currentPath, setCurrentPath] = useState(``);

    useEffect(() => {
        console.log(location.pathname.substring(1).split(`/`)[0]);
        setCurrentPath(location.pathname.substring(1).split(`/`)[0]);
    }, [location]);

    const handleContinue = () => {
        navigate(`/${currentPath}/${contractId}`);
    };

    return (
        <Stack
            direction="column"
            spacing={3}
            sx={{ p: 3 }}
        >
            <SectionCard
                cardHeaderProps={{
                    title: (
                        <Typography variant="body2">
                            Search Contract
                        </Typography>
                    ),
                }}
            >
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        error={errorMessage !== ``}
                        helperText={errorMessage}
                        id="contract-id"
                        InputProps={{
                            endAdornment: (id === undefined && (
                                <InputAdornment position="end">
                                    <Button
                                        aria-label="search contract id"
                                        onClick={handleSubmitContractId}
                                        variant="outlined"
                                    >
                                        Search
                                    </Button>
                                </InputAdornment>
                            )
                            ),
                            readOnly: id !== undefined
                        }}
                        label={`Enter the Contract ID you would like to ${currentPath}`}
                        onChange={(e) => setContractId(e.target.value)}
                        value={contractId}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={contractInfo !== undefined && id === undefined}>
                        <Stack
                            direction="column"
                            spacing={0}
                            sx={{ pb: 2 }}
                        >
                            {
                                contractInfo?.map((el) => {
                                    console.log(el);

                                    if (el[0] === `admin_key`) {
                                        return (
                                            <Stack direction="row" spacing={1}>
                                                <Typography
                                                    sx={{ fontWeight: 600 }}
                                                    variant="body2"
                                                >
                                                    { el[0] }
                                                    :
                                                </Typography>
                                                <Typography variant="body2">
                                                    { (el[1] as { key: string, _type: string }).key }
                                                </Typography>
                                                <Typography variant="body2">
                                                    { (el[1] as { key: string, _type: string })._type }
                                                </Typography>
                                            </Stack>
                                        );
                                    }

                                    if (typeof(el[1]) === `object`) return <></>;
                            
                                    return (
                                        <Stack direction="row" spacing={1}>
                                            <Typography
                                                sx={{ fontWeight: 600 }}
                                                variant="body2"
                                            >
                                                {el[0]}
                                                :
                                            </Typography>
                                            <Typography variant="body2">
                                                {el[1] as string}
                                            </Typography>
                                        </Stack>
                                    );
                                })
                            }
                        </Stack>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                onClick={handleContinue}
                                variant="contained"
                            >
                                Continue
                            </Button>
                        </Grid>
                    </Collapse>
                </Grid>
            </SectionCard>
            <Outlet />
        </Stack>
    );
};
