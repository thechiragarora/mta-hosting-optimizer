import BaseService from "./BaseService";
import HostingModel from '../models/hosting';
import IHosting from "../interfaces/IHosting";

export default class HostingService extends BaseService<IHosting> {

    constructor(){
        super(HostingModel);
    }
}