import { db } from "../src/utils/db.server";

type Event = {
    start_date: Date;
    end_date: Date;
    price: number;
    name: string;
    max_persons: number;
    year: number
}

type tbl_person_fixed_data = {
    person_code: number;
    person_first_name: string;
}

seed();

function getUsers(): tbl_person_fixed_data[] {
    return [
        {
            person_code: 1,
            person_first_name: "John"
        },
        {
            person_code: 2,
            person_first_name: "doe"
        }
    ]
}

function getEvents(): Event[] {
    return [
        {
            start_date: new Date(),
            end_date: new Date(),
            price: 100,
            name: "event1",
            max_persons: 10,
            year: 2020
        },
        {
            start_date: new Date(),
            end_date: new Date(),
            price: 200,
            name: "event2",
            max_persons: 20,
            year: 2020
        }
    ]
}

async function seed() {
    //database operations running concurrently with Promise.all
    await Promise.all(getUsers().map(async (User) => {
        // Check if a record with the same person_code already exists
        const existingRecord = await db.tbl_person_fixed_data.findUnique({
            where: { person_code: User.person_code },
        });
        // If no existing record was found, create a new one
        if (!existingRecord) {
            await db.tbl_person_fixed_data.create({
                data: {
                    person_code: User.person_code,
                    person_first_name: User.person_first_name
                }
            });
        }
    }));
    const User = db.tbl_person_fixed_data.findFirst({
        where: {
            person_code: 1
        }
    });
    await Promise.all(getEvents().map(async (event) => {
        await db.event.create({
            data: {
                start_date: event.start_date,
                end_date: event.end_date,
                price: event.price,
                name: event.name,
                max_persons: event.max_persons,
                year: event.year
            }
        })
    }))
    const event = db.event.findFirst({
        where: {
            name: "Rehla"
        }
    });
}

