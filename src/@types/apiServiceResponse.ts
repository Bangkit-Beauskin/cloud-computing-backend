export declare type ApiServiceResponse = {
  statusCode: number;
  response: {
    code: number;
    message: string;
    data?: [] | object | DataTableDaoResponse;
  };
};

export declare type DataTableResponse = {
  totalItems: number;
  data: Partial<object[]>;
  totalPages: number;
  currentPage: number;
};

export declare type ApiServiceResponseList = {
  statusCode: number;
  response: {
    code: number;
    message: string;
  } & DataTableResponse;
};

export type IMulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export declare type DataTableDaoResponse = {
  count: number;
  rows: Partial<object[]>;
};
