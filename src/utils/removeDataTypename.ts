import { IDataTypename } from '../interfaces';

export const removeDataTypename = (data: IDataTypename[]) =>
  data.map((item: IDataTypename) => {
    const { __typename, ...rest } = item;
    return rest as { [x: string]: any };
  });
