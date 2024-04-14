const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
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

  async saveToken(userId, refreshToken) {
    const tokenData = await prisma.tokens.findUnique({
      where: {
        userId: userId,
      },
    });
    if (tokenData) {
      return await prisma.tokens.update({
        where: {
          refreshToken: tokenData.refreshToken,
        },
        data: {
          refreshToken: refreshToken,
        },
      });
    }
    const token = await prisma.tokens.create({
      data: {
        userId: userId,
        refreshToken: refreshToken,
      },
    });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await prisma.tokens.delete({
      where: { refreshToken: refreshToken },
    });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await prisma.tokens.findUnique({
      where: {
        refreshToken: refreshToken,
      },
    });
    return tokenData;
  }
}

module.exports = new TokenService();
