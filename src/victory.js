import React from "react";
import { VictoryBar, VictoryPie } from "victory";

const datamei = [
    { quarter: 1, earnings: 100000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

export class BarChart extends React.Component {
    render() {
        return (
            <div>
                <VictoryPie data={datamei} x={"quarter"} y={"earnings"} />
                <VictoryBar data={datamei} x={"quarter"} y={"earnings"} />
            </div>
        );
    }
}
