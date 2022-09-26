"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const dot_1 = require("dot");
const fs = __importStar(require("fs-extra"));
class TemplateEvaluator {
    constructor(definitions) {
        this.definitions = definitions;
    }
    async compileFileAsync(path) {
        const fileContent = await fs.readFile(path, 'utf-8');
        const templateFn = dot_1.template(fileContent, {
            strip: false,
        });
        await fs.writeFile(path, templateFn(this.definitions));
    }
}
exports.default = TemplateEvaluator;
//# sourceMappingURL=TemplateParser.js.map