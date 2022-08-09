import cytoscape, { ElementDefinition } from "cytoscape";
import { BodyNode, DomNode, el, SkyRouter } from "skydapp-browser";
import { SkyUtil, View, ViewParams } from "skydapp-common";
import Config from "../Config";
import Bio from "../datamodel/Bio";

cytoscape.use(require("cytoscape-cose-bilkent"));

export default class Galaxy extends View {

    private container: DomNode;
    private galaxyContainer: DomNode;

    constructor(params: ViewParams) {
        super();
        BodyNode.append(this.container = el(".galaxy-view",
            el("header",
                el("a.back", el("i.fa-light.fa-arrow-left"), { click: () => SkyRouter.go("/", undefined, true) }),
                el("h1", "Soul Galaxy"),
            ),
            this.galaxyContainer = el(".galaxy-container"),
        ));
        this.load();
    }

    private async load() {

        const result = await fetch(`${Config.apiURI}/galaxy`);
        const data: { souls: Bio[], soulinks: { id: string, address0: string, address1: string }[] } = await result.json();

        const bios: { [address: string]: Bio } = {};
        for (const bio of data.souls) {
            bios[bio.id!] = bio;
        }

        const findName = (address: string) => {
            return bios[address]?.cachedName ?? address;
        };

        const findShortenName = (address: string) => {
            return bios[address]?.cachedName ?? SkyUtil.shortenAddress(address);
        };

        const findPFP = (address: string) => {
            return bios[address]?.cachedPFP ?? "/images/default-profile.png";
        };

        const elements: ElementDefinition[] = [];
        for (const link of data.soulinks) {
            elements.push({ data: { id: link.address0, name: findName(link.address0), label: findShortenName(link.address0), image: findPFP(link.address0) } });
            elements.push({ data: { id: link.address1, name: findName(link.address1), label: findShortenName(link.address1), image: findPFP(link.address1) } });
            elements.push({
                data: {
                    id: link.id,
                    source: link.address0,
                    target: link.address1,
                },
            });
        }

        const _rank_cy = cytoscape({ elements });

        var pageRank = _rank_cy.elements().pageRank({});
        var nodeMaxSize = 24;
        var nodeMinSize = 6;
        var fontMaxSize = 7;
        var fontMinSize = 4;

        var dimColor = '#f4f4f8';
        var textOutlineColor = 'white';
        var fontColor = 'black';
        var nodeBGColor = '#4f5b66';
        var edgeBGColor = '#c0c5ce';
        var edgeWidth = '0.3px';
        var arrowScale = 0.2
        var arrowActiveScale = 0.5
        var successorColor = 'rgb(246, 176, 172)';
        var successorWeakColor = '#ff8b94';
        var predecessorsColor = 'rgb(140, 232, 250)';
        var predecessorsWeakColor = '#4a91f2';

        var nodeActiveBGColor = '#fed766';
        var nodeActiveSize = 23;
        var nodeActiveFontSize = 7;
        var edgeActiveWidth = '1px';

        const cy = cytoscape({
            container: this.galaxyContainer.domElement,
            elements,
            minZoom: 0.2,
            wheelSensitivity: 0.1,
            style: [ // the stylesheet for the graph
                {
                    selector: "node",
                    style: {
                        "font-family": "OCRAStd",
                        "label": "data(label)",
                        "text-valign": "top",
                        "color": fontColor,
                        "text-outline-width": 0,
                        "text-outline-color": textOutlineColor,
                        "background-color": nodeBGColor,
                        "background-image": (ele: any) => {
                            return ele.data("image");
                        },
                        "background-fit": "cover",
                        "width": (ele: any) => {
                            return nodeMaxSize * pageRank.rank("#" + ele.id() as any) + nodeMinSize;
                        },
                        "height": (ele: any) => {
                            return nodeMaxSize * pageRank.rank("#" + ele.id() as any) + nodeMinSize;
                        },
                        "font-size": (ele: any) => {
                            return fontMaxSize * pageRank.rank("#" + ele.id() as any) + fontMinSize;
                        }
                    },
                },
                {
                    selector: "edge",
                    style: {
                        "curve-style": "bezier",
                        "width": 0.5,
                        "line-color": "#fff",
                    },
                },
                {
                    selector: ".prepare",
                    style: {
                        opacity: 0.5,
                    },
                },
            ],
            layout: {
                name: "cose-bilkent",
                animate: false,
                gravityRangeCompound: 1.5,
                fit: true,
                tile: true,
            } as any,
        });

        function setResetFocus(target_cy: cytoscape.Core) {
            target_cy.nodes().forEach(function (target) {
                target.style('background-color', nodeBGColor);
                var rank = pageRank.rank(target);
                target.style('width', nodeMaxSize * rank + nodeMinSize);
                target.style('height', nodeMaxSize * rank + nodeMinSize);
                target.style('font-size', fontMaxSize * rank + fontMinSize);
                target.style('color', fontColor);
            });
            /*target_cy.edges().forEach(function (target) {
                target.style('line-color', edgeBGColor);
                target.style('target-arrow-color', edgeBGColor);
                target.style('width', edgeWidth);
                target.style('arrow-scale', arrowScale);
            });*/
        }

        cy.on("tap", function (e) {
            if (e.cy === e.target) {
                setResetFocus(e.cy);
            } else {
                const name = e.target.data("name");
                if (name !== undefined) {
                    SkyRouter.go(`/${name}`);
                }
            }
        });

        /*function setOpacityElement(target_element: any, degree: number){
            target_element.style('opacity', degree);
        }

        function setFocus(target_element, successorsColor, predecessorsColor, edgeWidth, arrowScale) {
            target_element.style('background-color', nodeActiveBGColor);
            target_element.style('color', fontColor);
            target_element.successors().each(
                function (e) {
                    if (e.isEdge()) {
                        e.style('width', edgeWidth);
                        e.style('arrow-scale', arrowScale);
                    }
                    e.style('color', fontColor);
                    e.style('background-color', successorColor);
                    e.style('line-color', successorColor);
                    e.style('target-arrow-color', successorColor);
                    setOpacityElement(e, 1);
                }
            );
            target_element.predecessors().each(function (e) {
                if (e.isEdge()) {
                    e.style('width', edgeWidth);
                    e.style('arrow-scale', arrowScale);
                }
                e.style('color', fontColor);
                e.style('background-color', predecessorsColor);
                e.style('line-color', predecessorsColor);
                e.style('target-arrow-color', predecessorsColor);
                setOpacityElement(e, 1);
            });
            target_element.style('width', Math.max(parseFloat(target_element.style('width')), nodeActiveSize));
            target_element.style('height', Math.max(parseFloat(target_element.style('height')), nodeActiveSize));
            target_element.style('font-size', Math.max(parseFloat(target_element.style('font-size')), nodeActiveFontSize));
        }

        function setStyle(target_cy, style) {
            target_cy.nodes().forEach(function (target) {
                target.style(style);
            });
            target_cy.edges().forEach(function (target) {
                target.style(style);
            });

        }


        

        cy.on("tapend mouseout", "node", function (e) {
            setResetFocus(e.cy);
        });

        cy.on("tapstart mouseover", "node", function (e) {
            setResetFocus(e.cy);
            setStyle(cy, {
                "background-color": dimColor,
                "line-color": dimColor,
                "target-arrow-color": dimColor,
                "color": dimColor
            });
            setFocus(e.target, successorColor, predecessorsColor, edgeActiveWidth, arrowActiveScale);
        });*/

        function waitForWebfonts(fonts: string[], callback: () => void) {
            var loadedFonts = 0;
            for (var i = 0, l = fonts.length; i < l; ++i) {
                (function (font) {
                    var node: HTMLSpanElement | null = document.createElement('span');
                    // Characters that vary significantly among different fonts
                    node.innerHTML = 'giItT1WQy@!-/#';
                    // Visible - so we can measure it - but not on the screen
                    node.style.position = 'absolute';
                    node.style.left = '-10000px';
                    node.style.top = '-10000px';
                    // Large font size makes even subtle changes obvious
                    node.style.fontSize = '300px';
                    // Reset any font properties
                    node.style.fontFamily = 'sans-serif';
                    node.style.fontVariant = 'normal';
                    node.style.fontStyle = 'normal';
                    node.style.fontWeight = 'normal';
                    node.style.letterSpacing = '0';
                    document.body.appendChild(node);

                    // Remember width with no applied web font
                    var width = node.offsetWidth;

                    node.style.fontFamily = font + ', sans-serif';

                    var interval: any;
                    function checkFont() {
                        // Compare current width with original width
                        if (node && node.offsetWidth != width) {
                            ++loadedFonts;
                            node.parentNode?.removeChild(node);
                            node = null;
                        }

                        // If all fonts have been loaded
                        if (loadedFonts >= fonts.length) {
                            if (interval) {
                                clearInterval(interval);
                            }
                            if (loadedFonts == fonts.length) {
                                callback();
                                return true;
                            }
                        }
                    };

                    if (!checkFont()) {
                        interval = setInterval(checkFont, 50);
                    }
                })(fonts[i]);
            }
        };

        waitForWebfonts(['OCRAStd'], function () {
            cy.forceRender();
        })
    }

    public close(): void {
        this.container.delete();
        super.close();
    }
}
