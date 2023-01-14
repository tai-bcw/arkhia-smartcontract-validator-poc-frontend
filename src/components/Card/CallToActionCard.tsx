import ArrowForwardIcon from '@mui/icons-material/ArrowForwardOutlined';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Link from "@mui/material/Link";
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

interface Props {
    titleProps: {
        title: string;
        subtitle?: string;
        variant?: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined;
    },
    linkProps: {
        label: string;
        variant?: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined;
        onClick: () => void;
    };
}

export default function CallToActionCard (props: Props) {
    const { titleProps, linkProps } = props;
    const {
        title,
        subtitle,
        variant: titleVariant = `h4`,
    } = titleProps;

    const {
        variant: linkVariant = `inherit`,
        onClick,
        label
    } = linkProps;

    return (
        <Card variant="outlined" sx={{ height: `100%` }}>
            <CardHeader
                disableTypography
                title={
                    <Typography gutterBottom={Boolean(subtitle)} variant={titleVariant}>
                        { title }
                    </Typography>
                }
                subheader={
                    <Typography variant="subtitle2">
                        { subtitle }
                    </Typography>
                }
            />
            <CardContent>
                <Link
                    component="button"
                    variant={linkVariant}
                    onClick={onClick}
                >
                    <Stack direction="row" alignItems="center">
                        <Typography variant="inherit">
                            { label }
                        </Typography>
                        <ArrowForwardIcon
                            fontSize="small"
                            sx={{ ml: 1 }}
                        />
                    </Stack>
                </Link>
            </CardContent>
        </Card>
    );
}
