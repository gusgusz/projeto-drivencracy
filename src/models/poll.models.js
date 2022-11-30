import joi  from 'joi';

export const PollSchema = joi.object({
        title: joi.string().min(3).required(),
        expireAt: joi.string().min(0).required(), 
    
});