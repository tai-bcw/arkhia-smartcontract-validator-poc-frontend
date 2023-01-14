import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
    Button,
    Stack
} from "@mui/material";


import SectionCard from "@/components/Card/SectionCard";

export const VerifyContractConfirm = () => {
    const [contractName, setContractName] = useState(``);
    const [isOptimized, setIsOptimized] = useState(``);
    const [compilerVersion, setCompilerVersion] = useState(``);
    const [otherSettings, setOtherSettings] = useState(``);
    const [derivedABI, setDerivedABI] = useState(``);
    const [byteCode, setByteCode] = useState(``);
    const [byteCodeSourcemap, setByteCodeSourcemap] = useState(``);

    useEffect(() => {
        setContractName(``);
        setIsOptimized(``);
        setCompilerVersion(``);
        setOtherSettings(``);
        setDerivedABI(``);
        setByteCode(``);
        setByteCodeSourcemap(``);
    }, []);

    const handleSubmit = () => {

    };

    return(
        <Stack
            direction="column"
            spacing={3}
            sx={{ p: 3 }}
        >
            <SectionCard
                cardHeaderProps={{
                    title: (
                        <Typography variant="body2">
                            Verify Contract Information
                        </Typography>
                    ),
                }}
            >
                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        id="contract-name"
                        InputProps={{ readOnly: true }}
                        label="Contract Name"
                        value={contractName}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        id="compiler-version"
                        InputProps={{ readOnly: true }}
                        label="Compiler Version"
                        value={compilerVersion}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        id="is-optimized"
                        InputProps={{ readOnly: true }}
                        label="Optimization Enabled?"
                        value={isOptimized}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        id="other-settings"
                        InputProps={{ readOnly: true }}
                        label="Other Settings"
                        value={otherSettings}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        id="derived-abi"
                        InputProps={{
                            readOnly: true,
                            style: { fontFamily: `IBM Plex Mono` }
                        }}
                        label="Derived ABI"
                        rows={4}
                        value={derivedABI}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        id="contract-byte-code"
                        InputProps={{
                            readOnly: true,
                            style: { fontFamily: `IBM Plex Mono` }
                        }}
                        label="Contract Byte Code"
                        rows={4}
                        value={byteCode}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        id="byte-code-sourcemap"
                        InputProps={{
                            readOnly: true,
                            style: { fontFamily: `IBM Plex Mono` }
                        }}
                        label="Deployed Byte Code Sourcemap"
                        rows={4}
                        value={byteCodeSourcemap}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        disabled={byteCode === `` || contractName === `` || compilerVersion === `` || isOptimized === ``}
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </Grid>
            </SectionCard>
        </Stack>
    );
};
