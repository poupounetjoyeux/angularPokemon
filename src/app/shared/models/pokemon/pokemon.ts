import {Move} from "../move/move";
import {MoveResult} from "../move/move-result";

export enum pokemonType {
    Electric = "eletric",
    Fire = "fire",
    Water = "water",
    Grass = "grass",
}

export class Pokemon {
    public Name: string;
    public Speed: number;
    public Pv: number;
    public Moves: Move[];
    public type: pokemonType;


    constructor(pokemonName: string, speed: number, moves: Move[], type: pokemonType) {
        this.Name = pokemonName;
        this.Speed = speed;
        this.Moves = moves;
        this.Pv = 100;
        this.type = type;
    }

    public isDie() : boolean {
        return this.Pv <= 0;
    }

    public hasMove(move: Move): boolean {
        return this.Moves.indexOf(move) !== -1;
    }

    public isStrongAgainstEnemy(secondPokemonType: pokemonType) {
        if (this.type == pokemonType.Fire && secondPokemonType == pokemonType.Water) {
            return true;
        } else if (this.type == pokemonType.Grass && secondPokemonType == pokemonType.Water) {
            return true;
        } else if (this.type == pokemonType.Water && secondPokemonType == pokemonType.Fire) {
            return true;
        } else return this.type == pokemonType.Electric && secondPokemonType == pokemonType.Water;
    }

    public applyMove(enemy: Pokemon, moveToExecute: Move, generatedAccuracy: number): MoveResult {
        if (moveToExecute == undefined || !this.hasMove(moveToExecute)) {
            console.log(`${this.Name} has nothing to do..`);
            return MoveResult.NoMove;
        }
        let finalPv;
        if (generatedAccuracy <= moveToExecute.Accuracy) {

            if(this.isStrongAgainstEnemy(enemy.type)) {
                finalPv = enemy.Pv - moveToExecute.Damage * 2;

            } else {
                finalPv = enemy.Pv - moveToExecute.Damage;
            }
            if(finalPv <= 0)
            {
                finalPv = 0;
            }
            enemy.Pv = finalPv;
            console.log(`${this.Name} has attacked with ${moveToExecute.Name}!. ${moveToExecute.Damage} infliged damage`);
            return MoveResult.MoveSuccess;
        }
        console.log(`${this.Name} fails its attack..`);
        return MoveResult.MoveFails;
    }
}