# Ring Chart

ES6 d3.js ring chart visualization.


## Style

Style is expected to be addressed via css. The top-level svg is assigned a class `lgv-ring-chart`. Any style not met by the visualization module is expected to be added by the importing component.

## Environment Variables

The following values can be set via environment or passed into the class.

| Name | Type | Description |
| :-- | :-- | :-- |
| `DIMENSION_HEIGHT` | integer | height of artboard |
| `DIMENSION_WIDTH` | integer | width of artboard |

## Install

```bash
# install package
npm install @lgv/ring-chart
```

## Data Format

The following values are the expected input data structure.

```json
[
    {
        label: "xyz",
        value: 1
    },
    {
        label: "abc",
        value: 3
    }
]
```

## Use Module

```bash
import { RingChart } from "@lgv/ring-chart";

// initialize
const rc = new RingChart(data);

// render visualization
rc.render(document.body);
```
