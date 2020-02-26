"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("./base-controller");
const typeorm_1 = require("typeorm");
class CRUDController extends base_controller_1.BaseController {
    //ICRUD Listeners not yet implemented
    //SQL not yet implemented
    findAll() {
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, viewEntity, order } = this.controllerData.option.entity;
            const data = yield typeorm_1.getRepository(viewEntity ? viewEntity : name).find({ order });
            res.send({
                data
            });
        }));
    }
    find() {
        this.router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, viewEntity } = this.controllerData.option.entity;
            const data = yield typeorm_1.getRepository(viewEntity ? viewEntity : name).findOne({ id });
            res.send({
                data
            });
        }));
    }
    delete() {
        this.router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = this.controllerData.option.entity;
            const data = yield typeorm_1.getRepository(name).findOne({ id });
            data['id_user'] = req.user;
            yield typeorm_1.getRepository(name).remove(data);
            res.send();
        }));
    }
    update() {
        this.router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = this.controllerData.option.entity;
            const data = yield typeorm_1.getRepository(name).findOne({ id });
            data['id_user'] = req.user;
            yield typeorm_1.getRepository(name).merge(data, req.body);
            yield typeorm_1.getRepository(name).save(data);
            res.send();
        }));
    }
    insert() {
        this.router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = this.controllerData.option.entity;
            const data = yield typeorm_1.getRepository(name).create(req.body);
            data['id_user'] = req.user;
            yield typeorm_1.getRepository(name).save(data);
            res.send();
        }));
    }
    build() {
        const router = super.build();
        this.findAll();
        this.insert();
        this.find();
        this.delete();
        this.update();
        return router;
    }
}
exports.CRUDController = CRUDController;
