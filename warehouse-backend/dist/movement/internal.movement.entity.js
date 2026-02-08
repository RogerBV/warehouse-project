"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalMovement = void 0;
const product_entity_1 = require("../product/product.entity");
const warehouse_entity_1 = require("../warehouse/warehouse.entity");
const typeorm_1 = require("typeorm");
let InternalMovement = class InternalMovement {
};
exports.InternalMovement = InternalMovement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InternalMovement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], InternalMovement.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InternalMovement.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.movements),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], InternalMovement.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => warehouse_entity_1.Warehouse, (warehouse) => warehouse.movementsOrigin),
    (0, typeorm_1.JoinColumn)({ name: 'warehouse_origin_id' }),
    __metadata("design:type", warehouse_entity_1.Warehouse)
], InternalMovement.prototype, "warehouseOrigin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => warehouse_entity_1.Warehouse, (warehouse) => warehouse.movementsDestination),
    (0, typeorm_1.JoinColumn)({ name: 'warehouse_destination_id' }),
    __metadata("design:type", warehouse_entity_1.Warehouse)
], InternalMovement.prototype, "warehouseDestination", void 0);
exports.InternalMovement = InternalMovement = __decorate([
    (0, typeorm_1.Entity)()
], InternalMovement);
//# sourceMappingURL=internal.movement.entity.js.map