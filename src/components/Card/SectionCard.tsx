import Card from "@mui/material/Card";
import CardContent, { CardContentProps } from "@mui/material/CardContent";
import CardHeader, { CardHeaderProps as MuiCardHeaderProps } from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { GrowingDiv } from "@/components/NavBar/NavBar";

interface Props {
    cardHeaderProps: CardHeaderProps;
    cardContentProps?: CardContentProps;
    gridContainerProps?: {
        direction?: 'column-reverse' | 'column' | 'row-reverse' | 'row',
        alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline',
        justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
    };
    children?: React.ReactNode;
}

interface CardHeaderProps extends MuiCardHeaderProps {
    icon?: JSX.Element,
    title: JSX.Element | string,
    button?: JSX.Element,
}

export default function SectionCard (props: Props) {
    const {
        cardHeaderProps,
        cardContentProps,
        gridContainerProps,
        children
    } = props;

    const {
        icon,
        title,
        button,
        ...other
    } = cardHeaderProps;

    return (
        <Card
            variant="outlined"
        >
            <CardHeader
                disableTypography
                title={(
                    <Stack alignItems="center" direction="row" spacing={2}>
                        { icon }
                        { typeof(title) === `string` ? (
                            <Typography component="h2" fontWeight={400} variant="h4">
                                { title }
                            </Typography>
                        ) :
                            title}
                        <GrowingDiv />
                        { button }
                    </Stack>
                )}
                {...other}
            />
            <Divider />
            <CardContent {...cardContentProps}>
                <Grid
                    container
                    alignItems={gridContainerProps?.alignItems ?? `center`}
                    direction={gridContainerProps?.direction ?? `row`}
                    justifyContent={gridContainerProps?.justifyContent ?? undefined}
                    spacing={2}
                >
                    { children ?? `Nothing here.`}
                </Grid>
            </CardContent>
        </Card>
    );
}
