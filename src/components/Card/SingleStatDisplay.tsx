import { CardActionArea, useTheme } from "@mui/material";
import Card, { CardProps } from "@mui/material/Card";
import CardContent, { CardContentProps } from "@mui/material/CardContent";
import CardHeader, { CardHeaderProps } from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import React from "react";
import CountUp, { CountUpProps } from 'react-countup';

interface ExtendedCountUpProps {
    end: number;
    prefix?: string | JSX.Element | undefined;
    suffix?: string | JSX.Element | undefined;
}

export interface SingleStatDisplayProps {
    title: string;
    cardProps?: {
        cardContainer?: CardProps;
        cardHeader?: CardHeaderProps;
        cardContent?: CardContentProps;
    }
    children?: React.ReactNode;
    href?: string;
    isDense?: boolean;
    onClick?: () => void;
    stats?: CountUpProps | ExtendedCountUpProps;
    variant?: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline";
    
}

export default function SingleStatDisplay (props: SingleStatDisplayProps) {
    const {
        title,
        cardProps,
        children,
        href,
        isDense = false,
        onClick,
        stats,
        variant = `h4`,
    } = props;

    const theme = useTheme();

    const prefixIsString = typeof(stats?.prefix) === `string`;
    const suffixIsString = typeof(stats?.suffix) === `string`;

    return (
        <Card
            sx={{
                height: `100%`,
                p: isDense ? 1 : 0
            }}
            variant="outlined"
            {...cardProps?.cardContainer}
        >
            <CardActionArea
                disabled={!href}
                href={href ?? ``}
                onClick={onClick ?? undefined}
                target={href ? `_blank` : undefined}
            >
                <CardHeader
                    disableTypography
                    sx={{ p: isDense ? 0 : undefined }}
                    title={(
                        <Typography sx={{ fontWeight: 600 }} variant="body2">
                            { title }
                        </Typography>
                    )}
                />
                <CardContent
                    sx={{ p: isDense ? 0 : undefined }}
                >
                    {
                        stats && (
                            <Typography
                                color={theme.palette.grey[theme.palette.mode === `dark` ? 400 : 700]}
                                sx={{ fontFamily: `IBM Plex Mono` }}
                                variant={variant}
                            >
                                { prefixIsString ? <></> : stats.prefix }
                                <CountUp
                                    {...stats}
                                    duration={1}
                                    end={stats.end}
                                    prefix={typeof(stats.prefix) === `string` ? stats.prefix : ``}
                                    suffix={typeof(stats.suffix) === `string` ? stats.suffix : ``}
                                />
                                { suffixIsString ? <></> : stats.suffix }
                            </Typography>
                        )
                    }
                    { children }
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
