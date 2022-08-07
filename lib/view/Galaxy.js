"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cytoscape_1 = __importDefault(require("cytoscape"));
const skydapp_browser_1 = require("skydapp-browser");
const skydapp_common_1 = require("skydapp-common");
const Config_1 = __importDefault(require("../Config"));
cytoscape_1.default.use(require("cytoscape-cose-bilkent"));
class Galaxy extends skydapp_common_1.View {
    constructor(params) {
        super();
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".galaxy-view", this.galaxyContainer = (0, skydapp_browser_1.el)(".galaxy-container")));
        this.load();
    }
    async load() {
        const result = await fetch(`${Config_1.default.apiURI}/galaxy`);
        const data = await result.json();
        const bios = {};
        for (const bio of data.bios) {
            bios[bio.id] = bio;
        }
        const findName = (address) => {
            return bios[address]?.cachedName ?? address;
        };
        const findShortenName = (address) => {
            return bios[address]?.cachedName ?? skydapp_common_1.SkyUtil.shortenAddress(address);
        };
        const findPFP = (address) => {
            return bios[address]?.cachedPFP ?? "/images/default-profile.png";
        };
        const elements = [];
        for (const link of data.links) {
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
        const _rank_cy = (0, cytoscape_1.default)({ elements });
        var pageRank = _rank_cy.elements().pageRank({});
        var nodeMaxSize = 80;
        var nodeMinSize = 4;
        var fontMaxSize = 7;
        var fontMinSize = 4;
        var dimColor = '#f4f4f8';
        var textOutlineColor = 'white';
        var fontColor = 'black';
        var nodeBGColor = '#4f5b66';
        var edgeBGColor = '#c0c5ce';
        var edgeWidth = '0.3px';
        var arrowScale = 0.2;
        var arrowActiveScale = 0.5;
        var successorColor = 'rgb(246, 176, 172)';
        var successorWeakColor = '#ff8b94';
        var predecessorsColor = 'rgb(140, 232, 250)';
        var predecessorsWeakColor = '#4a91f2';
        var nodeActiveBGColor = '#fed766';
        var nodeActiveSize = 23;
        var nodeActiveFontSize = 7;
        var edgeActiveWidth = '1px';
        const cy = (0, cytoscape_1.default)({
            container: this.galaxyContainer.domElement,
            elements,
            minZoom: 0.2,
            wheelSensitivity: 0.1,
            style: [
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
                        "background-image": (ele) => {
                            return ele.data("image");
                        },
                        "background-fit": "cover",
                        "width": (ele) => {
                            return nodeMaxSize * pageRank.rank("#" + ele.id()) + nodeMinSize;
                        },
                        "height": (ele) => {
                            return nodeMaxSize * pageRank.rank("#" + ele.id()) + nodeMinSize;
                        },
                        "font-size": (ele) => {
                            return fontMaxSize * pageRank.rank("#" + ele.id()) + fontMinSize;
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
            },
        });
        function setResetFocus(target_cy) {
            target_cy.nodes().forEach(function (target) {
                target.style('background-color', nodeBGColor);
                var rank = pageRank.rank(target);
                target.style('width', nodeMaxSize * rank + nodeMinSize);
                target.style('height', nodeMaxSize * rank + nodeMinSize);
                target.style('font-size', fontMaxSize * rank + fontMinSize);
                target.style('color', fontColor);
            });
        }
        cy.on("tap", function (e) {
            if (e.cy === e.target) {
                setResetFocus(e.cy);
            }
            else {
                const name = e.target.data("name");
                if (name !== undefined) {
                    skydapp_browser_1.SkyRouter.go(`/${name}`);
                }
            }
        });
        function waitForWebfonts(fonts, callback) {
            var loadedFonts = 0;
            for (var i = 0, l = fonts.length; i < l; ++i) {
                (function (font) {
                    var node = document.createElement('span');
                    node.innerHTML = 'giItT1WQy@!-/#';
                    node.style.position = 'absolute';
                    node.style.left = '-10000px';
                    node.style.top = '-10000px';
                    node.style.fontSize = '300px';
                    node.style.fontFamily = 'sans-serif';
                    node.style.fontVariant = 'normal';
                    node.style.fontStyle = 'normal';
                    node.style.fontWeight = 'normal';
                    node.style.letterSpacing = '0';
                    document.body.appendChild(node);
                    var width = node.offsetWidth;
                    node.style.fontFamily = font + ', sans-serif';
                    var interval;
                    function checkFont() {
                        if (node && node.offsetWidth != width) {
                            ++loadedFonts;
                            node.parentNode?.removeChild(node);
                            node = null;
                        }
                        if (loadedFonts >= fonts.length) {
                            if (interval) {
                                clearInterval(interval);
                            }
                            if (loadedFonts == fonts.length) {
                                callback();
                                return true;
                            }
                        }
                    }
                    ;
                    if (!checkFont()) {
                        interval = setInterval(checkFont, 50);
                    }
                })(fonts[i]);
            }
        }
        ;
        waitForWebfonts(['OCRAStd'], function () {
            cy.forceRender();
        });
    }
    close() {
        this.container.delete();
        super.close();
    }
}
exports.default = Galaxy;
//# sourceMappingURL=Galaxy.js.map