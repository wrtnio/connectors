import { SwaggerCustomizer } from "@nestia/core";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Singleton } from "tstl";
import typia from "typia";
import { IExternalUser } from "../api/structures/common/IExternalUser";
import { ExternalUserProvider } from "../providers/connector/external_user/ExternalUserProvider";

export const ExternalUser =
  (): ParameterDecorator =>
  (
    target: object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ): void => {
    SwaggerCustomizer((props) => {
      props.route.security ??= [];
      props.route.security.push({
        bearer: [],
      });
    })(target, propertyKey as string, undefined!);
    singleton.get()(target, propertyKey, parameterIndex);
  };

const singleton = new Singleton(() =>
  createParamDecorator(async (_0: any, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers satisfies Headers;
    typia.assertGuard<Required<IExternalUser.ExternalUserIdentifier>>(headers);
    const external_user = await ExternalUserProvider.emplace(headers);
    return external_user;
  })(),
);
