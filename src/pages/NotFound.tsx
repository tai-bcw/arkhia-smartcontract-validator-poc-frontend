import Button from "@mui/material/Button";
import MuiContainer from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useLottie } from "lottie-react";
import { useNavigate } from "react-router-dom";

import searchFileLottie from "@/assets/animations/search_file.json";

const LottieContainer = styled(MuiContainer)({ maxWidth: 400 });

export const NotFound = () => {
    const navigate = useNavigate();
    const { View } = useLottie({
        animationData: searchFileLottie,
        loop: true,
        autoplay: true,
    });

    return (
        <Stack
            alignItems="center"
            direction="column"
            justifyContent="center"
            spacing={2}
            sx={{ flexGrow: 1 }}
        >
            <LottieContainer maxWidth="xs">
                { View }
            </LottieContainer>
            <Typography variant="h6">
                Oops! Something went wrong.
            </Typography>
            <Button
                onClick={() => navigate(-1)}
                variant="contained"
            >
                Go Back
            </Button>
        </Stack>
    );
};
