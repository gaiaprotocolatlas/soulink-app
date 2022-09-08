"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC721Mock__factory = exports.ERC1155Mock__factory = exports.SoulBoundToken__factory = exports.SoulinkSignatureChecker__factory = exports.SoulinkMinter__factory = exports.Soulink__factory = exports.ISoulinkMinter__factory = exports.ISoulink__factory = exports.ISoulBoundToken__factory = exports.IDiscountDB__factory = exports.DiscountDBV1__factory = exports.IERC165__factory = exports.ERC165__factory = exports.IERC721Receiver__factory = exports.IERC721__factory = exports.IERC721Metadata__factory = exports.ERC721__factory = exports.IERC1155Receiver__factory = exports.IERC1155__factory = exports.IERC1155MetadataURI__factory = exports.ERC1155__factory = exports.IERC1271__factory = exports.Ownable__factory = exports.factories = void 0;
exports.factories = __importStar(require("./factories"));
var Ownable__factory_1 = require("./factories/@openzeppelin/contracts/access/Ownable__factory");
Object.defineProperty(exports, "Ownable__factory", { enumerable: true, get: function () { return Ownable__factory_1.Ownable__factory; } });
var IERC1271__factory_1 = require("./factories/@openzeppelin/contracts/interfaces/IERC1271__factory");
Object.defineProperty(exports, "IERC1271__factory", { enumerable: true, get: function () { return IERC1271__factory_1.IERC1271__factory; } });
var ERC1155__factory_1 = require("./factories/@openzeppelin/contracts/token/ERC1155/ERC1155__factory");
Object.defineProperty(exports, "ERC1155__factory", { enumerable: true, get: function () { return ERC1155__factory_1.ERC1155__factory; } });
var IERC1155MetadataURI__factory_1 = require("./factories/@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI__factory");
Object.defineProperty(exports, "IERC1155MetadataURI__factory", { enumerable: true, get: function () { return IERC1155MetadataURI__factory_1.IERC1155MetadataURI__factory; } });
var IERC1155__factory_1 = require("./factories/@openzeppelin/contracts/token/ERC1155/IERC1155__factory");
Object.defineProperty(exports, "IERC1155__factory", { enumerable: true, get: function () { return IERC1155__factory_1.IERC1155__factory; } });
var IERC1155Receiver__factory_1 = require("./factories/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver__factory");
Object.defineProperty(exports, "IERC1155Receiver__factory", { enumerable: true, get: function () { return IERC1155Receiver__factory_1.IERC1155Receiver__factory; } });
var ERC721__factory_1 = require("./factories/@openzeppelin/contracts/token/ERC721/ERC721__factory");
Object.defineProperty(exports, "ERC721__factory", { enumerable: true, get: function () { return ERC721__factory_1.ERC721__factory; } });
var IERC721Metadata__factory_1 = require("./factories/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata__factory");
Object.defineProperty(exports, "IERC721Metadata__factory", { enumerable: true, get: function () { return IERC721Metadata__factory_1.IERC721Metadata__factory; } });
var IERC721__factory_1 = require("./factories/@openzeppelin/contracts/token/ERC721/IERC721__factory");
Object.defineProperty(exports, "IERC721__factory", { enumerable: true, get: function () { return IERC721__factory_1.IERC721__factory; } });
var IERC721Receiver__factory_1 = require("./factories/@openzeppelin/contracts/token/ERC721/IERC721Receiver__factory");
Object.defineProperty(exports, "IERC721Receiver__factory", { enumerable: true, get: function () { return IERC721Receiver__factory_1.IERC721Receiver__factory; } });
var ERC165__factory_1 = require("./factories/@openzeppelin/contracts/utils/introspection/ERC165__factory");
Object.defineProperty(exports, "ERC165__factory", { enumerable: true, get: function () { return ERC165__factory_1.ERC165__factory; } });
var IERC165__factory_1 = require("./factories/@openzeppelin/contracts/utils/introspection/IERC165__factory");
Object.defineProperty(exports, "IERC165__factory", { enumerable: true, get: function () { return IERC165__factory_1.IERC165__factory; } });
var DiscountDBV1__factory_1 = require("./factories/contracts/DiscountDB.sol/DiscountDBV1__factory");
Object.defineProperty(exports, "DiscountDBV1__factory", { enumerable: true, get: function () { return DiscountDBV1__factory_1.DiscountDBV1__factory; } });
var IDiscountDB__factory_1 = require("./factories/contracts/interfaces/IDiscountDB__factory");
Object.defineProperty(exports, "IDiscountDB__factory", { enumerable: true, get: function () { return IDiscountDB__factory_1.IDiscountDB__factory; } });
var ISoulBoundToken__factory_1 = require("./factories/contracts/interfaces/ISoulBoundToken__factory");
Object.defineProperty(exports, "ISoulBoundToken__factory", { enumerable: true, get: function () { return ISoulBoundToken__factory_1.ISoulBoundToken__factory; } });
var ISoulink__factory_1 = require("./factories/contracts/interfaces/ISoulink__factory");
Object.defineProperty(exports, "ISoulink__factory", { enumerable: true, get: function () { return ISoulink__factory_1.ISoulink__factory; } });
var ISoulinkMinter__factory_1 = require("./factories/contracts/interfaces/ISoulinkMinter__factory");
Object.defineProperty(exports, "ISoulinkMinter__factory", { enumerable: true, get: function () { return ISoulinkMinter__factory_1.ISoulinkMinter__factory; } });
var Soulink__factory_1 = require("./factories/contracts/Soulink__factory");
Object.defineProperty(exports, "Soulink__factory", { enumerable: true, get: function () { return Soulink__factory_1.Soulink__factory; } });
var SoulinkMinter__factory_1 = require("./factories/contracts/SoulinkMinter__factory");
Object.defineProperty(exports, "SoulinkMinter__factory", { enumerable: true, get: function () { return SoulinkMinter__factory_1.SoulinkMinter__factory; } });
var SoulinkSignatureChecker__factory_1 = require("./factories/contracts/SoulinkSignatureChecker__factory");
Object.defineProperty(exports, "SoulinkSignatureChecker__factory", { enumerable: true, get: function () { return SoulinkSignatureChecker__factory_1.SoulinkSignatureChecker__factory; } });
var SoulBoundToken__factory_1 = require("./factories/contracts/standards/SoulBoundToken__factory");
Object.defineProperty(exports, "SoulBoundToken__factory", { enumerable: true, get: function () { return SoulBoundToken__factory_1.SoulBoundToken__factory; } });
var ERC1155Mock__factory_1 = require("./factories/contracts/test/ERC1155Mock__factory");
Object.defineProperty(exports, "ERC1155Mock__factory", { enumerable: true, get: function () { return ERC1155Mock__factory_1.ERC1155Mock__factory; } });
var ERC721Mock__factory_1 = require("./factories/contracts/test/ERC721Mock__factory");
Object.defineProperty(exports, "ERC721Mock__factory", { enumerable: true, get: function () { return ERC721Mock__factory_1.ERC721Mock__factory; } });
//# sourceMappingURL=index.js.map