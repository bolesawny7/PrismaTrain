import e, { Request, Response } from 'express';
import * as eventService from './eventService';
import { validationResult } from 'express-validator';

export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await eventService.listEvents();
        res.status(200).send({data: events});
    } catch (e) {
        res.status(500).send((e as Error).message);
    }
}

export const getEvent = async (req: Request, res: Response) => {
    try {
        const event_id = parseInt(req.params.id);
        const event = await eventService.getEvent(event_id);
        if (event) {
            res.status(200).send({data: event});
        } else {
            res.status(404).send("Event not found");
        }
    } catch (e) {
        res.status(500).send((e as Error).message);
    }
}

export const createEvent = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const event = req.body;
        event.start_date = new Date(event.start_date);
        event.end_date = new Date(event.end_date);
        const newEvent = await eventService.createEvent(event);
        res.status(201).json({ msg: "Event Created", data: newEvent });
    } catch (e) {
        res.status(500).send((e as Error).message);
    }
}

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const event_id = parseInt(req.params.id, 10);
        const event = req.body;
        event.start_date = new Date(event.start_date);
        event.end_date = new Date(event.end_date);
        const updatedEvent = await eventService.updateEvent(event_id, event);
        if (updatedEvent) {
            res.status(200).json({ msg: "Event Updated", data: updatedEvent });
        } else {
            res.status(404).send("Event not found");
        }
    } catch (e) {
        res.status(500).send((e as Error).message);
    }
}

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const event_id = parseInt(req.params.id);
        const deletedEvent = await eventService.deleteEvent(event_id);
        res.json({ msg: "Event deleted", data: deletedEvent }).status(204);
    } catch (e) {
        res.status(500).send((e as Error).message);
    }
}