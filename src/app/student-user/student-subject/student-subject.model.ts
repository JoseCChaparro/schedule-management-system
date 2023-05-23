export class Subject{

    constructor(public id: string,
                public name: string,
                public credits: number,
                public requirements: string[],
                public selected: boolean = false
            ){}

}