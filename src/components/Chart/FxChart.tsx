import {
    Card,
    CardContent,
    useTheme,
} from "@mui/material";
import { AdvancedChartBarStyle, AdvancedRealTimeChart } from "react-tradingview-widget-components";

export const FxChart = () => {
    const theme = useTheme();

    return (
        <Card variant="outlined">
            <CardContent>
                <AdvancedRealTimeChart
                    autosize
                    chartOnly
                    containerStyles={{
                        minHeight: `120px`,
                        maxHeight: `420px`,
                        width: `100%`
                    }}
                    interval="60"
                    style={AdvancedChartBarStyle.CANDLES}
                    symbol="BINANCE:HBARUSD" //, `BINANCE:KLAYUSD`]}
                    theme={theme.palette.mode}
                />
            </CardContent>
        </Card>
    );
};
