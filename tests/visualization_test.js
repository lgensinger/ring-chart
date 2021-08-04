import test from "ava";

import { configuration, configurationDimension } from "../src/configuration.js";
import { RingChart } from "../src/index.js";

/******************** EMPTY VARIABLES ********************/

// initialize
let rc = new RingChart();

// TEST INIT //
test("init", t => {

    t.true(rc.height === configurationDimension.height);
    t.true(rc.width === configurationDimension.width);

});

// TEST get ARCS //
test("get_arcs", t => {

    t.true(typeof(rc.arcs) == "function");

});

// TEST get LABELARCS //
test("get_labelArcs", t => {

    t.true(typeof(rc.labelArcs) == "function");

});

// TEST RENDER //
test("render", t => {

    // clear document
    document.body.innerHTML = "";

    // render to dom
    rc.render(document.body);

    // get generated element
    let artboard = document.querySelector(`.${configuration.name}`);

    t.true(artboard !== undefined);
    t.true(artboard.nodeName == "svg");
    t.true(artboard.getAttribute("viewBox").split(" ")[3] == configurationDimension.height);
    t.true(artboard.getAttribute("viewBox").split(" ")[2] == configurationDimension.width);

});

/******************** DECLARED PARAMS ********************/

let testWidth = 300;
let testHeight = 500;
let testData = [{label: "xyz", value: 1}, {label: "abc", value: 4}];

// initialize
let rct = new RingChart(testData, testWidth, testHeight);

// TEST INIT //
test("init_params", t => {

    t.true(rct.height === testHeight);
    t.true(rct.width === testWidth);

});

// TEST get ARCS //
test("get_arcs_params", t => {

    t.true(typeof(rct.arcs) == "function");

});

// TEST get LABELARCS //
test("get_labelarcs_params", t => {

    t.true(typeof(rct.labelArcs) == "function");

});

// TEST RENDER //
test("render_params", t => {

    // clear document
    document.body.innerHTML = "";

    // render to dom
    rct.render(document.body);

    // get generated element
    let artboard = document.querySelector(`.${configuration.name}`);

    t.true(artboard !== undefined);
    t.true(artboard.nodeName == "svg");
    t.true(artboard.getAttribute("viewBox").split(" ")[3] == testHeight);
    t.true(artboard.getAttribute("viewBox").split(" ")[2] == testWidth);

});
