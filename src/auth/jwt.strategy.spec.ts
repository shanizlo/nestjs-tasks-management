import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UnauthorizedException } from '@nestjs/common';

describe('JWTStrategy', () => {
    const mockUserRepository = () => ({
        findOne: jest.fn()
    });

    describe('JswtStrategy', () => {
        let jwtStrategy: JwtStrategy;
        let userRepository;

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    JwtStrategy,
                    { provide: UserRepository, useFactory: mockUserRepository },
                ],
            }).compile();

            jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
            userRepository = await module.get<UserRepository>(UserRepository);
        });

        describe('validate', async () => {
            it('validates and returns the user based on WT payload', async () => {
                const user = new User();
                user.username = 'TestUser';

                userRepository.findOne.mockResolvedValue(user);
                const result = await jwtStrategy.validate({ username: 'TestUser' });
                expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'TestUser' });
                expect(result).toEqual(user);

            });

            it('throws an anuathorised exception as user cannot be found', () => {
                userRepository.findOne.mockresolvedValue(null);
                expect(jwtStrategy.validate({ username: 'TestUser' })).rejects.toThrow(UnauthorizedException);

            });
        });
    });
});