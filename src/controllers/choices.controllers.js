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
        if(isthischoice.length > 0) return res.status(409).send("Esse nome já existe");

        const choice = {
            title,
            pollId,
            votes: 0
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

export async function getChoices(req,res){
    const {id} = req.params;
    console.log(id);

    try{
        const choices =  await dbChoices.find({pollId: id}).toArray();
        if(!await dbPolls.findOne({_id: ObjectId(id)})){
            // se o token não esta em um formato valido cai no catch... fazer uma validação no começo
            // de ate 12 bits , hexadecimal
            res.status(404).send("Enquete não existe");
            return;
        }
       const result = choices.map(choice => {
              return {
                _id: choice._id,
                title: choice.title,
                pollId: choice.pollId,
                
              }
       });
        res.send(result);
    }
    catch (error){
        console.log(error);
        res.sendStatus(500);
        return;
    }
};

export async function voteChoice(req,res){
    const {id} = req.params;
   
        
   
    
    
    try{
        const choice = await dbChoices.findOne({_id: ObjectId(id)});
        if(!choice) return res.status(404).send("Essa opção não existe");
        const poll = await dbPolls.findOne({_id: ObjectId(choice.pollId)});
        if(!poll) return res.status(404).send("Enquete não existe");
        if(dayjs(poll.expireAt).isBefore(dayjs())) return res.status(422).send("A enquete já expirou");
        await dbChoices.updateOne({_id: ObjectId(id)}, {$inc: {votes: 1}});
        res.sendStatus(200);
    }
    catch (error){ 
        console.log(error);
        res.sendStatus(500);
        return;
    }
}