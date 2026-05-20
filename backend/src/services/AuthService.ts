import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { IUser } from '../entities/User';

export class AuthService {
    private userRepository: UserRepository;
    private readonly SALT_ROUNDS = 10;

    private readonly JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(email: string, passwordRaw: string): Promise<{ user: IUser, token: string}> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const passwordHash = await bcrypt.hash(passwordRaw, this.SALT_ROUNDS);

        const newUser = await this.userRepository.create({email, passwordHash});

        const token = this.generateToken(newUser._id.toString());

        return {user: newUser, token};
    }

    async login(email: string, passwordRaw: string): Promise<{ user: IUser, token: string}> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(passwordRaw, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = this.generateToken(user._id.toString());

        return {user, token};
    }

    private generateToken(userId: string): string {
        return jwt.sign({userId}, this.JWT_SECRET, {expiresIn: '24h'});
    }
}