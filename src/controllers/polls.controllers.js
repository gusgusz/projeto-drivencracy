import {dbPolls, dbChoices} from "../database/db.js";
import { PollSchema } from "../models/poll.models.js";
import { getMostVoted } from "../middlewares/polls.middlewares.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";



export async function sendPolls( req, res ) {

    try{
        const polls = await dbPolls.find({}).toArray();
        res.send(polls);
    }
    catch (error){
        res.status(500).send(error);
    }
}

export async function CreatePoll( req, res ) {
    let { title, expireAt } = req.body;
    if( expireAt === "") {
        expireAt = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");
     }
    const validate = PollSchema.validate( req.body );
    if( validate.error ) return res.status( 422 ).send( validate.error.details[ 0 ].message );
    
   
   if( dayjs( expireAt ).isBefore( dayjs() ) ) return res.status( 422 ).send( "A data de expiração deve ser maior que a data atual" );
   

    const poll = {
        title,
        expireAt
    };
    try{
        await dbPolls.insertOne( poll );
        res.status( 201 ).send( "Enquete criada com sucesso!" );
        return;
    }catch ( error ) {
        res.status( 500 ).send( error.message );
        return;
    }
};
   

export async function sendResult( req, res ) {
    const { id } = req.params;
    try{
        const poll = await dbPolls.findOne( { _id: ObjectId(id) } );
        if(! poll) return res.status( 404 ).send( "Enquete não existe" );
        const choices = await dbChoices.find( { pollId: id  } ).toArray();
        let result = {};
    let mostVoted = 0;
    for(let i = 0; i < choices.length; i++){
        if(choices[i].votes > mostVoted){
            mostVoted = choices[i].votes;
            result = {
                title: choices[i].title,
                votes: choices[i].votes
            };
            
        }}
        const arr = {...poll, result};
       
        res.send( arr );
       
        
        
    }catch ( error ) {
        res.status( 500 ).send( error.message );
    }
}