import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { compilerVersions } from "./compilerVersion";

import SectionCard from "@/components/Card/SectionCard";
import { sitemap } from "@/routes/sitemap";

export const VerifyContract = () => {
    const navigate = useNavigate();
    const { contractId: id } = useParams();

    const [contractName, setContractName] = useState(``);
    const [byteCode, setByteCode] = useState(``);
    const [isOptimized, setIsOptimized] = useState(``);
    const [compilerVersion, setCompilerVersion] = useState(``);

    const handleVersionChange = (event: SelectChangeEvent) => {
        setCompilerVersion(event.target.value as string);
    };

    const handleIsOptimized = (event: SelectChangeEvent) => {
        setIsOptimized(event.target.value as string);
    };

    const handleContinue = () => {
        navigate(`${sitemap.VERIFY}/${id}/confirm`);
    };

    return(
        <SectionCard
            cardHeaderProps={{
                title: (
                    <Typography variant="body2">
                        Verify Contract
                    </Typography>
                ),
            }}
        >
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Is Optimized?</InputLabel>
                    <Select
                        fullWidth
                        id="select-is-optimized"
                        label="Is Optimized?"
                        onChange={handleIsOptimized}
                        value={isOptimized}
                    >
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Compiler Version</InputLabel>
                    <Select
                        fullWidth
                        id="compiler-version"
                        label="Compiler Version"
                        onChange={handleVersionChange}
                        value={compilerVersion}
                    >
                        { compilerVersions.map((version) => (
                            <MenuItem key={version} value={version}>{version}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="contract-id"
                    label="Contract Name"
                    onChange={(e) => setContractName(e.target.value)}
                    value={contractName}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    id="contract-id"
                    InputProps={{ style: { fontFamily: `IBM Plex Mono` } }}
                    label="Byte Code"
                    onChange={(e) => setByteCode(e.target.value)}
                    rows={4}
                    value={byteCode}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    disabled={byteCode === `` || contractName === `` || compilerVersion === `` || isOptimized === ``}
                    onClick={handleContinue}
                    variant="contained"
                >
                    Continue
                </Button>
            </Grid>
        </SectionCard>
    );
};
