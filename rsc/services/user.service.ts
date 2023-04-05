import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors";
import { User } from "../modeles";
import { IUser } from "../types";
import { s3Service } from "./S3.service";

interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  // itemsCount загальна кількість записів в бд
  itemsCount: number;
  itemsFound: number;
  // data це пачка тих записів в бд які потребує
  data: T[];
}

export interface IQuery {
  page: number;
  limit: number;
  sortedBy: string;
  [key: string]: string | number;
}

class UserService {
  public getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getWhithPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IUser>> {
    try {
      // const user = await User.findByName("denis");
      // console.log(user);
      // const user = await User.findById("64161a4d73c7ce2a400a4b12");
      // console.log(user.nameWithAge());

      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );
      // ми маємо 2 методи як робити пагінауію skip, limit
      //skip кількість айтемів які ми хочимо пропустити
      // limit кількість айтемів які ми хочемо взяти
      // sort() сортуємо по чомусь від меншого до більшого по замовчуванням
      // sort(- по чому сорт) від більшого до меншого

      //для сторінки нам потрібна спеціальна формула
      const {
        page = 1,
        limit = 5,
        sortedBy = "createdAt",
        ...searchObject
      } = queryObj;
      const skip = limit * (page - 1);
      //$lte менше рівне
      const users = await User.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sortedBy)
        .lean();
      // count() рахує загальну кількість запитів
      const usersTotalCount = await User.count();

      return {
        page: +page,
        itemsCount: usersTotalCount,
        perPage: +limit,
        itemsFound: users.length,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<IUser> {
    try {
      return User.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async uploadAvatar(file: UploadedFile, user: IUser): Promise<IUser> {
    try {
      const filePath = await s3Service.uploadPhoto(file, "user", user._id);

      if (!!user.avatar) {
        await s3Service.deletePhoto(user.avatar);
      }

      return await User.findByIdAndUpdate(
        user._id,
        { avatar: filePath },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async deleteAvatar(user: IUser): Promise<IUser> {
    try {
      if (!user.avatar) {
        throw new ApiError("user dont have avatar", 422);
      }
      await s3Service.deletePhoto(user.avatar);
      return await User.findByIdAndUpdate(
        user._id,
        { $unset: { avatar: user.avatar } },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const userService = new UserService();
