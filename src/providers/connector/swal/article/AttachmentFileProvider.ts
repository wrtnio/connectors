import { Prisma } from "@prisma/client";
import { IAttachmentFile } from "@wrtn/connector-api/lib/structures/connector/swal/article/IAttachmentFile";

export namespace AttachmentFileProvider {
  export namespace json {
    export const transform = (
      input: Prisma.attachment_filesGetPayload<ReturnType<typeof select>>,
    ): IAttachmentFile => {
      return {
        id: input.id,
        extension: input.extension,
        name: input.name,
        url: input.url,
        created_at: input.created_at.toISOString(),
      };
    };

    export const select = () => {
      return {} satisfies Prisma.attachment_filesFindManyArgs;
    };
  }
}
