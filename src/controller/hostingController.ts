import { HostingService } from "../service";
import { mockHostings } from "../constants";
import IHosting from "../interfaces/IHosting";
import { configuration } from '../config';

class HostingController {
    constructor() {
        this.hostingService = new HostingService()
    }

    public static getInstance() {
        if (!HostingController.instance) {
            HostingController.instance = new HostingController();
        }
        return HostingController.instance;
    }
    private static instance: HostingController;
    private hostingService: HostingService;

    getInefficientHostings = async (req, res, next) => {
        try {
            const { thersholdValue } = configuration;
            const { limit, skip } = req.query;
            const hostingAggregationResult = await this.hostingService.aggregate([{
                $group: {
                    _id: "$hostname", activeCount: {
                        $sum: {
                            $cond: [{ $eq: ['$active', true] }, 1, 0],
                        },
                    },
                }
            },
            {
                $match: { activeCount: { $lte: thersholdValue } }
            },
            { $skip: skip }, { $limit: limit },
            ]);
            const data = hostingAggregationResult.map(({ _id }) => _id);
            res.send({ message: 'Success', data, status: 200 });
        } catch (err) {
            next(err);
        }

    }

    addMockHostings = async (req, res, next) => {
        try {
            await this.hostingService.createAll(mockHostings as IHosting[]);
            return res.status(201).send({ message: 'Added Mock hostings data', status: 201 });
        } catch (err) {
            next(err);
        }
    }
}

export { HostingController };
export default HostingController.getInstance();