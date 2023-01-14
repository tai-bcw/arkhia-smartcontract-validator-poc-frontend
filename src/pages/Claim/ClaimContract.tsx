import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
    useContext,
    useEffect,
    useState
} from "react";
import TextField from "@mui/material/TextField";
import {
    Button,
    Chip,
    InputLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import SectionCard from "@/components/Card/SectionCard";
import { sitemap } from "@/routes/sitemap";
import { ContractContext } from "@/providers/contractContext";
import { AdminKey } from "@/api/useGetContract";

export const ClaimContract = () => {
    const navigate = useNavigate();

    const { contractId, contractInfo } = useContext(ContractContext);

    const [publicKey, setPublicKey] = useState<AdminKey>({} as AdminKey);
    const [digitalKey, setDigitalKey] = useState(``);
    const [signedKey, setSignedKey] = useState(``);

    useEffect(() => {
        if (!contractId) navigate(String(sitemap.CLAIM));
    });

    useEffect(() => {
        const adminKey = contractInfo?.find((val) => val[0] === `admin_key`);

        if (adminKey)
            setPublicKey(adminKey[1] as AdminKey);
    }, [contractInfo]);

    const handleContinue = () => {
        navigate(`${sitemap.CLAIM}/${contractId}/confirm`);
    };

    return(
        <SectionCard
            cardHeaderProps={{
                title: (
                    <Typography variant="body2">
                        Claim Contract
                    </Typography>
                ),
            }}
        >
            <Grid item xs={12}>
                <InputLabel id="public-key-label">Public Key</InputLabel>
                <TextField
                    fullWidth
                    aria-labelledby="public-key-label"
                    id="public-key"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <Chip color="success" label={publicKey._type} />
                        )
                    }}
                    value={publicKey.key}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    id="digital-key"
                    InputProps={{ style: { fontFamily: `IBM Plex Mono` } }}
                    label="Digital Key to Sign"
                    onChange={(e) => setDigitalKey(e.target.value)}
                    rows={4}
                    value={digitalKey}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    id="signed-digital-key"
                    InputProps={{ style: { fontFamily: `IBM Plex Mono` } }}
                    label="Signed Digital Key"
                    onChange={(e) => setSignedKey(e.target.value)}
                    rows={4}
                    value={signedKey}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    disabled={digitalKey === `` || signedKey === ``}
                    onClick={handleContinue}
                    variant="contained"
                >
                    Continue
                </Button>
            </Grid>
        </SectionCard>
    );
};
