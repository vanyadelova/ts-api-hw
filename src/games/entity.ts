import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsJSON } from 'class-validator'



const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]


@Entity()
export default class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text', {nullable:false})
    name: string

    @Column('text', {nullable:false})
    color: string

    @IsJSON()
    @Column('json', {default: defaultBoard})
    board: string[][]
}