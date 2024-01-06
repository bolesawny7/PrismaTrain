import { db } from "../utils/db.server";

type Event = {
    start_date: Date,
    end_date: Date,
    price: number,
    name: string,
    max_persons: number,
    year: number
}

export const listEvents = async (): Promise<Event[]> => {
    return await db.event.findMany({
        select: {
            start_date: true,
            end_date: true,
            price: true,
            name: true,
            max_persons: true,
            year: true
        }
    });
}

export const getEvent = async (event_id: number): Promise<Event | null> => {
    return await db.event.findUnique({
        where: {
            event_id
        },
        select: {
            start_date: true,
            end_date: true,
            price: true,
            name: true,
            max_persons: true,
            year: true
        }
    });
}


export const createEvent = async (event: Event): Promise<Event> => {
    return await db.event.create({
        data: {
            start_date: event.start_date,
            end_date: event.end_date,
            price: event.price,
            name: event.name,
            max_persons: event.max_persons,
            year: event.year
        }
    });
}

export const updateEvent = async (event_id: number, event: Event): Promise<Event | null> => {
    return await db.event.update({
        where: {
            event_id
        },
        data: {
            start_date: event.start_date,
            end_date: event.end_date,
            price: event.price,
            name: event.name,
            max_persons: event.max_persons,
            year: event.year
        },
        select: {
            start_date: true,
            end_date: true,
            price: true,
            name: true,
            max_persons: true,
            year: true
        }
    });
}

export const deleteEvent = async (event_id: number): Promise<Event | null> => {
    return await db.event.delete({
        where: {
            event_id
        },
        select: {
            start_date: true,
            end_date: true,
            price: true,
            name: true,
            max_persons: true,
            year: true
        }
    });
}