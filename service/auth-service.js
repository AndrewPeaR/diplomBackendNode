const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require('./mail-service')
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const CustomError = require("../exceptions/customError");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AuthService {
  async registration(email, password, firstname, lastname, userRoleId, fingerprint) {
    const candidate = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (candidate) {
      throw CustomError.BadRequest(
        `Пользователь с таким адресом уже существует, ${email}`
      );
    }
    
    const hashPassword = bcrypt.hashSync(password, 8);

    const activationLink = uuid.v4();

    const user = await prisma.user.create({
      data: {
        email: email,
        passwordHash: hashPassword,
        activationLink: activationLink,
        firstname: firstname,
        lastname: lastname,
        imageUrl: "while empty",
        userRoleId: userRoleId
      },
    });

    // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/v1/user/activate/${activationLink}`)

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken, fingerprint.hash);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await prisma.user.findUnique({
      where: { activationLink: activationLink },
    });
    if (!user) {
      throw CustomError.BadRequest("Некорректная ссылка активации");
    }
    await prisma.user.update({
      where: { activationLink: activationLink },
      data: {
        isActivated: true,
      },
    });
  }

  async login(email, password, fingerprint) {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw CustomError.BadRequest("Пользователь был не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.passwordHash);
    if (!isPassEquals) {
      throw CustomError.BadRequest("Неправильный пароль");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    // await tokenService.removeToken()
    await tokenService.saveToken(userDto.id, tokens.refreshToken, fingerprint.hash);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken, fingerprint){
      if(!refreshToken){
          throw CustomError.UnauthorizedError()
      }
      const userData = tokenService.validateRefreshToken(refreshToken)
      const tokenFromDb = await tokenService.findToken(refreshToken)
      if (!userData || !tokenFromDb){
          throw CustomError.UnauthorizedError()
      }
      if(tokenFromDb.fingerprint !== fingerprint){
        console.log("Попытка несанкционированного обновления токенов!")
        throw CustomError.PermissonsError()
      }
      await tokenService.removeToken(refreshToken)

      const user = await prisma.user.findUnique({where: {id: userData.id} })
      const userDto = new UserDto(user)
      const tokens = tokenService.generateTokens({...userDto})
      await tokenService.saveToken(userDto.id, tokens.refreshToken, fingerprint)
      return {
          ...tokens,
          user: userDto
      }
  }
}

module.exports = new AuthService();
