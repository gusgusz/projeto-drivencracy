import {dbPolls} from "../database/db.js";
import { PollSchema } from "../models/poll.models.js";
import dayjs from "dayjs";



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
    const { title, expireAt } = req.body;
    const validate = PollSchema.validate( req.body );
    if( validate.error ) return res.status( 422 ).send( validate.error.details[ 0 ].message );
    
    if( dayjs( expireAt ).isBefore( dayjs() ) ) return res.status( 422 ).send( "A data de expiração deve ser maior que a data atual" );

    if( expireAt === "") return res.status( 422 ).send( "A data de expiração não pode ser vazia" );
    // vou ter que retirar a parte de cima... se for vazia preissa colocar a data atual + 1 mes

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
   