import Stack from "@mui/material/Stack";
import {
    Container,
    useTheme
} from "@mui/material";
import Box from "@mui/system/Box";


import { ContractsList } from "@/components/Table/ContractsList";

export const Home = () => {
    const theme = useTheme();
    return (
        <Container maxWidth={false} sx={{ maxWidth: 1600 }}>
            <Box sx={{ pt: 3 }}>
                <Stack spacing={2}>
                    <ContractsList />
                </Stack>
            </Box>
        </Container>
    );
};
