import { User } from "../entities/user.entity";
import { dataSource } from "../config/dataSource";
import { General } from "../entities/general.entity";
import { Repository } from "typeorm";
import { Surah } from "../entities/surah.entity";

export const generalRepository: Repository<General> = dataSource.getRepository(General);

export const userRepository: Repository<User> = dataSource.getRepository(User);

export const SurahRepository: Repository<Surah> = dataSource.getRepository(Surah);
