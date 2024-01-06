import express from "express";
import * as eventController from "./eventController";
import * as eventValidations from "./eventValidations";

export const eventRouter = express.Router();

eventRouter.route("/")
    .get(eventController.getEvents)
    .post(eventValidations.eventValidations, eventController.createEvent)

eventRouter.route("/:id")
    .get(eventController.getEvent)
    .put(eventValidations.eventValidations, eventController.updateEvent)
    .delete(eventController.deleteEvent);
