# Ring Chart

ES6 d3.js ring chart visualization.

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
        "label": "xyz",
        "value": 1
    },
    {
        "label": "abc",
        "value": 3
    }
]
```

## Use Module

```bash
import { RingChart } from "@lgv/ring-chart";

// have some data
let data = [
    {
        "label": "xyz",
        "value": 1
    },
    {
        "label": "abc",
        "value": 3
    }
]

// initialize
const rc = new RingChart(data);

// render visualization
rc.render(document.body);
```

## Environment Variables

The following values can be set via environment or passed into the class.

| Name | Type | Description |
| :-- | :-- | :-- |
| `DIMENSION_HEIGHT` | integer | height of artboard |
| `DIMENSION_WIDTH` | integer | width of artboard |

## Style

Style is expected to be addressed via css. Any style not met by the visualization module is expected to be added by the importing component.

| Class | Element |
| :-- | :-- |
| `lgv-ring-chart` | top-level svg element |
| `lgv-arc` | ring arc element |
| `lgv-label` | arc text label element |

## Actively Develop

```bash
# clone repository
git clone <repo_url>

# update directory context
cd ring-chart

# run docker container
docker run \
  --rm \
  -it  \
  -v $(pwd):/project \
  -w /project \
  -p 8080:8080 \
  node \
  bash

# FROM INSIDE RUNNING CONTAINER

# install module
npm install .

# run development server
npm run startdocker

# edit src/index.js
# add const rc = new RingChart(data);
# add rc.render(document.body);
# replace `data` with whatever data you want to develop with

# view visualization in browser at http://localhost:8080
```
