import { BaseController } from './base-controller'
import { IRouterPath } from '../interfaces/IRoutePath'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export class CRUDController extends BaseController {

    //ICRUD Listeners not yet implemented
    //SQL not yet implemented

    private findAll() {
        this.router.get('/', async(req: Request, res: Response) => {
            const { name, viewEntity, order } = this.controllerData.option.entity
            

            let data = await getRepository(viewEntity ? viewEntity : name).find({ order })

            if(this.controllerData.option.listener) {
                const { afterFetchAll } = this.controllerData.option.listener
                if(afterFetchAll) data = afterFetchAll(data)
            }

            res.send({
                data
            })
        })
    }

    private find() {
        this.router.get('/:id', async(req: Request, res: Response) => {
            const { id } = req.params
            const { name, viewEntity } = this.controllerData.option.entity

            let data = await getRepository(viewEntity ? viewEntity : name).findOne({ id })

            if(this.controllerData.option.listener) {
                const { afterFetchOne } = this.controllerData.option.listener
                if(afterFetchOne) data = afterFetchOne(data)
            }

            res.send({
                data
            })
        })
    }

    private delete() {
        this.router.delete('/:id', async(req: Request, res: Response) => {
            const { id } = req.params
            const { name } = this.controllerData.option.entity
            const data = await getRepository(name).findOne({ id })
            data['id_user'] = req.user
            await getRepository(name).remove(data)            
            res.send()
        })
    }

    private update() {
        this.router.put('/:id', async(req: Request, res: Response) => {
            const { id } = req.params
            const { name } = this.controllerData.option.entity
            const data = await getRepository(name).findOne({ id })
            data['id_user'] = req.user
            await getRepository(name).merge(data, req.body)
            await getRepository(name).save(data)            
            res.send()
        })
    }

    private insert() {
        this.router.post('/', async (req, res) => {
            const { name } = this.controllerData.option.entity
            const data = await getRepository(name).create(req.body)
            data['id_user'] = req.user
            await getRepository(name).save(data)
            res.send()
        })
    }

    public build() : IRouterPath {

        const router = super.build()

        this.findAll()
        this.insert()
        this.find()
        this.delete()
        this.update()

        return router

    }

}