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
        this.artboard = null;
        this.dataSource = data;
        this.height = height;
        this.label = null;
        this.name = configuration.name;
        this.radius = Math.min(width, height) / 2;
        this.width = width;

        // using font size as the base unit of measure make responsiveness easier to manage across devices
        this.artboardUnit = typeof window === "undefined" ? 16 : parseFloat(getComputedStyle(document.body).fontSize);

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
            .outerRadius(this.radius * 0.7)
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
            .attr("d", d => this.arcs(d))
            .on("mouseover", (e,d) => {

                // update class
                select(e.target).attr("class", "lgv-arc active");

                // send event to parent
                this.artboard.dispatch("ringmouseover", {
                    bubbles: true,
                    detail: {
                        label: d.data.label,
                        value: d.value,
                        xy: [e.clientX + (this.artboardUnit / 2), e.clientY + (this.artboardUnit / 2)]
                    }
                });

            })
            .on("mouseout", (e,d) => {

                // update class
                select(e.target).attr("class", "lgv-arc");

                // send event to parent
                this.artboard.dispatch("ringmouseout", {
                    bubbles: true
                });

            });
    }

    /**
     * Position and minimally style labels in SVG dom element.
     */
    configureLabels() {
        this.label
            .attr("class", "lgv-label")
            .attr("data-arc-value", d => d.value)
            .attr("data-small-arc", d => (d.endAngle - d.startAngle) < 0.3 ? "true" : "false")
            .attr("transform", d => `translate(${this.labelArcs.centroid(d)[0]}, ${this.labelArcs.centroid(d)[1] + 4})`)
            .attr("text-anchor", d => {

                let isOnLeftDial = d.endAngle > Math.PI && d.startAngle > Math.PI;
                let isCentered = d.startAngle < Math.PI && d.endAngle > Math.PI && d.startAngle > (Math.PI / 2);

                return isOnLeftDial ? "start" : (isCentered ? "middle" : "end");

            })
            .each((d, i, nodes) => {
                select(nodes[i])
                    .selectAll("tspan")
                    .data([d.data.label.length > 11 ? `${d.data.label.slice(0,11)}...` : d.data.label, `${Math.round(d.data.value)}%`])
                    .enter()
                    .append("tspan")
                    .text(x => x)
                    .attr("x", 0)
                    .attr("dy", (x, j) => j == 0 ? "-0.4em" : "1em")
            });
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
