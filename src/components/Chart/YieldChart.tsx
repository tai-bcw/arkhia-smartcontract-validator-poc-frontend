import {
    alpha,
    CardContent,
    Stack,
    styled
} from "@mui/material";
import Card, { CardProps } from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import {
    Datum,
    ResponsiveLine,
    Serie
} from "@nivo/line";
import { patternDotsDef } from "@nivo/core";
import {
    useEffect,
    useMemo,
    useState
} from "react";
import MuiToggleButton from '@mui/material/ToggleButton';
import MuiToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { randomYieldDataGenerator } from "./sampleData/sampleYield";

import SingleStatDisplay from "@/components/Card/SingleStatDisplay";

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.5),
        padding: theme.spacing(1),
        border: 0,
        '&.Mui-disabled': { border: 0 },
        '&:not(:first-of-type)': { borderRadius: theme.shape.borderRadius },
        '&:first-of-type': { borderRadius: theme.shape.borderRadius },
    },
    alignItems: `center`
}));

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
    fontWeight: 600,
    fontSize: 14,
    fontFamily: `IBM Plex Mono`,
    '&.Mui-selected': { backgroundColor: alpha(theme.palette.primary.light, 0.2) }
}));

interface Props {
    cardProps?: CardProps;
}

export const YieldChart = (props: Props) => {
    const { cardProps } = props;
    const theme = useTheme();

    const [duration, setDuration] = useState(`week`);
    const [tickValues, setTickValues] = useState(`every 2 days`);
    const [lifetimeEarnings, setLifetimeEarnings] = useState(0);
    const [formattedData, setFormattedData] = useState<Serie[]>([]);

    const data = useMemo(() => {
        let days = 7;
        switch(duration) {
            case `week`:
                days = 7;
                setTickValues(`every 1 days`);
                break;
            case `month`:
                days = 30;
                setTickValues(`every 5 days`);
                break;
            case `year`:
            default:
                days = 365;
                setTickValues(`every 60 days`);
                break;
        }
        
        return randomYieldDataGenerator(days);
    }, [duration]);

    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        if (newAlignment)
            setDuration(newAlignment);
    };

    useEffect(() => {
        if (!data) return;

        const chartData: Serie[] = [{
            id: `yield`,
            data: [] as Datum[]
        }];

        let earnings = 0;

        for (const element of data) {
            const dateFromTimestamp = new Date(element.time * 1000);

            const [formattedDate] = dateFromTimestamp.toISOString().split(`T`);

            chartData[0].data.push({
                x: formattedDate,
                y: element.yield
            });

            earnings += element.yield;
        }

        setLifetimeEarnings(earnings);
        setFormattedData(chartData);
    }, [data]);

    return (
        <Card variant="outlined" {...cardProps}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={1}>
                        <SingleStatDisplay
                            isDense
                            cardProps={{
                                cardContainer: {
                                    variant: `elevation`, elevation: 0
                                }
                            }}
                            stats={{
                                end: lifetimeEarnings, suffix: `ℏ`
                            }}
                            title={`Earnings (${duration})`}
                            variant="subtitle2"
                        />
                        <SingleStatDisplay
                            isDense
                            cardProps={{
                                cardContainer: {
                                    variant: `elevation`, elevation: 0
                                }
                            }}
                            stats={{
                                end: 22, suffix: `%`
                            }}
                            title="Average rate"
                            variant="subtitle2"
                        />
                    </Stack>
                    <ToggleButtonGroup
                        exclusive
                        aria-label="text alignment"
                        onChange={handleAlignment}
                        value={duration}
                    >
                        <ToggleButton aria-label="left aligned" value="week">
                            1W
                        </ToggleButton>
                        <ToggleButton aria-label="centered" value="month">
                            1M
                        </ToggleButton>
                        <ToggleButton aria-label="right aligned" value="year">
                            1Y
                        </ToggleButton>
                        <ToggleButton aria-label="justified" value="all">
                            ALL
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <div style={{
                    textAlign: `center`,
                    height: `120px`,
                }}
                >
                    <ResponsiveLine
                        enableArea
                        isInteractive
                        useMesh
                        axisBottom={{
                            format: `%b %d`,
                            tickValues,
                        }}
                        axisLeft={null}
                        colors={[theme.palette.primary.main]}
                        curve="stepBefore"
                        data={formattedData}
                        defs={[
                            patternDotsDef(`dots-pattern`, {
                                size: 2,
                                padding: 2,
                                background: theme.palette.background.default,
                                color: theme.palette.primary.dark
                            })
                        ]}
                        enableGridX={false}
                        enableGridY={false}
                        enablePoints={false}
                        fill={[
                            {
                                match: `*`, id: `dots-pattern`
                            }
                        ]}
                        margin={{
                            top: 16, bottom: 32, left: 32, right: 32
                        }}
                        theme={{
                            background: `transparent`,
                            textColor: theme.palette.text.primary
                        }}
                        xFormat="time:%Y-%m-%d"
                        xScale={{
                            type: `time`,
                            format: `%Y-%m-%d`,
                            useUTC: false,
                            precision: `day`,
                        }}
                        yScale={{ type: `linear` }}
                    />
                </div>
            </CardContent>
        </Card>
    );
};
