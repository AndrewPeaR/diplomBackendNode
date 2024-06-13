const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  async saveToken(userId, refreshToken, fingerprint) {
    const token = await prisma.tokens.create({
      data: {
        userId: userId,
        refreshToken: refreshToken,
        fingerprint: fingerprint
      //   {
      //     "email": "1234testjwt@fadsfdas.gfds",
      //     "password": "12fdasdf"
      // }
      },
    });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await prisma.tokens.deleteMany({
      where: { 
        refreshToken: refreshToken
       },
    });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await prisma.tokens.findMany({
      where: {
        refreshToken: refreshToken,
      },
    });
    return tokenData;
  }
}

module.exports = new TokenService();
