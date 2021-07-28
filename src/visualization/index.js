import { scaleOrdinal } from "d3-scale";
import { schemeDark2 } from "d3-scale-chromatic";
import { select } from "d3-selection";
import { arc, pie } from "d3-shape";

import { configurationDimension } from "../configuration.js";

/**
 * RingChart is a part-of-a-whole visualization.
 * @param {array} data - objects where each represents a path in the hierarchy
 * @param {integer} height - artboard height
 * @param {integer} width - artboard width
 */
class RingChart {
    constructor(data, width=configurationDimension.width, height=configurationDimension.height) {

        // update self
        this.dataSource = data;
        this.height = height;
        this.radius = Math.min(width, height) / 2;
        this.width = width;

    }

    /**
     * Construct arc for slices.
     * @returns A d3 arc function.
     */
    get arc() {
        return arc()
            .outerRadius(this.radius)
            .innerRadius(this.radius * 0.75);
    }

    /**
     * Construct arc for labels.
     * @returns A d3 arc function.
     */
    get arcLabel() {
        return arc()
            .outerRadius(this.radius * 0.75)
            .innerRadius(this.radius * 0.5);
    }

    /**
     * Construct style.
     * @returns A d3 color function.
     */
    get color() {
        return scaleOrdinal(schemeDark2);
    }

    /**
     * Construct layout.
     * @returns A d3 pie layout function.
     */
    get layout() {
        return pie()
            .value(d => d.value);
    }

    /**
     * Render visualization.
     * @param {node} domNode - HTML node
     */
    render(domNode) {

        // generate svg artboard
        let artboard = select(domNode)
            .append("svg")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .attr("class", "lgv-ring-chart")
            .append("g")
            .attr("transform", `translate(${this.width/2},${this.height/2})`);

        // add inner content wrap
        let g = artboard.selectAll(".lgv-ring-chart-arc")
            .data(this.dataSource ? this.layout(this.dataSource) : [])
            .enter()
            .append("g")
            .attr("class", "lgv-ring-chart-arc");

        // have to reassign color function or the this conflicts inside the accessor
        let color = this.color;

        // add arc slice
        g.append("path")
            .attr("d", this.arc)
            .attr("fill", (d,i) => color(i));

        // add arc label
        g.append("text")
            .attr("transform", d => `translate(${this.arcLabel.centroid(d)})`)
            .text(d => `${d.data.label}, ${Math.round(d.data.value)}%`);

    }

};

export { RingChart };
export default RingChart;
