

export function getMostVoted(choices){

    const result = {};
    let mostVoted = 0;
    for(let i = 0; i < choices.length; i++){
        if(choices[i].votes > mostVoted){
            mostVoted = choices[i].votes;
            result = {
                title: choices[i].title,
                votes: choices[i].votes
            };
           
        }
        return result;
    }
    };
