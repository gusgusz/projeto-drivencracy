import { ObjectId } from "mongodb";
import { dbPolls, dbChoices } from "../database/db.js";
import { ChoiceSchema } from "../models/choice.models.js";
import dayjs from "dayjs";

export async function createChoice(req,res){
 const {title, pollId} = req.body;
    const validate = ChoiceSchema.validate(req.body);
    if(validate.error) return res.status(422).send(validate.error.details[0].message);
    try{
        const poll = await dbPolls.findOne({_id: ObjectId(pollId)});
        
        if(!poll) return res.status(404).send("Enquete não existe");
        if(dayjs(poll.expireAt).isBefore(dayjs())) return res.status(422).send("A enquete já expirou");
        const choices = await dbChoices.find({pollId: pollId}).toArray();
        console.log(choices);
        const isthischoice = choices?.filter(choice => choice.title === title);
        if(isthischoice.length > 0) return res.status(409).send("Essa opção já existe");

        const choice = {
            title,
            pollId
        }
        console.log(choice);
        await dbChoices.insertOne(choice);
        res.status(201).send("Opção criada");
        return;

}
catch (error){
    console.log(error);
    res.sendStatus(500);
    return;
}
};