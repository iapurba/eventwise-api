import Event from '../models/Event.js';
import constants from '../utils/constants.js';
import { proccessEventDocument } from '../utils/processors/eventDocProcessor.js';

export const getEvents = async (req, res) => {
    console.log('get events by query')
    const {
        category,
        location,
        eventType,
        startDate,
        endDate
    } = req.query;

    try {
        const eventQuery = {};

        if (category) eventQuery.category = category;
        if (location) {
            eventQuery['location.address.city'] = { $regex: new RegExp(location, 'i') } ;
        }
        if (eventType) eventQuery.eventType = eventType;

        if (startDate && endDate) {
            eventQuery.date = { $gte: startDate, $lte: endDate };
        } else if (startDate) {
            eventQuery.date = { $gte: startDate };
        } else if (endDate) {
            eventQuery.data = { $lte: endDate };
        }
        const events = await Event.find(eventQuery);
        const formattedEvents = events.map((event) => {
            return proccessEventDocument(event);
        });
        res.status(200).json(formattedEvents);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: constants.STATUS_INTERNAL_SERVER_ERROR });
    }
};

export const getEventById = async (req, res) => {
    console.log(req.params.eventId);
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);
        const formattedEvent = proccessEventDocument(event);

        res.status(200).json(formattedEvent);

    } catch (error) {
        res.status(404).json({ error: constants.EVENT_NOT_FOUND });
    }
};