import { ForbiddenException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { IExternalUser } from "@wrtn/connector-api/lib/structures/common/IExternalUser";
import { randomUUID } from "crypto";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace ExternalUserProvider {
  export namespace json {
    export const transform = (
      input: Prisma.external_usersGetPayload<ReturnType<typeof select>>,
    ): IExternalUser => {
      return {
        id: input.id,
        channel_id: input.channel_id,
        uid: input.uid,
        password: input.password,
        application: input.application,
        created_at: input.created_at.toISOString(),
      };
    };

    export const select = () => {
      return {} satisfies Prisma.external_usersFindFirstArgs;
    };
  }

  export const collect = (
    input: Required<IExternalUser.ExternalUserIdentifier>,
  ) => {
    return {
      id: randomUUID(),
      application: input["x-wrtn-application"],
      password: input["x-wrtn-password"],
      uid: input["x-wrtn-uid"],
      created_at: new Date().toISOString(),
    } satisfies Prisma.external_usersCreateWithoutChannelInput;
  };

  export const emplace = async (
    input: Required<IExternalUser.ExternalUserIdentifier>,
  ): Promise<IExternalUser> => {
    const created_at = new Date();
    const external_user = await ConnectorGlobal.prisma.external_users.findFirst(
      {
        ...ExternalUserProvider.json.select(),
        where: {
          application: input["x-wrtn-application"],
          uid: input["x-wrtn-uid"],
        },
      },
    );

    if (external_user) {
      if (external_user.password !== input["x-wrtn-password"]) {
        throw new ForbiddenException("Invalid password.");
      }

      return ExternalUserProvider.json.transform(external_user);
    }

    const channel = await ConnectorGlobal.prisma.channels.findFirst({
      where: {
        code: input["x-wrtn-application"],
      },
    });

    if (!channel) {
      const createdChannel = await ConnectorGlobal.prisma.channels.create({
        select: {
          external_users: {},
        },
        data: {
          id: randomUUID(),
          code: input["x-wrtn-application"],
          created_at,
          updated_at: created_at,
          external_users: {
            create: {
              ...collect(input),
            },
          },
        },
      });

      const external_user = createdChannel.external_users[0];
      return ExternalUserProvider.json.transform(external_user);
    }

    const createdUser = await ConnectorGlobal.prisma.external_users.create({
      select: {
        channel: true,
        channel_id: true,
        created_at: true,
        id: true,
        password: true,
        uid: true,
        application: true,
      },
      data: {
        channel_id: channel.id,
        ...collect(input),
      },
    });
    return ExternalUserProvider.json.transform(createdUser);
  };
}
