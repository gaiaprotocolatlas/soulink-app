import cytoscape from "cytoscape";
import { BodyNode, el, SkyRouter } from "skydapp-browser";
import { SkyUtil, View } from "skydapp-common";
import Config from "../Config";
import NetworkProvider from "../network/NetworkProvider";
cytoscape.use(require("cytoscape-fcose"));
export default class Galaxy extends View {
    container;
    galaxyContainer;
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".galaxy-view", el("header", el("a.back", el("i.fa-light.fa-arrow-left"), { click: () => history.back() }), el("h1", "Soul Galaxy")), this.galaxyContainer = el(".galaxy-container")));
        this.load(params.addressOrEns);
    }
    async load(addressOrEns) {
        const result = await fetch(`${Config.apiURI}/galaxy`);
        const data = await result.json();
        const bios = {};
        for (const bio of data.souls) {
            bios[bio.id] = bio;
        }
        const findName = (address) => {
            return bios[address]?.cachedName ?? address;
        };
        const findShortenName = (address) => {
            return bios[address]?.cachedName ?? SkyUtil.shortenAddress(address);
        };
        const findPFP = (address) => {
            return bios[address]?.cachedPFP ?? "/images/default-profile.png";
        };
        const elements = [];
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
        var nodeMaxSize = 60;
        var nodeMinSize = 14;
        var fontMaxSize = 7;
        var fontMinSize = 3;
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
        const cy = cytoscape({
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
                        "width": 0.2,
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
                name: "fcose",
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
                    SkyRouter.go(`/${name}`);
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
        cy.zoom(3);
        if (addressOrEns !== undefined) {
            let address;
            if (addressOrEns.indexOf("0x") === 0) {
                address = addressOrEns;
            }
            else {
                const result = await fetch(`${Config.apiURI}/cached-address/${addressOrEns}`);
                const cachedAddress = await result.text();
                if (cachedAddress !== "") {
                    address = cachedAddress;
                }
                else {
                    const _address = await NetworkProvider.resolveName(addressOrEns);
                    if (_address !== null) {
                        address = _address;
                    }
                }
            }
            if (address !== undefined) {
                cy.center(cy.$(`#${address}`));
            }
        }
    }
    changeParams(params, uri) {
        this.load(params.addressOrEns);
    }
    close() {
        this.container.delete();
        super.close();
    }
}
//# sourceMappingURL=Galaxy.js.map