import { UserModel, IUser} from "../entities/User";

export class UserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({ email }).exec();
    }

    async create(userData: Partial<IUser>): Promise<IUser> {
        const user = new UserModel(userData);
        return await user.save();
    }

    async addFavoriteTeams(userId: string, teamId: number): Promise<IUser | null> {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { favoriteTeams: teamId}},
            {new: true}
        ).exec();

        return updatedUser as IUser | null;
    }
}