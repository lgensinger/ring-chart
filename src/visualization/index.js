import { scaleOrdinal } from "d3-scale";
import { select } from "d3-selection";
import { arc, pie } from "d3-shape";

import { configuration, configurationDimension } from "../configuration.js";

/**
 * RingChart is a part-of-a-whole visualization.
 * @param {array} data - objects where each represents a path in the hierarchy
 * @param {integer} height - artboard height
 * @param {integer} width - artboard width
 */
class RingChart {
    constructor(data, width=configurationDimension.width, height=configurationDimension.height) {

        // update self
        this.arc = null;
        this.dataSource = data;
        this.height = height;
        this.label = null;
        this.name = configuration.name;
        this.radius = Math.min(width, height) / 2;
        this.width = width;

    }

    /**
     * Construct arc for slices.
     * @returns A d3 arc function.
     */
    get arcs() {
        return arc()
            .outerRadius(this.radius)
            .innerRadius(this.radius * 0.75);
    }

    /**
     * Construct arc for labels.
     * @returns A d3 arc function.
     */
    get labelArcs() {
        return arc()
            .outerRadius(this.radius * 0.75)
            .innerRadius(this.radius * 0.65);
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
     * Position and minimally style arcs in SVG dom element.
     */
    configureArcs() {
        this.arc
            .attr("class", "lgv-arc")
            .attr("data-arc-value", d => d.value)
            .attr("d", d => this.arcs(d));
    }

    /**
     * Position and minimally style labels in SVG dom element.
     */
    configureLabels() {
        this.label
            .attr("class", "lgv-label")
            .attr("data-arc-value", d => d.value)
            .attr("x", d => this.labelArcs.centroid(d)[0])
            .attr("y", d => this.labelArcs.centroid(d)[1])
            .attr("dy", "0.35em")
            .attr("text-anchor", d => d.endAngle > Math.PI && d.startAngle > Math.PI ? "start" : (d.startAngle < Math.PI && d.endAngle > Math.PI ? "middle" : "end"))
            .text(d => `${d.data.label}, ${Math.round(d.data.value)}%`);
    }

    /**
     * Construct arc paths in HTML DOM.
     * @param {node} domNode - HTML node
     * @returns A d3.js selection.
     */
    generateArcs(domNode) {
        return domNode.selectAll(".lgv-arc")
            .data(this.dataSource ? this.layout(this.dataSource) : [])
            .enter()
            .append("path");
    }

    /**
     * Generate SVG artboard in the HTML DOM.
     * @param {node} domNode - HTML node
     * @returns A d3.js selection.
     */
    generateArtboard(domNode) {
        return select(domNode)
            .append("svg")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .attr("class", this.name);
    }

    /**
     * Generate labels in SVG element.
     * @param {node} domNode - d3.js SVG selection
     */
    generateLabels(domNode) {
        return domNode
            .selectAll(".lgv-label")
            .data(this.dataSource ? this.layout(this.dataSource) : [])
            .enter()
            .append("text");
    }

    /**
     * Render visualization.
     * @param {node} domNode - HTML node
     */
    render(domNode) {

        // generate svg artboard
        this.artboard = this.generateArtboard(domNode);

        // chart content group
        const g = this.artboard
            .append("g")
            .attr("transform", `translate(${this.width/2},${this.height/2})`);

        // generate arc slices
        this.arc = this.generateArcs(g);

        // position/style arcs
        this.configureArcs();

        // generate arc labels
        this.label = this.generateLabels(g);

        // position/style labels
        this.configureLabels();

    }

};

export { RingChart };
export default RingChart;
